![](./logo.jpg)

[![npm](https://img.shields.io/npm/v/@googleworkspace/drive-picker-element)](https://www.npmjs.com/package/@googleworkspace/drive-picker-element)
[![Test](https://github.com/googleworkspace/drive-picker-element/actions/workflows/test.yml/badge.svg)](https://github.com/googleworkspace/drive-picker-element/actions/workflows/test.yml)
![Release](https://github.com/googleworkspace/drive-picker-element/workflows/Release/badge.svg)

## Description

The [Google Drive Picker] web components provides a convenient way to integrate the Google Picker API into your web applications. The Google Picker API is a JavaScript API that allows users to select or upload Google Drive files. This component acts as a "File Open" dialog for accessing and interacting with files stored on Google Drive.

Try the [Demo](https://googleworkspace.github.io/drive-picker-element/?path=/docs/stories-drive-picker--docs).

## Index

- [Install](#install)
- [Usage](#usage)
- [Support](#support)
- [Reference](#reference)
  - [`<drive-picker/>`](#drive-picker)
  - [`<drive-picker-docs-view/>`](#drive-picker-docs-view)

## Install

Install using NPM or similar.

```sh
npm i @googleworkspace/drive-picker-element
```

```sh
yarn add @googleworkspace/drive-picker-element
```

```sh
pnpm i @googleworkspace/drive-picker-element
```

## Usage

```js
import "@googleworkspace/drive-picker-element";
```

```html
<drive-picker client-id="YOUR_CLIENT_ID" app-id="YOUR_APP_ID">
  <drive-picker-docs-view starred="true"></drive-picker-docs-view>
</drive-picker>
```

> Note: If you wish to register the component with a different name, `import { DrivePickerElement, DrivePickerDocsViewElement } from @googleworkspace/drive-picker-element/drive-picker` and call `customElements.define()` manually.

## Support

To report issues or feature requests for the underlying Drive Picker, please use the [Google Picker issue tracker](https://developers.google.com/drive/picker/support#developer_product_feedback). For all other issues, please use the [GitHub issue tracker](https://github.com/googleworkspace/drive-picker-element/issues).

## Reference

<!-- START docs -->

### `<drive-picker/>`

The `drive-picker` web component provides a convenient way to declaratively
build
[`google.picker.Picker`](https://developers.google.com/drive/picker/reference/picker)
by using the component attributes and
[`google.picker.PickerBuilder`](https://developers.google.com/drive/picker/reference/picker.pickerbuilder)
and load OAuth tokens.

#### Attributes

| Name             | Type                         | Description                                         |
| ---------------- | ---------------------------- | --------------------------------------------------- |
| `app-id`         | `string`                     | The Google Drive app ID.                            |
| `client-id`      | `string`                     | The OAuth 2.0 client ID.                            |
| `developer-key`  | `string`                     | The API key for accessing Google Picker API.        |
| `hide-title-bar` | `"default"\|"true"\|"false"` | Hides the title bar of the picker if set to true.   |
| `locale`         | `string`                     | The locale to use for the picker.                   |
| `max-items`      | `number`                     | The maximum number of items that can be selected.   |
| `mine-only`      | `boolean`                    | If set to true, only shows files owned by the user. |
| `multiselect`    | `boolean`                    | Enables multiple file selection if set to true.     |
| `nav-hidden`     | `boolean`                    | Hides the navigation pane if set to true.           |
| `oauth-token`    | `string`                     | The OAuth 2.0 token for authentication.             |
| `origin`         | `string`                     | The origin parameter for the picker.                |
| `relay-url`      | `string`                     | The relay URL for the picker.                       |
| `scope`          | `string`                     | The OAuth 2.0 scope for the picker.                 |
| `title`          | `string`                     | The title of the picker.                            |

#### Events

| Name                   | Type          | Description                                                                        |
| ---------------------- | ------------- | ---------------------------------------------------------------------------------- |
| `picker:authenticated` | `CustomEvent` | Triggered when the user authenticates with the provided OAuth client ID and scope. |
| `picker:canceled`      | \`\`          | Triggered when the user cancels the picker dialog.                                 |
| `picker:picked`        | \`\`          | Triggered when the user picks one or more items.                                   |
| `picker:loaded`        | \`\`          | Triggered when the picker is loaded.                                               |
| `picker:error`         | \`\`          | Triggered when an error occurs.                                                    |

#### Slots

| Name    | Description                                                                                                                                          |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| default | The default slot contains View elements to display in the picker. Each View element should implement a property `view` of type `google.picker.View`. |

#### Properties

| Name      | Type      | Description                                                                                                                                                                          |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `visible` | `boolean` | Controls the visibility of the picker after the picker dialog has been&#xA;closed. If any of the attributes change, the picker will be rebuilt and&#xA;the visibility will be reset. |

### `<drive-picker-docs-view/>`

The `drive-picker-docs-view` element is used to define a [`google.picker.DocsView`](https://developers.google.com/drive/picker/reference/picker.docsview).

#### Attributes

| Name                    | Type                         | Description                                                                                                         |
| ----------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `enable-drives`         | `"default"\|"true"\|"false"` | Whether to allow the user to select files from shared drives.                                                       |
| `include-folders`       | `"default"\|"true"\|"false"` | Whether to include folders in the view.                                                                             |
| `mime-types`            | `string`                     | A comma-separated list of MIME types to filter the view.                                                            |
| `mode`                  | `string`                     | The mode of the view.                                                                                               |
| `owned-by-me`           | `"default"\|"true"\|"false"` | Whether to show files owned by the user.                                                                            |
| `parent`                | `string`                     | The ID of the folder to view.                                                                                       |
| `query`                 | `string`                     | The query string to filter the view.                                                                                |
| `select-folder-enabled` | `"default"\|"true"\|"false"` | Whether to allow the user to select folders.                                                                        |
| `starred`               | `"default"\|"true"\|"false"` | Whether to show starred files.                                                                                      |
| `view-id`               | `string`                     | The `keyof typeof google.picker.ViewId`. For example, `"DOCS"`, which is equivalent to `google.picker.ViewId.DOCS`. |

#### Properties

| Name   | Type                     | Description                                                              |
| ------ | ------------------------ | ------------------------------------------------------------------------ |
| `view` | `google.picker.DocsView` | Gets the Google Drive Picker view based on the current attribute values. |

<!-- END docs -->

[Google Drive Picker]: https://developers.google.com/drive/picker/guides/overview
[Google Drive Picker Reference]: https://developers.google.com/drive/picker/reference/picker
