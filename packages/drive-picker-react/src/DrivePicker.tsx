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

import type {
	DrivePickerElement,
	DrivePickerElementProps,
} from "@googleworkspace/drive-picker-element";
import type React from "react";
import { useEffect, useRef } from "react";
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

	useEffect(() => {
		import("@googleworkspace/drive-picker-element");
	}, []);

	return (
		<drive-picker ref={ref} {...rest}>
			{children}
		</drive-picker>
	);
};
