import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { loadApi, retrieveAccessToken } from "../utils";
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

export interface DrivePickerElementProps {
	// Required properties
	appId: string;
	clientId: string;
	// Optional properties
	developerKey?: string;
	hideTitleBar?: boolean;
	locale?: string;
	maxItems?: number;
	multiselect?: boolean;
	oauthToken?: string;
	origin?: string;
	relayUrl?: string;
	scope?: string;
	title?: string;
	visible?: boolean;
}

export interface DrivePickerElementEventListeners {
	addEventListener(
		type: "cancel" | "picked",
		listener: (ev: CustomEvent<google.picker.ResponseObject>) => void,
		options?: boolean | AddEventListenerOptions,
	): void;
	removeEventListener(
		type: "cancel" | "picked",
		listener: (ev: CustomEvent<google.picker.ResponseObject>) => void,
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
@customElement("drive-picker")
export class DrivePickerElement
	extends LitElement
	implements DrivePickerElementProps, DrivePickerElementEventListeners
{
	protected picker: google.picker.Picker | undefined;
	protected observer: MutationObserver | undefined;

	@state()
	private _oauthToken: string | undefined;

	/**
	 * The Google Drive app ID.
	 */
	@property({ type: String, attribute: "app-id" })
	appId!: string;

	/**
	 * The Google API client ID.
	 */
	@property({ type: String, attribute: "client-id" })
	clientId!: string;

	/**
	 * The Google API developer key.
	 */
	@property({ type: String })
	developerKey?: string;

	/**
	 * The height of the picker dialog.
	 */
	@property({ type: Number })
	height?: number;

	/**
	 * Whether to hide the title bar of the picker dialog.
	 */
	@property({ type: Boolean, attribute: "hide-title-bar" })
	hideTitleBar?: boolean;

	/**
	 * The locale of the picker dialog.
	 */
	@property({ type: String })
	locale?: string;

	/**
	 * The maximum number of items that the user can select.
	 */
	@property({ type: Number, attribute: "max-items" })
	maxItems?: number;

	/**
	 * Whether the user can select multiple items.
	 */
	@property({ type: Boolean })
	multiselect?: boolean;

	/**
	 * The OAuth token to authenticate the user.
	 */
	@property({ type: String, attribute: "oauth-token" })
	oauthToken?: string;

	/**
	 * The origin of the picker dialog.
	 */
	@property({ type: String })
	origin?: string;

	/**
	 * The relay URL to use for cross-origin communication.
	 */
	@property({ type: String, attribute: "relay-url" })
	relayUrl?: string;

	/**
	 * The scope of the OAuth token.
	 */
	@property({ type: String })
	scope = "https://www.googleapis.com/auth/drive.file";

	/**
	 * The title of the picker dialog.
	 */
	@property({ type: String })
	title = "";

	/**
	 * Whether the picker dialog is visible.
	 */
	@property({ type: Boolean, reflect: true })
	visible = true;

	/**
	 * The width of the picker dialog.
	 */
	@property({ type: Number })
	width?: number;

	/**
	 * The `google.Picker.View` objects to display in the picker as defined by the slot elements.
	 */
	protected get views(): (View | google.picker.ViewId)[] {
		const views = nestedViews(this);
		return views.length ? views : ["all" as google.picker.ViewId];
	}

	override async connectedCallback(): Promise<void> {
		super.connectedCallback();
		await loadApi();

		// Watch for changes in the picker element slot and their attributes
		this.observer = new MutationObserver((mutations) => {
			const filteredMutations = mutations.filter(
				(mutation) =>
					mutation.type === "childList" ||
					(mutation.type === "attributes" && mutation.target !== this),
			);

			if (filteredMutations.length) {
				this.requestUpdate();
			}
		});

		this.observer?.observe(this, {
			childList: true,
			subtree: true,
			attributes: true,
		});
	}

	protected override update(changedProperties: Map<PropertyKey, unknown>) {
		// dispose the picker if any property other than visible is changed
		if (!(changedProperties.size === 1 && changedProperties.has("visible"))) {
			this.picker?.dispose();
			this.picker = undefined;
		}

		if (changedProperties.has("oauthToken")) {
			this._oauthToken = this.oauthToken;
		}

		if (
			(this.visible && changedProperties.has("clientId")) ||
			changedProperties.has("scope") ||
			!this._oauthToken
		) {
			retrieveAccessToken(this.clientId, this.scope).then((oauthToken) => {
				this._oauthToken = oauthToken;
				this.requestUpdate();
			});
		}
		super.update(changedProperties);
	}

	protected override render() {
		if (!this.picker) {
			this.build();
		}

		this.picker?.setVisible(this.visible);

		return html`<slot></slot>`;
	}

	private build() {
		if (!this._oauthToken) {
			return;
		}

		let builder = new google.picker.PickerBuilder()
			.setOAuthToken(this._oauthToken)
			.setCallback((data: google.picker.ResponseObject) => {
				this.callbackToDispatchEvent(data);
			});

		for (const view of this.views) {
			builder = builder.addView(view);
		}

		builder = setBuilderProperties(builder, this);

		this.picker = builder.build();
	}

	private callbackToDispatchEvent(data: google.picker.ResponseObject) {
		this.visible = Boolean(this.picker?.isVisible());
		this.dispatch(data.action, data);
	}

	override disconnectedCallback(): void {
		this.picker?.dispose();
		super.disconnectedCallback();
	}

	private dispatch(
		type: google.picker.Action,
		detail: google.picker.ResponseObject,
	) {
		this.dispatchEvent(new CustomEvent(type, { detail }));
	}

	protected override createRenderRoot(): HTMLElement | DocumentFragment {
		return this;
	}
}

function isView(obj: HTMLElement): obj is PickerViewElement {
	return "view" in obj && obj.view instanceof google.picker.View;
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

function setBuilderProperties(
	_builder: google.picker.PickerBuilder,
	{ appId, developerKey, relayUrl, title }: DrivePickerElementProps,
) {
	let builder = _builder;
	if (appId) {
		builder = builder.setAppId(appId);
	}

	if (developerKey) {
		builder = builder.setDeveloperKey(developerKey);
	}

	if (relayUrl) {
		builder = builder.setRelayUrl(relayUrl);
	}

	if (title) {
		builder = builder.setTitle(title);
	}

	return builder;
}

declare global {
	interface HTMLElementTagNameMap {
		"drive-picker": DrivePickerElement;
	}
}
