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

import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export type ViewId = keyof typeof google.picker.ViewId;
type DocsViewMode = keyof typeof google.picker.DocsViewMode;

export interface DrivePickerDocsViewElementProps {
	/**
	 * Indicates whether to enable drives in the view.
	 */
	enableDrives?: boolean;

	/**
	 * Indicates whether to include folders in the view.
	 */
	includeFolders?: boolean;

	/**
	 * The MIME types to filter the view by.
	 *
	 * @see https://developers.google.com/drive/api/v3/mime-types
	 */
	mimeTypes?: string;

	/**
	 * The mode of the view. This should be one of the values of the `google.picker.DocsViewMode` enum.
	 *
	 * @see https://developers.google.com/drive/picker/reference#docs-view-mode
	 */
	mode?: DocsViewMode;

	/**
	 * Indicates whether to show only files owned by the user in the view.
	 */
	ownedByMe?: boolean;

	/**
	 * The ID of the parent folder to restrict the view to.
	 */
	parent?: string;

	/**
	 * The query string to filter the view by.
	 *
	 * @see https://developers.google.com/drive/api/v3/search-files
	 */
	query?: string;

	/**
	 * Indicates whether selecting folders is enabled in the view.
	 */
	selectFolderEnabled?: boolean;

	/**
	 * Indicates whether to show only starred files in the view.
	 */
	starred?: boolean;

	/**
	 * The ID of the view. This should be one of the values of the
	 * `google.picker.ViewId` enum.
	 *
	 * Note: The default value is `DOCS` which corresponds to the
	 * `google.picker.ViewId.DOCS` enum value in the Google Drive Picker API and
	 * corresponsds to all Google Drive document types.
	 *
	 * @see https://developers.google.com/drive/picker/reference#view-id
	 */
	viewId?: ViewId;
}

/**
 * The `drive-picker-docs-view` element is used to define a view for the Google Drive Picker.
 *
 * @element drive-picker-docs-view
 *
 * @example
 *
 * ```html
 * <drive-picker-docs-view ownedByMe=""></drive-picker-docs-view>
 * ```
 *
 * @see https://developers.google.com/drive/picker/reference#docs-view
 *
 */
@customElement("drive-picker-docs-view")
export class DrivePickerDocsViewElement
	extends LitElement
	implements DrivePickerDocsViewElementProps
{
	@property({ type: String })
	label?: string;

	@property({ type: String, attribute: "view-id" })
	viewId: ViewId = "DOCS";

	@property({ type: String, attribute: "mime-types" })
	mimeTypes?: string;

	@property({ type: String })
	query?: string;

	@property({ type: Boolean, attribute: "enable-drives" })
	enableDrives?: boolean;

	@property({ type: Boolean, attribute: "include-folders" })
	includeFolders?: boolean;

	@property({ type: Boolean, attribute: "select-folder-enabled" })
	selectFolderEnabled?: boolean;

	@property({ type: String })
	mode: DocsViewMode = "GRID";

	@property({ type: Boolean, attribute: "owned-by-me" })
	ownedByMe?: boolean;

	@property({ type: String })
	parent?: string;

	@property({ type: Boolean })
	starred?: boolean;

	/**
	 * Gets the Google Drive Picker view based on the current property values.
	 * @returns {google.picker.DocsView} The Google Drive picker view.
	 */
	public get view(): google.picker.DocsView {
		const view = new google.picker.DocsView(
			this.viewId && google.picker.ViewId[this.viewId],
		);

		if (this.enableDrives !== undefined) {
			view.setEnableDrives(this.enableDrives);
		}

		if (this.includeFolders !== undefined) {
			view.setIncludeFolders(this.includeFolders);
		}

		if (this.mimeTypes) {
			view.setMimeTypes(this.mimeTypes);
		}

		if (this.mode) {
			view.setMode(google.picker.DocsViewMode[this.mode]);
		}

		if (this.ownedByMe !== undefined) {
			view.setOwnedByMe(this.ownedByMe);
		}

		if (this.parent) {
			view.setParent(this.parent);
		}

		if (this.query) {
			view.setQuery(this.query);
		}

		if (this.selectFolderEnabled !== undefined) {
			view.setSelectFolderEnabled(this.selectFolderEnabled);
		}

		if (this.starred !== undefined) {
			view.setStarred(this.starred);
		}

		return view;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"drive-picker-docs-view": DrivePickerDocsViewElement;
	}
}
