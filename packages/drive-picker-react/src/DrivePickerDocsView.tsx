import type { DrivePickerDocsViewElementProps } from "@googleworkspace/drive-picker-element";
import type React from "react";

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"drive-picker-docs-view": DrivePickerDocsViewElementProps;
		}
	}
}

export type DrivePickerDocsViewProps = DrivePickerDocsViewElementProps;

/**
 * A React component that wraps the `drive-picker-docs-view` web component.
 * This component is used to define a [`google.picker.DocsView`](https://developers.google.com/drive/picker/reference/picker.docsview).
 *
 * @example
 * ```tsx
 * <DrivePicker clientId="1234" appId="5678">
 *   <DrivePickerDocsView ownedByMe={true} />
 * </DrivePicker>
 * ```
 *
 * @see https://developers.google.com/drive/picker/reference/picker.docsview
 */
export const DrivePickerDocsView: React.FC<DrivePickerDocsViewProps> = (
	props,
) => {
	return <drive-picker-docs-view {...props} />;
};
