![](./docs/logo.jpg)

[![npm](https://img.shields.io/npm/v/@googleworkspace/drive-picker-element)](https://www.npmjs.com/package/@googleworkspace/drive-picker-element)
[![Test](https://github.com/googleworkspace/drive-picker-element/actions/workflows/test.yml/badge.svg)](https://github.com/googleworkspace/drive-picker-element/actions/workflows/test.yml)
![Release](https://github.com/googleworkspace/drive-picker-element/workflows/Release/badge.svg)

## Description

A Web Component for [Google Drive Picker].

## Install

Install using NPM or similar.

```sh
npm i @googleworkspace/drive-picker-element
```

```sh
yarn add @googleworkspace/drive-picker-element
```

```sh
pnpm add @googleworkspace/drive-picker-element
```

## Usage

```js
import "@googleworkspace/drive-picker-element";
```

```html
<drive-picker clientId="YOUR_CLIENT_ID" appId="YOUR_APP_ID">
  <drive-picker-docs-view
    mimeTypes="application/json"
    label="JSON"
  ></drive-picker-docs-view>
  <drive-picker-docs-view ownedbyme="" label="Mine"></drive-picker-docs-view>
  <drive-picker-docs-view starred="" label="Starred"></drive-picker-docs-view>
</drive-picker>
```

See the components and the official reference documentation for more details:

| Status                                                                        | Component                                                     | Reference Docs                                                                                        |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| ✅                                                                            | [\<drive-picker/\>](#drive-picker)                            | [PickerBuilder API Reference](https://developers.google.com/drive/picker/reference#picker-builder)    |
| ✅                                                                            | [\<drive-picker-docs-view/\>](#drive-picker-docs-view)        | [DocsView API Reference](https://developers.google.com/drive/picker/reference#docs-view)              |
| ❌ - [ToDo](https://github.com/googleworkspace/drive-picker-element/issues/4) | [\<drive-picker-docs-upload-view/\>](#drive-picker-docs-view) | [DocsUploadView API Reference](https://developers.google.com/drive/picker/reference#docs-upload-view) |

To report issues or feature requests for the underlying Drive Picker, please use the [issue tracker](https://developers.google.com/drive/picker/support#developer_product_feedback).

<!-- START docs -->

<a name="drive-picker"></a>

## drive-picker

The `drive-picker` web component provides a convenient way to integrate the Google Picker API into your web applications. The Google Picker API is a JavaScript API that allows users to select or upload Google Drive files. This component acts as a "File Open" dialog for accessing and interacting with files stored on Google Drive.

Features:

- Provides a similar look-and-feel to the Google Drive UI.
- Offers several views showing previews and thumbnail images of Drive files.
- Displays as an inline, modal window, ensuring users never leave the main application.

Note: The Google Picker API does not support file organization, moving, or copying. For these operations, you should use either the Google Drive API or the Drive UI.

### Example

```html
<drive-picker
  app-id="675807958095"
  client-id="675807958095-nsptdcn5qdb6pl44cge1c6ghact9t5q0.apps.googleusercontent.com"
>
  <drive-picker-docs-view></drive-picker-docs-view>
</drive-picker>
```

### Properties

| Property       | Attribute        | Type                   | Default                                      | Description                                           |
| -------------- | ---------------- | ---------------------- | -------------------------------------------- | ----------------------------------------------------- |
| `appId`        | `app-id`         | `string`               |                                              | The Google Drive app ID.                              |
| `clientId`     | `client-id`      | `string`               |                                              | The Google API client ID.                             |
| `developerKey` | `developerKey`   | `string \| undefined`  |                                              | The Google API developer key.                         |
| `height`       | `height`         | `number \| undefined`  |                                              | The height of the picker dialog.                      |
| `hideTitleBar` | `hide-title-bar` | `boolean \| undefined` |                                              | Whether to hide the title bar of the picker dialog.   |
| `locale`       | `locale`         | `string \| undefined`  |                                              | The locale of the picker dialog.                      |
| `maxItems`     | `max-items`      | `number \| undefined`  |                                              | The maximum number of items that the user can select. |
| `multiselect`  | `multiselect`    | `boolean \| undefined` |                                              | Whether the user can select multiple items.           |
| `oauthToken`   | `oauth-token`    | `string \| undefined`  |                                              | The OAuth token to authenticate the user.             |
| `origin`       | `origin`         | `string \| undefined`  |                                              | The origin of the picker dialog.                      |
| `relayUrl`     | `relay-url`      | `string \| undefined`  |                                              | The relay URL to use for cross-origin communication.  |
| `scope`        | `scope`          | `string`               | "https://www.googleapis.com/auth/drive.file" | The scope of the OAuth token.                         |
| `title`        | `title`          | `string`               | ""                                           | The title of the picker dialog.                       |
| `visible`      | `visible`        | `boolean`              | true                                         | Whether the picker dialog is visible.                 |
| `width`        | `width`          | `number \| undefined`  |                                              | The width of the picker dialog.                       |

### Methods

| Method                | Type                                                                                                                                                 |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `addEventListener`    | `(type: "cancel" \| "picked", listener: (ev: CustomEvent<ResponseObject>): void, options?: boolean \| AddEventListenerOptions \| undefined) => void` |
| `removeEventListener` | `(type: "cancel" \| "picked", listener: (ev: CustomEvent<ResponseObject>): void, options?: boolean \| EventListenerOptions \| undefined) => void`    |

### Events

| Event    | Type                                        | Description                                        |
| -------- | ------------------------------------------- | -------------------------------------------------- |
| `cancel` | `CustomEvent<google.picker.ResponseObject>` | Triggered when the user cancels the picker dialog. |
| `picked` | `CustomEvent<google.picker.ResponseObject>` | Triggered when the user picks one or more items.   |

### Slots

| Name | Description                                                                                                                    |
| ---- | ------------------------------------------------------------------------------------------------------------------------------ |
|      | The View elements to display in the picker. Each View element should implement a property `view` of type `google.picker.View`. |

<a name="drive-picker-docs-view"></a>

## drive-picker-docs-view

The `drive-picker-docs-view` element is used to define a view for the Google Drive Picker.

### Example

```html
<drive-picker-docs-view ownedByMe=""></drive-picker-docs-view>
```

### Properties

| Property              | Attribute               | Modifiers | Type                                                                                                                                                                                                                       | Default | Description                                                                                                                                                                                                                                                                                              |
| --------------------- | ----------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enableDrives`        | `enable-drives`         |           | `boolean \| undefined`                                                                                                                                                                                                     |         | Indicates whether to enable drives in the view.                                                                                                                                                                                                                                                          |
| `includeFolders`      | `include-folders`       |           | `boolean \| undefined`                                                                                                                                                                                                     |         | Indicates whether to include folders in the view.                                                                                                                                                                                                                                                        |
| `label`               | `label`                 |           | `string \| undefined`                                                                                                                                                                                                      |         | The label of the view.                                                                                                                                                                                                                                                                                   |
| `mimeTypes`           | `mime-types`            |           | `string \| undefined`                                                                                                                                                                                                      |         | The MIME types to filter the view by.                                                                                                                                                                                                                                                                    |
| `mode`                | `mode`                  |           | `"GRID" \| "LIST"`                                                                                                                                                                                                         | "GRID"  | The mode of the view. This should be one of the values of the `google.picker.DocsViewMode` enum.                                                                                                                                                                                                         |
| `ownedByMe`           | `owned-by-me`           |           | `boolean \| undefined`                                                                                                                                                                                                     |         | Indicates whether to show only files owned by the user in the view.                                                                                                                                                                                                                                      |
| `parent`              | `parent`                |           | `string \| undefined`                                                                                                                                                                                                      |         | The ID of the parent folder to restrict the view to.                                                                                                                                                                                                                                                     |
| `query`               | `query`                 |           | `string \| undefined`                                                                                                                                                                                                      |         | The query string to filter the view by.                                                                                                                                                                                                                                                                  |
| `selectFolderEnabled` | `select-folder-enabled` |           | `boolean \| undefined`                                                                                                                                                                                                     |         | Indicates whether selecting folders is enabled in the view.                                                                                                                                                                                                                                              |
| `starred`             | `starred`               |           | `boolean \| undefined`                                                                                                                                                                                                     |         | Indicates whether to show only starred files in the view.                                                                                                                                                                                                                                                |
| `view`                |                         | readonly  | `DocsView`                                                                                                                                                                                                                 |         | Gets the Google Drive Picker view based on the current property values.                                                                                                                                                                                                                                  |
| `viewId`              | `view-id`               |           | `"DOCS" \| "DOCS_IMAGES" \| "DOCS_IMAGES_AND_VIDEOS" \| "DOCS_VIDEOS" \| "DOCUMENTS" \| "DRAWINGS" \| "FOLDERS" \| "FORMS" \| "IMAGE_SEARCH" \| "PDFS" \| "PHOTO_ALBUMS" \| "PHOTO_UPLOAD" \| ... 6 more ... \| "YOUTUBE"` | "DOCS"  | The ID of the view. This should be one of the values of the<br />`google.picker.ViewId` enum.<br /><br />Note: The default value is `DOCS` which corresponds to the<br />`google.picker.ViewId.DOCS` enum value in the Google Drive Picker API and<br />corresponsds to all Google Drive document types. |

<!-- END docs -->

## Development

```sh
pnpm install
pnpm build
pnpm serve
pnpm storybook
```

[Google Drive Picker]: https://developers.google.com/drive/picker/guides/overview
