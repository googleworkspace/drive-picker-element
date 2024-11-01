import {
	getBooleanAttribute,
	getNumberAttribute,
	loadApi,
	retrieveAccessToken,
} from "../utils";
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

export type View = google.picker.DocsView;

export interface PickerViewElement extends HTMLElement {
	view: google.picker.DocsView;
}

export type DrivePickerEvent = CustomEvent<google.picker.ResponseObject>;

export interface DrivePickerElementEventListeners {
	addEventListener(
		type: "cancel" | "picked" | "loaded",
		listener: (ev: DrivePickerEvent) => void,
		options?: boolean | AddEventListenerOptions,
	): void;
	removeEventListener(
		type: "cancel" | "picked" | "loaded",
		listener: (ev: DrivePickerEvent) => void,
		options?: boolean | EventListenerOptions,
	): void;
}

/**
 * The `drive-picker` web component provides a convenient way to integrate the Google Picker API into your web applications. The Google Picker API is a JavaScript API that allows users to select or upload Google Drive files. This component acts as a "File Open" dialog for accessing and interacting with files stored on Google Drive.
 *
 * Features:
 * - Provides a similar look-and-feel to the Google Drive UI.
 * - Offers several views showing previews and thumbnail images of Drive files.
 * - Displays as an inline, modal window, ensuring users never leave the main application.
 *
 * Note: The Google Picker API does not support file organization, moving, or copying. For these operations, you should use either the Google Drive API or the Drive UI.
 *
 * @element drive-picker
 *
 * @fires {CustomEvent<google.picker.ResponseObject>} cancel - Triggered when the user cancels the picker dialog.
 * @fires {CustomEvent<google.picker.ResponseObject>} picked - Triggered when the user picks one or more items.
 * @fires {CustomEvent<google.picker.ResponseObject>} loaded - Triggered when the picker is loaded.
 *
 * @slot - The View elements to display in the picker. Each View element should implement a property `view` of type `google.picker.View`.
 *
 * @example
 *
 * ```html
 * <drive-picker
 *   app-id="675807958095"
 *   client-id="675807958095-nsptdcn5qdb6pl44cge1c6ghact9t5q0.apps.googleusercontent.com"
 * >
 *   <drive-picker-docs-view></drive-picker-docs-view>
 * </drive-picker>
 * ```
 *
 */
export class DrivePickerElement
	extends HTMLElement
	implements DrivePickerElementEventListeners
{
	static get observedAttributes() {
		return [
			"client-id",
			"scope",
			"app-id",
			"developer-key",
			"hide-title-bar",
			"locale",
			"max-items",
			"multiselect",
			"oauth-token",
			"origin",
			"relay-url",
			"title",
			"visible",
		];
	}
	protected picker: google.picker.Picker | undefined;
	protected observer: MutationObserver | undefined;
	protected google: typeof google | undefined;
	protected loading: Promise<void> | undefined;

	get visible(): boolean {
		// TODO this doesn't work after a cancel... need to file a bug
		return Boolean(this.picker?.isVisible());
	}

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
		// prior to the API initialy being loaded
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

		const hideTitleBar = getBooleanAttribute(this, "hide-title-bar");
		if (hideTitleBar !== null) builder = builder.hideTitleBar();

		// OAuth token is required either as an attribute or from the OAuth flow using the client ID and scope
		const oauthToken =
			this.getAttribute("oauth-token") ??
			(await retrieveAccessToken(
				// biome-ignore lint/style/noNonNullAssertion: just let the error bubble up when null
				this.getAttribute("client-id")!,
				this.getAttribute("scope") ??
					"https://www.googleapis.com/auth/drive.file",
			));
		builder = builder.setOAuthToken(oauthToken);

		// Features
		if (getBooleanAttribute(this, "multiselect")) {
			builder = builder.enableFeature(
				this.google.picker.Feature.MULTISELECT_ENABLED,
			);
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
	protected get views(): (View | google.picker.ViewId)[] {
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

	private callbackToDispatchEvent(data: google.picker.ResponseObject) {
		this.dispatch(data.action, data);
	}

	disconnectedCallback(): void {
		this.picker?.dispose();
	}

	private dispatch(
		type: google.picker.Action,
		detail: google.picker.ResponseObject,
	) {
		this.dispatchEvent(new CustomEvent(type, { detail }));
	}
}

function isView(obj: HTMLElement): obj is PickerViewElement {
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
