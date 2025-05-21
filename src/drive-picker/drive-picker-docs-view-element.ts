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

type ViewId = keyof typeof google.picker.ViewId;

/**
 * The `drive-picker-docs-view` element is used to define a [`google.picker.DocsView`](https://developers.google.com/drive/picker/reference/picker.docsview).
 *
 * @element drive-picker-docs-view
 * @attr {"default"|"true"|"false"} enable-drives - Whether to allow the user to select files from shared drives. See [`DocsView.enableDrives`](https://developers.google.com/drive/picker/reference/picker.docsview.setenabledrives).
 * @attr {"default"|"true"|"false"} include-folders - Whether to include folders in the view. See [`DocsView.includeFolders`](https://developers.google.com/drive/picker/reference/picker.docsview.setincludefolders).
 * @attr {string} mime-types - A comma-separated list of MIME types to filter the view. See [`View.setMimeTypes`](https://developers.google.com/drive/picker/reference/picker.view.setmimetypes).
 * @attr {string} file-ids - A comma-separated list of file IDs to filter the view. See [`View.setFileIds`](https://developers.google.com/workspace/drive/picker/reference/picker.docsview.setfileids).
 * @attr {string} mode - The mode of the view. See [`DocsViewMode`](https://developers.google.com/drive/picker/reference/picker.docsviewmode).
 * @attr {"default"|"true"|"false"} owned-by-me - Whether to show files owned by the user. See [`DocsView.ownedByMe`](https://developers.google.com/drive/picker/reference/picker.docsview.setownedbyme).
 * @attr {string} parent - The ID of the folder to view. See [`DocsView.setParent`](https://developers.google.com/drive/picker/reference/picker.docsview.setparent).
 * @attr {string} query - The query string to filter the view. See [`View.setQuery`](https://developers.google.com/drive/picker/reference/picker.view.setquery).
 * @attr {"default"|"true"|"false"} select-folder-enabled - Whether to allow the user to select folders. See [`DocsView.selectFolderEnabled`](https://developers.google.com/drive/picker/reference/picker.docsview.setselectfolderenabled).
 * @attr {"default"|"true"|"false"} starred - Whether to show starred files. See [`DocsView.starred`](https://developers.google.com/drive/picker/reference/picker.docsview.setstarred).
 * @attr {string} view-id - The `keyof typeof google.picker.ViewId`. For example, `"DOCS"`, which is equivalent to `google.picker.ViewId.DOCS`. See [`ViewId`](https://developers.google.com/drive/picker/reference/picker.viewid).
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
			"enable-drives",
			"file-ids",
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

		const fileIds = this.getAttribute("file-ids");
		if (fileIds !== null) view.setFileIds(fileIds);

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
