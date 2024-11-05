![](./docs/logo.jpg)

[![npm](https://img.shields.io/npm/v/@googleworkspace/drive-picker-element)](https://www.npmjs.com/package/@googleworkspace/drive-picker-element)
[![Test](https://github.com/googleworkspace/drive-picker-element/actions/workflows/test.yml/badge.svg)](https://github.com/googleworkspace/drive-picker-element/actions/workflows/test.yml)
![Release](https://github.com/googleworkspace/drive-picker-element/workflows/Release/badge.svg)

## Description

The [Google Drive Picker] web components provides a convenient way to integrate the Google Picker API into your web applications. The Google Picker API is a JavaScript API that allows users to select or upload Google Drive files. This component acts as a "File Open" dialog for accessing and interacting with files stored on Google Drive.

Features:

- Provides a similar look-and-feel to the Google Drive UI.
- Offers several views showing previews and thumbnail images of Drive files.
- Displays as an inline, modal window, ensuring users never leave the main application.

Note: The Google Picker API does not support file organization, moving, or copying. For these operations, you should use either the Google Drive API or the Drive UI.

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
<drive-picker client-id="YOUR_CLIENT_ID" app-id="YOUR_APP_ID">
  <drive-picker-docs-view
    mime-types="application/json"
    label="JSON"
  ></drive-picker-docs-view>
  <drive-picker-docs-view owned-by-me="" label="Mine"></drive-picker-docs-view>
  <drive-picker-docs-view starred="" label="Starred"></drive-picker-docs-view>
</drive-picker>
```

See the components and the official reference documentation for more details:

| Status                                                                        | Component                                                     | Reference Docs                                                                                        |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| ✅                                                                            | [\<drive-picker/\>](#drive-picker)                            | [PickerBuilder API Reference](https://developers.google.com/drive/picker/reference#picker-builder)    |
| ✅                                                                            | [\<drive-picker-docs-view/\>](#drive-picker-docs-view)        | [DocsView API Reference](https://developers.google.com/drive/picker/reference#docs-view)              |
| ❌ - [ToDo](https://github.com/googleworkspace/drive-picker-element/issues/4) | [\<drive-picker-docs-upload-view/\>](#drive-picker-docs-view) | [DocsUploadView API Reference](https://developers.google.com/drive/picker/reference#docs-upload-view) |

> Note: If you wish to register the component with a different name, `import { DrivePickerElement, DrivePickerDocsViewElement } from @googleworkspace/drive-picker-element/drive-picker` and call `customElements.define()` manually.

To report issues or feature requests for the underlying Drive Picker, please use the [issue tracker](https://developers.google.com/drive/picker/support#developer_product_feedback).

## Documentation

For fields, attributes, and events, see the [Google Drive Picker Reference] documentation.

<!-- START docs -->

### class: `DrivePickerDocsViewElement`, `drive-picker-docs-view`

#### Fields

| Name   | Privacy | Type                     | Description                                                              |
| ------ | ------- | ------------------------ | ------------------------------------------------------------------------ |
| `view` | public  | `google.picker.DocsView` | Gets the Google Drive Picker view based on the current attribute values. |

#### Attributes

| Name                    |
| ----------------------- |
| `enable-drives`         |
| `include-folders`       |
| `mime-types`            |
| `mode`                  |
| `owned-by-me`           |
| `parent`                |
| `query`                 |
| `select-folder-enabled` |
| `starred`               |
| `view-id`               |

<hr/>

### class: `DrivePickerElement`, `drive-picker`

#### Fields

| Name       | Privacy   | Type                                | Description                                                                                  |
| ---------- | --------- | ----------------------------------- | -------------------------------------------------------------------------------------------- |
| `picker`   | protected | `google.picker.Picker \| undefined` |                                                                                              |
| `observer` | protected | `MutationObserver \| undefined`     |                                                                                              |
| `google`   | protected | `typeof google \| undefined`        |                                                                                              |
| `loading`  | protected | `Promise<void> \| undefined`        |                                                                                              |
| `visible`  | public    | `boolean`                           |                                                                                              |
| `views`    | protected | `(View \| google.picker.ViewId)[]`  | The \`google.Picker.View\` objects to display in the picker as defined by the slot elements. |

#### Events

| Name     | Type                                  | Description                                        |
| -------- | ------------------------------------- | -------------------------------------------------- |
| `type`   | `CustomEvent`                         |                                                    |
| `cancel` | `CustomEvent<DrivePickerEventDetail>` | Triggered when the user cancels the picker dialog. |
| `picked` | `CustomEvent<DrivePickerEventDetail>` | Triggered when the user picks one or more items.   |
| `loaded` | `CustomEvent<DrivePickerEventDetail>` | Triggered when the picker is loaded.               |

#### Attributes

| Name             |
| ---------------- |
| `app-id`         |
| `client-id`      |
| `developer-key`  |
| `hide-title-bar` |
| `locale`         |
| `max-items`      |
| `mine-only`      |
| `multiselect`    |
| `nav-hidden`     |
| `oauth-token`    |
| `origin`         |
| `relay-url`      |
| `scope`          |
| `title`          |
| `visible`        |

#### Slots

| Description                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The default slot contains View elements to display in the picker. Each View element should implement a property \`view\` of type \`google.picker.View\`. |

<hr/>

<!-- END docs -->

## Development

```sh
pnpm install
pnpm build
pnpm serve
pnpm storybook
```

[Google Drive Picker]: https://developers.google.com/drive/picker/guides/overview
[Google Drive Picker Reference]: https://developers.google.com/drive/picker/reference/picker
