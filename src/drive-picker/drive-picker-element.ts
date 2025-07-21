/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
	getBoolAttr,
	getNumberAttribute,
	loadApi,
	requestAccessToken,
	setBoolAttrWithDefault,
} from "../utils";

type View = google.picker.DocsView;

interface DrivePickerDocsViewElement extends HTMLElement {
	view: google.picker.DocsView;
}

export type OAuthErrorEvent = CustomEvent<
	| google.accounts.oauth2.ClientConfigError
	| google.accounts.oauth2.TokenResponse
>;
export type OAuthResponseEvent =
	CustomEvent<google.accounts.oauth2.TokenResponse>;
export type PickerCanceledEvent = CustomEvent<google.picker.ResponseObject>;
export type PickerPickedEvent = CustomEvent<google.picker.ResponseObject>;
export type PickerErrorEvent = CustomEvent<unknown>;

declare global {
	interface GlobalEventHandlersEventMap {
		/** @deprecated - Use "picker-oauth-error" */
		"picker:authenticated": CustomEvent<{ token: string }>;
		/** @deprecated - Use "picker-oauth-error" */
		"picker:oauth:error": OAuthErrorEvent;
		"picker-oauth-error": OAuthErrorEvent;
		/** @deprecated - Use "picker-oauth-response" */
		"picker:oauth:response": OAuthResponseEvent;
		"picker-oauth-response": OAuthResponseEvent;
		/** @deprecated - Use "picker-canceled" */
		"picker:canceled": PickerCanceledEvent;
		"picker-canceled": PickerCanceledEvent;
		/** @deprecated - Use "picker-picked" */
		"picker:picked": PickerPickedEvent;
		"picker-picked": PickerPickedEvent;
		/** @deprecated - Use "picker-error" */
		"picker:error": PickerErrorEvent;
		"picker-error": PickerErrorEvent;
	}
}

/**
 * The `drive-picker` web component provides a convenient way to declaratively
 * build
 * [`google.picker.Picker`](https://developers.google.com/drive/picker/reference/picker)
 * by using the component attributes mapped to the corresponding methods of
 * [`google.picker.PickerBuilder`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder).
 *
 * @element drive-picker
 *
 * @fires {PickerCanceledEvent} picker-canceled - Triggered when the user cancels the picker dialog. See [`ResponseObject`](https://developers.google.com/drive/picker/reference/picker.responseobject).
 * @fires {PickerPickedEvent} picker-picked - Triggered when the user picks one or more items. See [`ResponseObject`](https://developers.google.com/drive/picker/reference/picker.responseobject).
 * @fires {PickerErrorEvent} picker-error - Triggered when an error occurs. See [`ResponseObject`](https://developers.google.com/drive/picker/reference/picker.responseobject).
 * @fires {OAuthErrorEvent} picker-oauth-error - Triggered when an error occurs in the OAuth flow. See the [error guide](https://developers.google.com/identity/oauth2/web/guides/error). Note that the `TokenResponse` object can have error fields.
 * @fires {OAuthResponseEvent} picker-oauth-response - Triggered when an OAuth flow completes. See the [token model guide](https://developers.google.com/identity/oauth2/web/guides/use-token-model).
 *
 * @slot - The default slot contains View elements to display in the picker.
 * Each View element should implement a property `view` of type
 * `google.picker.View`.
 * @attr {string} app-id - The Google Drive app ID. See [`PickerBuilder.setAppId`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setappid).
 * @attr {string} client-id - The OAuth 2.0 client ID. See [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/oauth2).
 * @attr {string} developer-key - The API key for accessing Google Picker API. See [`PickerBuilder.setDeveloperKey`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setdeveloperkey).
 * @attr {number} [debounce-delay=0] - The debounce delay in milliseconds before building the picker after an attribute change.
 * @attr {"default"|"true"|"false"} hide-title-bar - Hides the title bar of the
 * picker if set to true. See [`PickerBuilder.hideTitleBar`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.hidetitlebar).
 * @attr {string} locale - The locale to use for the picker. See [`PickerBuilder.setLocale`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setlocale).
 * @attr {number} max-items - The maximum number of items that can be selected. See [`PickerBuilder.setMaxItems`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setmaxitems).
 * @attr {boolean} mine-only - If set to true, only shows files owned by the
 * user. See [`PickerBuilder.enableFeature`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.enablefeature).
 * @attr {boolean} multiselect - Enables multiple file selection if set to true. See [`PickerBuilder.enableFeature`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.enablefeature).
 * @attr {boolean} nav-hidden - Hides the navigation pane if set to true. See [`PickerBuilder.enableFeature`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.enablefeature).
 * @attr {string} oauth-token - The OAuth 2.0 token for authentication. See [`PickerBuilder.setOAuthToken`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setoauthtoken).
 * @attr {string} origin - The origin parameter for the picker. See [`PickerBuilder.setOrigin`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setorigin).
 * @attr {string} relay-url - The relay URL for the picker. See [`PickerBuilder.setRelayUrl`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setrelayurl).
 * @attr {string} scope - The OAuth 2.0 scope for the picker. The default is `https://www.googleapis.com/auth/drive.file`. See [Drive API scopes](https://developers.google.com/drive/api/guides/api-specific-auth#drive-scopes).
 * @attr {string} title - The title of the picker. See [`PickerBuilder.setTitle`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.settitle).
 * @attr {string} hd - The hosted domain to restrict sign-in to.  (Optional)  See the `hd` field in the OpenID Connect docs.
 * @attr {boolean} include-granted-scopes - Enables applications to use incremental authorization. See [`TokenClientConfig.include_granted_scopes`](https://developers.google.com/identity/oauth2/web/reference/js-reference#TokenClientConfig).
 * @attr {string} login-hint - An email address or an ID token 'sub' value. Google will use the value as a hint of which user to sign in. See the `login_hint` field in the OpenID Connect docs.
 * @attr {""|"none"|"consent"|"select_account"} prompt - A space-delimited, case-sensitive list of prompts to present the user.  See [`TokenClientConfig.prompt`](https://developers.google.com/identity/oauth2/web/reference/js-reference#TokenClientConfig)
 *
 * @example
 *
 *```html
 *<drive-picker
 *  app-id="246724281745"
 *  client-id="246724281745-v9ouai8ood5o69r3ug29aaqeqflomijd.apps.googleusercontent.com"
 *>
 *  <drive-picker-docs-view></drive-picker-docs-view>
 *</drive-picker>
 *```
 *
 */
export class DrivePickerElement extends HTMLElement {
	static get observedAttributes() {
		return [
			"app-id",
			"client-id",
			"debounce-delay",
			"developer-key",
			"hide-title-bar",
			"locale",
			"max-items",
			"mine-only",
			"multiselect",
			"nav-hidden",
			"oauth-token",
			"origin",
			"relay-url",
			"scope",
			"title",
		];
	}
	private picker: google.picker.Picker | undefined;
	private observer: MutationObserver | undefined;
	private google: typeof google | undefined;
	private loading: Promise<void> | undefined;
	private debounceTimer: number | undefined;

	/**
	 * The visibility of the picker.
	 */
	public get visible(): boolean {
		return Boolean(this.picker?.isVisible());
	}

	/**
	 * Controls the visibility of the picker after the picker dialog has been
	 * closed. If any of the attributes change, the picker will be rebuilt and
	 * the visibility will be reset.
	 */
	set visible(value: boolean) {
		this.picker?.setVisible(value);
	}

	public get tokenClientConfig(): Omit<
		google.accounts.oauth2.TokenClientConfig,
		"callback" | "error_callback"
	> {
		const clientId = this.getAttribute("client-id");
		const scope =
			this.getAttribute("scope") ??
			"https://www.googleapis.com/auth/drive.file";

		if (!clientId || !scope) {
			throw new Error("client-id and scope are required attributes");
		}

		return {
			client_id: clientId,
			hd: this.getAttribute("hd") ?? undefined,
			include_granted_scopes: Boolean(
				this.getAttribute("include-granted-scope"),
			),
			login_hint: this.getAttribute("login-hint") ?? undefined,
			prompt: (this.getAttribute("prompt") ??
				"") as google.accounts.oauth2.TokenClientConfig["prompt"],
			scope,
		};
	}

	attributeChangedCallback() {
		this.scheduleBuild();
	}

	private scheduleBuild() {
		// Clear any previously scheduled build to ensure we don't build multiple times
		clearTimeout(this.debounceTimer);

		// Schedule a new build to run after a short delay.
		// This coalesces multiple rapid changes into a single build call.
		this.debounceTimer = window.setTimeout(() => {
			this.build();
		}, getNumberAttribute(this, "debounce-delay") ?? 0);
	}

	private async build() {
		this.picker?.dispose();

		// this await is necessary as an attribute may have changed
		// prior to the API initially being loaded
		await this.loading;

		if (!this.google) return;

		let builder = new this.google.picker.PickerBuilder().setCallback(
			(data: google.picker.ResponseObject) => {
				this.callbackToDispatchEvent(data);
			},
		);

		const appId = this.getAttribute("app-id");
		if (appId !== null) builder = builder.setAppId(appId);

		const developerKey = this.getAttribute("developer-key");
		if (developerKey !== null) builder = builder.setDeveloperKey(developerKey);

		const locale = this.getAttribute("locale");
		if (locale !== null)
			builder = builder.setLocale(locale as google.picker.Locales);

		const maxItems = getNumberAttribute(this, "max-items");
		if (maxItems !== null) builder = builder.setMaxItems(maxItems);

		const origin = this.getAttribute("origin");
		if (origin !== null) builder = builder.setOrigin(origin);

		const relayUrl = this.getAttribute("relay-url");
		if (relayUrl !== null) builder = builder.setRelayUrl(relayUrl);

		const title = this.getAttribute("title");
		if (title !== null) builder = builder.setTitle(title);

		setBoolAttrWithDefault(
			"hide-title-bar",
			this,
			builder.hideTitleBar,
			builder,
		);

		// OAuth token is required either as an attribute or from the OAuth flow using the client ID and scope
		const oauthToken =
			this.getAttribute("oauth-token") ?? (await this.requestAccessToken());

		if (!oauthToken) return;

		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		builder = builder.setOAuthToken(oauthToken!);

		if (getBoolAttr(this, "multiselect")) {
			builder = builder.enableFeature(
				this.google.picker.Feature.MULTISELECT_ENABLED,
			);
		}

		if (getBoolAttr(this, "mine-only")) {
			builder = builder.enableFeature(this.google.picker.Feature.MINE_ONLY);
		}

		if (getBoolAttr(this, "nav-hidden")) {
			builder = builder.enableFeature(this.google.picker.Feature.NAV_HIDDEN);
		}

		for (const view of this.views) {
			builder = builder.addView(view);
		}

		this.picker = builder.build();

		this.picker.setVisible(true);
	}

	/**
	 * The `google.Picker.View` objects to display in the picker as defined by the slot elements.
	 */
	private get views(): (View | google.picker.ViewId)[] {
		const views = nestedViews(this);
		return views.length ? views : ["all" as google.picker.ViewId];
	}

	async connectedCallback(): Promise<void> {
		this.loading = loadApi().then((google) => {
			this.google = google;
		});

		// Watch for changes in the picker element slot and their attributes
		this.observer = new MutationObserver((mutations) => {
			const filteredMutations = mutations.filter(
				(mutation) =>
					mutation.type === "childList" ||
					(mutation.type === "attributes" && mutation.target !== this),
			);

			if (filteredMutations.length) {
				this.scheduleBuild();
			}
		});

		this.observer?.observe(this, {
			childList: true,
			subtree: true,
			attributes: true,
		});
	}

	private callbackToDispatchEvent(detail: google.picker.ResponseObject) {
		// TODO - remove deprecated events
		let eventTypes: (keyof GlobalEventHandlersEventMap)[];

		switch (detail.action) {
			case google.picker.Action.CANCEL:
				eventTypes = ["picker:canceled", "picker-canceled"];
				break;
			case google.picker.Action.PICKED:
				eventTypes = ["picker:picked", "picker-picked"];
				break;
			case google.picker.Action.ERROR:
				eventTypes = ["picker:error", "picker-error"];
				break;
			default:
				return;
		}

		for (const eventType of eventTypes) {
			this.dispatchEvent(
				new CustomEvent(eventType, {
					detail,
				}),
			);
		}
	}

	private async requestAccessToken(): Promise<string | undefined> {
		return requestAccessToken(this.tokenClientConfig)
			.then((response) => {
				const { access_token: token } = response;
				if (!token) {
					this.dispatchEvent(
						new CustomEvent("picker:oauth:error", {
							detail: response,
						}),
					);
					this.dispatchEvent(
						new CustomEvent("picker-oauth-error", {
							detail: response,
						}),
					);
					return undefined;
				}
				// TODO - remove deprecated event
				this.dispatchEvent(
					new CustomEvent("picker:authenticated", { detail: { token } }),
				);
				this.dispatchEvent(
					new CustomEvent("picker-oauth-response", { detail: response }),
				);
				// TODO - remove deprecated event
				this.dispatchEvent(
					new CustomEvent("picker:oauth:response", { detail: response }),
				);
				this.dispatchEvent(
					new CustomEvent("picker-oauth-response", { detail: response }),
				);
				return token;
			})
			.catch((error) => {
				// TODO - remove deprecated event
				this.dispatchEvent(
					new CustomEvent("picker:oauth:error", {
						detail: error,
					}),
				);
				this.dispatchEvent(
					new CustomEvent("picker-oauth-error", {
						detail: error,
					}),
				);
				return undefined;
			});
	}

	disconnectedCallback(): void {
		this.picker?.dispose();
	}
}

function isView(obj: HTMLElement): obj is DrivePickerDocsViewElement {
	return "view" in obj && obj.view instanceof window.google.picker.View;
}

function filterElementsToViewOrViewGroup(
	elements: Array<HTMLElement>,
): Array<View> {
	return elements
		.filter((element) => isView(element))
		.map((element) => element.view);
}

function nestedViews(target: HTMLElement, selector = "*"): Array<View> {
	return filterElementsToViewOrViewGroup(
		Array.from(target.querySelectorAll<HTMLElement>(selector)),
	);
}
