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

| Property  | Type      |
| --------- | --------- |
| `visible` | `boolean` |

### Methods

| Method                | Type                                                                                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `addEventListener`    | `(type: "cancel" \| "picked" \| "loaded", listener: (ev: DrivePickerEvent): void, options?: boolean \| AddEventListenerOptions \| undefined) => void` |
| `removeEventListener` | `(type: "cancel" \| "picked" \| "loaded", listener: (ev: DrivePickerEvent): void, options?: boolean \| EventListenerOptions \| undefined) => void`    |

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

| Property | Modifiers | Type       | Description                                                             |
| -------- | --------- | ---------- | ----------------------------------------------------------------------- |
| `view`   | readonly  | `DocsView` | Gets the Google Drive Picker view based on the current property values. |

<!-- END docs -->

## Development

```sh
pnpm install
pnpm build
pnpm serve
pnpm storybook
```

[Google Drive Picker]: https://developers.google.com/drive/picker/guides/overview
