"use client";

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
