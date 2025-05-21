/**
 * Copyright 2024 Google LLC
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

import {
	DrivePickerDocsViewElement,
	type DrivePickerDocsViewElementProps,
	DrivePickerElement,
	type DrivePickerElementProps,
	type OAuthErrorEvent,
	type OAuthResponseEvent,
	type PickerCanceledEvent,
	type PickerErrorEvent,
	type PickerPickedEvent,
} from "./drive-picker";

customElements.define("drive-picker", DrivePickerElement);
customElements.define("drive-picker-docs-view", DrivePickerDocsViewElement);

declare global {
	interface HTMLElementTagNameMap {
		"drive-picker": DrivePickerElement;
	}
	interface HTMLElementTagNameMap {
		"drive-picker-docs-view": DrivePickerDocsViewElement;
	}
}

export type {
	DrivePickerElement,
	DrivePickerDocsViewElement,
	DrivePickerElementProps,
	DrivePickerDocsViewElementProps,
	OAuthErrorEvent,
	OAuthResponseEvent,
	PickerCanceledEvent,
	PickerErrorEvent,
	PickerPickedEvent,
};
