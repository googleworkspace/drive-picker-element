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
	retrieveAccessToken,
	setBoolAttrWithDefault,
} from "../utils";

type View = google.picker.DocsView;

interface DrivePickerDocsViewElement extends HTMLElement {
	view: google.picker.DocsView;
}

declare global {
	interface GlobalEventHandlersEventMap {
		"picker:authenticated": CustomEvent<{ token: string }>;
		"picker:canceled": CustomEvent<google.picker.ResponseObject>;
		"picker:picked": CustomEvent<google.picker.ResponseObject>;
		"picker:error": CustomEvent<unknown>;
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
 * @fires {{ token: string }} picker:authenticated - Triggered when the user authenticates with the
 * provided OAuth client ID and scope.
 * @fires {google.picker.ResponseObject} picker:canceled - Triggered when the user cancels the picker dialog. See [`ResponseObject`](https://developers.google.com/drive/picker/reference/picker.responseobject).
 * @fires {google.picker.ResponseObject} picker:picked - Triggered when the user picks one or more items. See [`ResponseObject`](https://developers.google.com/drive/picker/reference/picker.responseobject).
 * @fires {google.picker.ResponseObject} picker:error - Triggered when an error occurs. See [`ResponseObject`](https://developers.google.com/drive/picker/reference/picker.responseobject).
 *
 * @slot - The default slot contains View elements to display in the picker.
 * Each View element should implement a property `view` of type
 * `google.picker.View`.
 * @attr {string} app-id - The Google Drive app ID. See [`PickerBuilder.setAppId`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setappid).
 * @attr {string} client-id - The OAuth 2.0 client ID. See [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/oauth2).
 * @attr {string} developer-key - The API key for accessing Google Picker API. See [`PickerBuilder.setDeveloperKey`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setdeveloperkey).
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
 *
 * @example
 *
 *```html
 *<drive-picker
 *  app-id="675807958095"
 *  client-id="675807958095-nsptdcn5qdb6pl44cge1c6ghact9t5q0.apps.googleusercontent.com"
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

	attributeChangedCallback() {
		this.build();
		return;
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
			this.getAttribute("oauth-token") ??
			(await retrieveAccessToken(
				// biome-ignore lint/style/noNonNullAssertion: just let the error bubble up when null
				this.getAttribute("client-id")!,
				this.getAttribute("scope") ??
					"https://www.googleapis.com/auth/drive.file",
			).then((token) => {
				this.dispatchEvent(
					new CustomEvent("picker:authenticated", { detail: { token } }),
				);
				return token;
			}));

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
			this.build();
		});

		// Watch for changes in the picker element slot and their attributes
		this.observer = new MutationObserver((mutations) => {
			const filteredMutations = mutations.filter(
				(mutation) =>
					mutation.type === "childList" ||
					(mutation.type === "attributes" && mutation.target !== this),
			);

			if (filteredMutations.length) {
				this.build();
			}
		});

		this.observer?.observe(this, {
			childList: true,
			subtree: true,
			attributes: true,
		});
	}

	private callbackToDispatchEvent(detail: google.picker.ResponseObject) {
		let eventType: keyof GlobalEventHandlersEventMap;

		switch (detail.action) {
			case google.picker.Action.CANCEL:
				eventType = "picker:canceled";
				break;
			case google.picker.Action.PICKED:
				eventType = "picker:picked";
				break;
			case google.picker.Action.ERROR:
				eventType = "picker:error";
				break;
			default:
				return;
		}

		this.dispatchEvent(
			new CustomEvent(eventType, {
				detail,
			}),
		);
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
