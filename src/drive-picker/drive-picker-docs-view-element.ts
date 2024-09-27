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
import { HTMLElementWithHelpers } from "../utils";
export type ViewId = keyof typeof google.picker.ViewId;

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
export class DrivePickerDocsViewElement extends HTMLElementWithHelpers {
  /**
   * Gets the Google Drive Picker view based on the current property values.
   * @returns {google.picker.DocsView} The Google Drive picker view.
   */
  public get view(): google.picker.DocsView {
    const viewId = this.getAttribute("viewId");

    const view = new window.google.picker.DocsView(
      viewId ? window.google.picker.ViewId[viewId as ViewId] : undefined
    );

    const label = this.getAttribute("label");
    // @ts-ignore TODO: fix typings in @types/google.picker
    if (label !== null) view.setLabel(label);

    const enableDrives = this.getBooleanAttribute("enable-drives");
    if (enableDrives !== null) view.setEnableDrives(enableDrives);

    const includeFolders = this.getBooleanAttribute("include-folders");
    if (includeFolders !== null) view.setIncludeFolders(includeFolders);

    const mimetypes = this.getAttribute("mime-types");
    if (mimetypes !== null) view.setMimeTypes(mimetypes);

    const mode = this.getAttribute("mode");
    if (mode)
      view.setMode(
        google.picker.DocsViewMode[
          mode as keyof typeof google.picker.DocsViewMode
        ]
      );

    const ownedByMe = this.getBooleanAttribute("owned-by-me");
    if (ownedByMe !== null) view.setOwnedByMe(ownedByMe);

    const parent = this.getAttribute("parent");
    if (parent !== null) view.setParent(parent);

    const query = this.getAttribute("query");
    // @ts-ignore TODO: fix typings
    if (query !== null) view.setQuery(query);

    const selectFolderEnabled = this.getBooleanAttribute(
      "select-folder-enabled"
    );
    if (selectFolderEnabled !== null)
      view.setSelectFolderEnabled(selectFolderEnabled);

    const starred = this.getBooleanAttribute("starred");
    if (starred !== null) view.setStarred(starred);

    return view;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "drive-picker-docs-view": DrivePickerDocsViewElement;
  }
}
customElements.define("drive-picker-docs-view", DrivePickerDocsViewElement);
