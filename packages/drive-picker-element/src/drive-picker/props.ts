/**
 * Copyright 2025 Google LLC
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

export interface DrivePickerElementProps {
	/** The Google Drive app ID. See [`PickerBuilder.setAppId`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setappid).*/
	"app-id"?: string;
	/** The OAuth 2.0 client ID. See [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/oauth2).*/
	"client-id"?: string;
	/** The debounce delay in milliseconds before building the picker after an attribute change.*/
	"debounce-delay"?: number;
	/** The API key for accessing Google Picker API. See [`PickerBuilder.setDeveloperKey`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setdeveloperkey).*/
	"developer-key"?: string;
	/** Hides the title bar of the picker if set to true. See [`PickerBuilder.hideTitleBar`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.hidetitlebar).*/
	"hide-title-bar"?: "default" | "true" | "false";
	/** The locale to use for the picker. See [`PickerBuilder.setLocale`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setlocale).*/
	locale?: string;
	/** The maximum number of items that can be selected. See [`PickerBuilder.setMaxItems`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setmaxitems).*/
	"max-items"?: number;
	/** If set to true, only shows files owned by the user. See [`PickerBuilder.enableFeature`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.enablefeature).*/
	"mine-only"?: boolean;
	/** Enables multiple file selection if set to true. See [`PickerBuilder.enableFeature`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.enablefeature).*/
	multiselect?: boolean;
	/** Hides the navigation pane if set to true. See [`PickerBuilder.enableFeature`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.enablefeature).*/
	"nav-hidden"?: boolean;
	/** The OAuth 2.0 token for authentication. See [`PickerBuilder.setOAuthToken`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setoauthtoken).*/
	"oauth-token"?: string;
	/** The origin parameter for the picker. See [`PickerBuilder.setOrigin`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setorigin).*/
	origin?: string;
	/** The relay URL for the picker. See [`PickerBuilder.setRelayUrl`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setrelayurl).*/
	"relay-url"?: string;
	/** The OAuth 2.0 scope for the picker. The default is `https://www.googleapis.com/auth/drive.file`. See [Drive API scopes](https://developers.google.com/drive/api/guides/api-specific-auth#drive-scopes).*/
	scope?: string;
	/** The title of the picker. See [`PickerBuilder.setTitle`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.settitle).*/
	title?: string;
	/** The hosted domain to restrict sign-in to.  (Optional)  See the `hd` field in the OpenID Connect docs.*/
	hd?: string;
	/** Enables applications to use incremental authorization. See [`TokenClientConfig.include_granted_scopes`](https://developers.google.com/identity/oauth2/web/reference/js-reference#TokenClientConfig).*/
	"include-granted-scopes"?: boolean;
	/** An email address or an ID token 'sub' value. Google will use the value as a hint of which user to sign in. See the `login_hint` field in the OpenID Connect docs.*/
	"login-hint"?: string;
	/** A space-delimited, case-sensitive list of prompts to present the user.  See [`TokenClientConfig.prompt`](https://developers.google.com/identity/oauth2/web/reference/js-reference#TokenClientConfig)*/
	prompt?: "" | "none" | "consent" | "select_account";
}
export interface DrivePickerDocsViewElementProps {
	/** Whether to allow the user to select files from shared drives. See [`DocsView.enableDrives`](https://developers.google.com/drive/picker/reference/picker.docsview.setenabledrives).*/
	"enable-drives"?: "default" | "true" | "false";
	/** A comma-separated list of file IDs to filter the view. See [`View.setFileIds`](https://developers.google.com/workspace/drive/picker/reference/picker.docsview.setfileids).*/
	"file-ids"?: string;
	/** Whether to include folders in the view. See [`DocsView.includeFolders`](https://developers.google.com/drive/picker/reference/picker.docsview.setincludefolders).*/
	"include-folders"?: "default" | "true" | "false";
	/** A comma-separated list of MIME types to filter the view. See [`View.setMimeTypes`](https://developers.google.com/drive/picker/reference/picker.view.setmimetypes).*/
	"mime-types"?: string;
	/** The mode of the view. See [`DocsViewMode`](https://developers.google.com/drive/picker/reference/picker.docsviewmode).*/
	mode?: string;
	/** Whether to show files owned by the user. See [`DocsView.ownedByMe`](https://developers.google.com/drive/picker/reference/picker.docsview.setownedbyme).*/
	"owned-by-me"?: "default" | "true" | "false";
	/** The ID of the folder to view. See [`DocsView.setParent`](https://developers.google.com/drive/picker/reference/picker.docsview.setparent).*/
	parent?: string;
	/** The query string to filter the view. See [`View.setQuery`](https://developers.google.com/drive/picker/reference/picker.view.setquery).*/
	query?: string;
	/** Whether to allow the user to select folders. See [`DocsView.selectFolderEnabled`](https://developers.google.com/drive/picker/reference/picker.docsview.setselectfolderenabled).*/
	"select-folder-enabled"?: "default" | "true" | "false";
	/** Whether to show starred files. See [`DocsView.starred`](https://developers.google.com/drive/picker/reference/picker.docsview.setstarred).*/
	starred?: "default" | "true" | "false";
	/** The `keyof typeof google.picker.ViewId`. For example, `"DOCS"`, which is equivalent to `google.picker.ViewId.DOCS`. See [`ViewId`](https://developers.google.com/drive/picker/reference/picker.viewid).*/
	"view-id"?: string;
}
