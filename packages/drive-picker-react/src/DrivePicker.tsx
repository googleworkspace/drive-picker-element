import type {
	DrivePickerElement,
	DrivePickerElementProps,
} from "@googleworkspace/drive-picker-element";
import type React from "react";
import { useRef } from "react";
import "@googleworkspace/drive-picker-element";
import type { DrivePickerDocsViewProps } from "./DrivePickerDocsView";
import {
	type DrivePickerEventHandlers,
	useDrivePickerEvents,
} from "./useDrivePickerEvents";

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"drive-picker": DrivePickerElementProps & {
				ref?: React.RefObject<DrivePickerElement | null>;
				children?:
					| React.ReactElement<DrivePickerDocsViewProps>
					| React.ReactElement<DrivePickerDocsViewProps>[];
			};
		}
	}
}

export interface DrivePickerProps
	extends DrivePickerElementProps,
		DrivePickerEventHandlers {
	/**
	 * The children of the component. This should be one or more `DrivePickerDocsView` components.
	 */
	children?:
		| React.ReactElement<DrivePickerDocsViewProps>
		| React.ReactElement<DrivePickerDocsViewProps>[];
}

/**
 * A React component that wraps the `drive-picker` web component.
 * This component provides a convenient way to declaratively build a [`google.picker.Picker`](https://developers.google.com/drive/picker/reference/picker).
 *
 * @example
 * ```tsx
 * <DrivePicker clientId="1234" appId="5678" onPicked={(e) => console.log(e.detail)}>
 *  <DrivePickerDocsView />
 * </DrivePicker>
 * ```
 */
export const DrivePicker: React.FC<DrivePickerProps> = (props) => {
	const {
		onPicked,
		onCanceled,
		onOauthError,
		onOauthResponse,
		children,
		...rest
	} = props;
	const ref = useRef<DrivePickerElement>(null);

	useDrivePickerEvents(ref, {
		onPicked,
		onCanceled,
		onOauthError,
		onOauthResponse,
	});

	return (
		<drive-picker ref={ref} {...rest}>
			{children}
		</drive-picker>
	);
};
