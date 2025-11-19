[![npm](https://img.shields.io/npm/v/@googleworkspace/drive-picker-react)](https://www.npmjs.com/package/@googleworkspace/drive-picker-react)
[![Test](https://github.com/googleworkspace/drive-picker-element/actions/workflows/test.yml/badge.svg)](https://github.com/googleworkspace/drive-picker-element/actions/workflows/test.yml)
![Release](https://github.com/googleworkspace/drive-picker-element/workflows/Release/badge.svg)

## Description

This package provides a React wrapper for the [`@googleworkspace/drive-picker-element`](https://github.com/googleworkspace/drive-picker-element/tree/main/packages/drive-picker-element) web component.

It offers a seamless way to integrate the [Google Picker API](https://developers.google.com/drive/picker/guides/overview) into your React applications.

## Usage

To use the `DrivePicker` component in your project, import it and use it in your component. See the full [examples](https://github.com/googleworkspace/drive-picker-element/tree/main/examples) for more information

```tsx
import {
  DrivePicker,
  DrivePickerDocsView,
} from "@googleworkspace/drive-picker-react";

function App() {
  return (
    <DrivePicker
      clientId="YOUR_CLIENT_ID"
      appId="YOUR_APP_ID"
      onPicked={(e) => console.log("Picked:", e.detail)}
      onCanceled={() => console.log("Picker was canceled")}
    >
      <DrivePickerDocsView starred={true} />
    </DrivePicker>
  );
}
```

The underlying web component, `@googleworkspace/drive-picker-element`, must be imported for the components to work. The `@googleworkspace/drive-picker-react` package automatically handles this for you.

## Component Props

The `DrivePicker` and `DrivePickerDocsView` components accept props that correspond to the attributes of the underlying web components.

For a full list of available props, please refer to the documentation for the web components:

- [`<drive-picker>` attributes](https://github.com/googleworkspace/drive-picker-element/tree/main/packages/drive-picker-element#attributes)
- [`<drive-picker-docs-view>` attributes](https://github.com/googleworkspace/drive-picker-element/tree/main/packages/drive-picker-element#drive-picker-docs-view)

## Events

You can handle events by passing `on...` props to the `DrivePicker` component.

The available event handlers are:

- `onPicked`
- `onCanceled`
- `onOauthError`
- `onOauthResponse`

The event argument is a `CustomEvent` where the `detail` property contains the payload from the Google Picker API.

```tsx
<DrivePicker
  ...
  onPicked={(e) => {
    const data = e.detail;
    console.log(data.docs); // Array of picked documents
  }}
/>
```

For more details on the event payloads, see the [Event Details section of the `@googleworkspace/drive-picker-element` README](https://github.com/googleworkspace/drive-picker-element/tree/main/packages/drive-picker-element#event-details).

## Reference

This component is a wrapper. For detailed information about the underlying web component's attributes, events, and slots, please refer to the [`@googleworkspace/drive-picker-element` README](https://github.com/googleworkspace/drive-picker-element/tree/main/packages/drive-picker-element).
