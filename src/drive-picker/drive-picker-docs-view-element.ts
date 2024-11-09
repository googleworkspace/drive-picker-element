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
import { setBoolAttrWithDefault } from "../utils";
export type ViewId = keyof typeof google.picker.ViewId;

/**
 * The `drive-picker-docs-view` element is used to define a [`google.picker.DocsView`](https://developers.google.com/drive/picker/reference/picker.docsview).
 *
 * @element drive-picker-docs-view
 * @attr {"default"|"true"|"false"} enable-drives - Whether to allow the user to select files from shared drives.
 * @attr {"default"|"true"|"false"} include-folders - Whether to include folders in the view.
 * @attr {string} mime-types - A comma-separated list of MIME types to filter the view.
 * @attr {string} mode - The mode of the view.
 * @attr {"default"|"true"|"false"} owned-by-me - Whether to show files owned by the user.
 * @attr {string} parent - The ID of the folder to view.
 * @attr {string} query - The query string to filter the view.
 * @attr {"default"|"true"|"false"} select-folder-enabled - Whether to allow the user to select folders.
 * @attr {"default"|"true"|"false"} starred - Whether to show starred files.
 * @attr {string} view-id - The ID of the view.
 *
 * @example
 *
 * ```html
 * <drive-picker-docs-view ownedByMe=""></drive-picker-docs-view>
 * ```
 *
 * @see https://developers.google.com/drive/picker/reference/picker.docsview
 *
 */
export class DrivePickerDocsViewElement extends HTMLElement {
	static get observedAttributes() {
		return [
			/** foo */
			"enable-drives",
			"include-folders",
			"mime-types",
			"mode",
			"owned-by-me",
			"parent",
			"query",
			"select-folder-enabled",
			"starred",
			"view-id",
		];
	}

	/**
	 * Gets the Google Drive Picker view based on the current attribute values.
	 * @returns {google.picker.DocsView} The Google Drive picker view.
	 */
	public get view(): google.picker.DocsView {
		const view = new window.google.picker.DocsView(this.viewId);

		setBoolAttrWithDefault("enable-drives", this, view.setEnableDrives, view);
		setBoolAttrWithDefault(
			"include-folders",
			this,
			view.setIncludeFolders,
			view,
		);
		setBoolAttrWithDefault("owned-by-me", this, view.setOwnedByMe, view);
		setBoolAttrWithDefault(
			"select-folder-enabled",
			this,
			view.setSelectFolderEnabled,
			view,
		);
		setBoolAttrWithDefault("starred", this, view.setStarred, view);

		const mimetypes = this.getAttribute("mime-types");
		if (mimetypes !== null) view.setMimeTypes(mimetypes);

		const mode = this.getAttribute("mode");
		if (mode)
			view.setMode(
				google.picker.DocsViewMode[
					mode as keyof typeof google.picker.DocsViewMode
				],
			);

		const parent = this.getAttribute("parent");
		if (parent !== null) view.setParent(parent);

		const query = this.getAttribute("query");
		if (query !== null) view.setQuery(query);

		return view;
	}

	private get viewId(): google.picker.ViewId | undefined {
		const viewId = this.getAttribute("view-id");
		return viewId ? window.google.picker.ViewId[viewId as ViewId] : undefined;
	}
}
