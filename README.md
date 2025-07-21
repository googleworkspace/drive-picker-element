![](./logo.jpg)

[![npm](https://img.shields.io/npm/v/@googleworkspace/drive-picker-element)](https://www.npmjs.com/package/@googleworkspace/drive-picker-element)
[![Test](https://github.com/googleworkspace/drive-picker-element/actions/workflows/test.yml/badge.svg)](https://github.com/googleworkspace/drive-picker-element/actions/workflows/test.yml)
![Release](https://github.com/googleworkspace/drive-picker-element/workflows/Release/badge.svg)

## Description

The [Google Drive Picker] web component offers a seamless way to integrate the Google Picker API into your web applications. This component is framework-agnostic, meaning it works effortlessly with React, Svelte, Vue, Angular, and more.

The Google Picker API is a JavaScript API that allows users to select or upload Google Drive files. This component acts as a "File Open" dialog, providing access to and interaction with files stored on Google Drive.

Explore the [storybook demo](https://googleworkspace.github.io/drive-picker-element/?path=/docs/stories-drive-picker--docs) to see the component in action.

See the framework specific demos:

- [React](https://codesandbox.io/p/sandbox/xenodochial-leaf-j2xtdq)
- [Svelte](https://codesandbox.io/p/sandbox/svelte-drive-picker-kd9swx)

## Index

- [Install](#install)
- [Usage](#usage)
  - [Import the Component](#import-the-component)
  - [Add the Component to Your HTML](#add-the-component-to-your-html)
  - [Use the `oauth-token` attribute](#use-the-oauth-token-attribute)
  - [Listening to Events](#listening-to-events)
  - [Event Details](#event-details)
  - [Controlling Visibility](#controlling-visibility)
  - [React and JSX](#react-and-jsx)
- [Support](#support)
- [Reference](#reference)
  - [`<drive-picker/>`](#drive-picker)
  - [`<drive-picker-docs-view/>`](#drive-picker-docs-view)

## Install

Install using NPM or similar.

```sh
npm i @googleworkspace/drive-picker-element
```

A CDN version is also available. See the [unpkg](https://unpkg.com/browse/@googleworkspace/drive-picker-element/dist/).

```html
<script src="https://unpkg.com/@googleworkspace/drive-picker-element@0/dist/index.iife.min.js"></script>
```

## Usage

To use the `drive-picker` component in your project, follow these steps:

### Import the Component

First, import the `drive-picker` component in your JavaScript file:

```js
import "@googleworkspace/drive-picker-element";
```

This isn't necessary if you're using the CDN version.

### Add the Component to Your HTML

Next, add the `drive-picker` component to your HTML file. Replace `YOUR_CLIENT_ID` and `YOUR_APP_ID` with your actual client ID and app ID.

> Note: You can find these values in the [Google Cloud Console](https://console.cloud.google.com/) under "APIs & Services" > "Credentials". You can also follow this guide to [create a new OAuth 2.0 client ID](https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid).

```html
<drive-picker client-id="YOUR_CLIENT_ID" app-id="YOUR_APP_ID">
  <drive-picker-docs-view starred="true"></drive-picker-docs-view>
</drive-picker>
```

> Note: If you wish to register the component with a different name, you can import the components individually and call `customElements.define()` manually:

```js
import {
  DrivePickerElement,
  DrivePickerDocsViewElement,
} from "@googleworkspace/drive-picker-element/drive-picker";
customElements.define("custom-drive-picker", DrivePickerElement);
customElements.define(
  "custom-drive-picker-docs-view",
  DrivePickerDocsViewElement,
);
```

### Use the `oauth-token` attribute

If you already have an OAuth token, you can pass it to the `drive-picker` component using the `oauth-token` attribute. This will authenticate the user without requiring them to sign in again.

```html
<drive-picker app-id="YOUR_APP_ID" oauth-token="OAUTH_TOKEN"></drive-picker>
```

If you don't have an OAuth token, you can listen for the `"picker:authenticated"` event to get the token after the user has authenticated. This library wraps the [Google Identity Servies library](https://developers.google.com/identity/oauth2/web/guides/overview) to make it easier to authenticate users.

### Listening to Events

The `drive-picker` component emits several events that you can listen to. Here is an example of how to listen to these events:

```html
<drive-picker client-id="YOUR_CLIENT_ID" app-id="YOUR_APP_ID">
  <drive-picker-docs-view starred="true"></drive-picker-docs-view>
</drive-picker>

<script>
  const element = document.querySelector("drive-picker");
  element.addEventListener("picker:authenticated", console.log);
  element.addEventListener("picker:picked", console.log);
  element.addEventListener("picker:canceled", console.log);
</script>
```

### Event Details

Most of these events return the [`Picker ResponseObject`](https://developers.google.com/drive/picker/reference/picker.responseobject) as the event detail. For example, the `"picker:picked"` `CustomEvent` contains details about the selected files:

```js
{
  "type": "picker:picked",
  "detail": {
    "action": "picked",
    "docs": [
      {
        "id": "OMITTED",
        "mimeType": "application/pdf",
        "name": "OMITTED",
        "url": "https://drive.google.com/file/d/OMITTED/view?usp=drive_web",
        "sizeBytes": 12345
        // ... other properties omitted
      }
    ]
  }
}
```

The `"picker:authenticated"` event returns the `token` as the event detail:

```js
{
  "type": "picker:authenticated",
  "detail": {
    "token": "OMITTED"
  }
}
```

### Controlling Visibility

To make the picker visible, set the `visible` property of the `drive-picker` element to `true`:

```html
<drive-picker client-id="YOUR_CLIENT_ID" app-id="YOUR_APP_ID"></drive-picker>

<script>
  const element = document.querySelector("drive-picker");
  element.visible = true;
</script>
```

After the picker dialog has been closed, the `visible` property will be reset to `false`.

### React and JSX

To use the component in a React application, you can extend the global `JSX` namespace as follows:

```ts
import type {
  DrivePickerElement,
  DrivePickerDocsViewElement,
  DrivePickerElementProps,
  DrivePickerDocsViewElementProps,
} from "@googleworkspace/drive-picker-element";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "drive-picker": React.DetailedHTMLProps<
        React.HTMLAttributes<DrivePickerElement> & DrivePickerElementProps,
        DrivePickerElement
      >;
      "drive-picker-docs-view": React.DetailedHTMLProps<
        React.HTMLAttributes<DrivePickerDocsViewElement> &
          DrivePickerDocsViewElementProps,
        DrivePickerDocsViewElement
      >;
    }
  }
}
```

The above snippet can be added to a declaration file (e.g. `app.d.ts`) in your React project.

## Support

To report issues or feature requests for the underlying Drive Picker, please use the [Google Picker issue tracker](https://developers.google.com/drive/picker/support#developer_product_feedback). For all other issues, please use the [GitHub issue tracker](https://github.com/googleworkspace/drive-picker-element/issues).

## Reference

<!-- START docs -->

### `<drive-picker/>`

The `drive-picker` web component provides a convenient way to declaratively
build
[`google.picker.Picker`](https://developers.google.com/drive/picker/reference/picker)
by using the component attributes mapped to the corresponding methods of
[`google.picker.PickerBuilder`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder).

#### Attributes

| Name                     | Type                                      | Description                                                                                                                                                                                             |
| ------------------------ | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app-id`                 | `string`                                  | The Google Drive app ID. See [`PickerBuilder.setAppId`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setappid).                                                            |
| `client-id`              | `string`                                  | The OAuth 2.0 client ID. See [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/oauth2).                                                                          |
| `debounce-delay`         | `number`                                  | The debounce delay in milliseconds before building the picker after an attribute change.                                                                                                                |
| `developer-key`          | `string`                                  | The API key for accessing Google Picker API. See [`PickerBuilder.setDeveloperKey`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setdeveloperkey).                          |
| `hide-title-bar`         | `"default"\|"true"\|"false"`              | Hides the title bar of the picker if set to true. See [`PickerBuilder.hideTitleBar`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.hidetitlebar).                           |
| `locale`                 | `string`                                  | The locale to use for the picker. See [`PickerBuilder.setLocale`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setlocale).                                                 |
| `max-items`              | `number`                                  | The maximum number of items that can be selected. See [`PickerBuilder.setMaxItems`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setmaxitems).                             |
| `mine-only`              | `boolean`                                 | If set to true, only shows files owned by the user. See [`PickerBuilder.enableFeature`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.enablefeature).                       |
| `multiselect`            | `boolean`                                 | Enables multiple file selection if set to true. See [`PickerBuilder.enableFeature`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.enablefeature).                           |
| `nav-hidden`             | `boolean`                                 | Hides the navigation pane if set to true. See [`PickerBuilder.enableFeature`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.enablefeature).                                 |
| `oauth-token`            | `string`                                  | The OAuth 2.0 token for authentication. See [`PickerBuilder.setOAuthToken`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setoauthtoken).                                   |
| `origin`                 | `string`                                  | The origin parameter for the picker. See [`PickerBuilder.setOrigin`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setorigin).                                              |
| `relay-url`              | `string`                                  | The relay URL for the picker. See [`PickerBuilder.setRelayUrl`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.setrelayurl).                                                 |
| `scope`                  | `string`                                  | The OAuth 2.0 scope for the picker. The default is `https://www.googleapis.com/auth/drive.file`. See [Drive API scopes](https://developers.google.com/drive/api/guides/api-specific-auth#drive-scopes). |
| `title`                  | `string`                                  | The title of the picker. See [`PickerBuilder.setTitle`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder.settitle).                                                            |
| `hd`                     | `string`                                  | The hosted domain to restrict sign-in to. (Optional) See the `hd` field in the OpenID Connect docs.                                                                                                     |
| `include-granted-scopes` | `boolean`                                 | Enables applications to use incremental authorization. See [`TokenClientConfig.include_granted_scopes`](https://developers.google.com/identity/oauth2/web/reference/js-reference#TokenClientConfig).    |
| `login-hint`             | `string`                                  | An email address or an ID token 'sub' value. Google will use the value as a hint of which user to sign in. See the `login_hint` field in the OpenID Connect docs.                                       |
| `prompt`                 | `""\|"none"\|"consent"\|"select_account"` | A space-delimited, case-sensitive list of prompts to present the user. See [`TokenClientConfig.prompt`](https://developers.google.com/identity/oauth2/web/reference/js-reference#TokenClientConfig)     |

#### Events

| Name                    | Type                  | Description                                                                                                                                                                                          |
| ----------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `picker-oauth-error`    | `OAuthErrorEvent`     | Triggered when an error occurs in the OAuth flow. See the [error guide](https://developers.google.com/identity/oauth2/web/guides/error). Note that the `TokenResponse` object can have error fields. |
| `picker-oauth-response` | `OAuthResponseEvent`  | Triggered when an OAuth flow completes. See the [token model guide](https://developers.google.com/identity/oauth2/web/guides/use-token-model).                                                       |
| `picker-canceled`       | `PickerCanceledEvent` | Triggered when the user cancels the picker dialog. See [`ResponseObject`](https://developers.google.com/drive/picker/reference/picker.responseobject).                                               |
| `picker-picked`         | `PickerPickedEvent`   | Triggered when the user picks one or more items. See [`ResponseObject`](https://developers.google.com/drive/picker/reference/picker.responseobject).                                                 |
| `picker-error`          | `PickerErrorEvent`    | Triggered when an error occurs. See [`ResponseObject`](https://developers.google.com/drive/picker/reference/picker.responseobject).                                                                  |

#### Slots

| Name    | Description                                                                                                                                          |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| default | The default slot contains View elements to display in the picker. Each View element should implement a property `view` of type `google.picker.View`. |

#### Properties

| Name                | Type      | Description                                                                                                                                                                          |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `visible`           | `boolean` | Controls the visibility of the picker after the picker dialog has been&#xA;closed. If any of the attributes change, the picker will be rebuilt and&#xA;the visibility will be reset. |
| `tokenClientConfig` | \`Omit<   |                                                                                                                                                                                      |

```
	google.accounts.oauth2.TokenClientConfig,
	"callback" \| "error_callback" 	>` |                                                                                                                                                                                      |
```

### `<drive-picker-docs-view/>`

The `drive-picker-docs-view` element is used to define a [`google.picker.DocsView`](https://developers.google.com/drive/picker/reference/picker.docsview).

#### Attributes

| Name                    | Type                         | Description                                                                                                                                                                                             |
| ----------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enable-drives`         | `"default"\|"true"\|"false"` | Whether to allow the user to select files from shared drives. See [`DocsView.enableDrives`](https://developers.google.com/drive/picker/reference/picker.docsview.setenabledrives).                      |
| `file-ids`              | `string`                     | A comma-separated list of file IDs to filter the view. See [`View.setFileIds`](https://developers.google.com/workspace/drive/picker/reference/picker.docsview.setfileids).                              |
| `include-folders`       | `"default"\|"true"\|"false"` | Whether to include folders in the view. See [`DocsView.includeFolders`](https://developers.google.com/drive/picker/reference/picker.docsview.setincludefolders).                                        |
| `mime-types`            | `string`                     | A comma-separated list of MIME types to filter the view. See [`View.setMimeTypes`](https://developers.google.com/drive/picker/reference/picker.view.setmimetypes).                                      |
| `mode`                  | `string`                     | The mode of the view. See [`DocsViewMode`](https://developers.google.com/drive/picker/reference/picker.docsviewmode).                                                                                   |
| `owned-by-me`           | `"default"\|"true"\|"false"` | Whether to show files owned by the user. See [`DocsView.ownedByMe`](https://developers.google.com/drive/picker/reference/picker.docsview.setownedbyme).                                                 |
| `parent`                | `string`                     | The ID of the folder to view. See [`DocsView.setParent`](https://developers.google.com/drive/picker/reference/picker.docsview.setparent).                                                               |
| `query`                 | `string`                     | The query string to filter the view. See [`View.setQuery`](https://developers.google.com/drive/picker/reference/picker.view.setquery).                                                                  |
| `select-folder-enabled` | `"default"\|"true"\|"false"` | Whether to allow the user to select folders. See [`DocsView.selectFolderEnabled`](https://developers.google.com/drive/picker/reference/picker.docsview.setselectfolderenabled).                         |
| `starred`               | `"default"\|"true"\|"false"` | Whether to show starred files. See [`DocsView.starred`](https://developers.google.com/drive/picker/reference/picker.docsview.setstarred).                                                               |
| `view-id`               | `string`                     | The `keyof typeof google.picker.ViewId`. For example, `"DOCS"`, which is equivalent to `google.picker.ViewId.DOCS`. See [`ViewId`](https://developers.google.com/drive/picker/reference/picker.viewid). |

#### Properties

| Name   | Type                     | Description                                                              |
| ------ | ------------------------ | ------------------------------------------------------------------------ |
| `view` | `google.picker.DocsView` | Gets the Google Drive Picker view based on the current attribute values. |

<!-- END docs -->

[Google Drive Picker]: https://developers.google.com/drive/picker/guides/overview
[Google Drive Picker Reference]: https://developers.google.com/drive/picker/reference/picker
