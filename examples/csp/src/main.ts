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

import "@googleworkspace/drive-picker-element";
import type {
	DrivePickerElement,
	PickerPickedEvent,
} from "@googleworkspace/drive-picker-element";

const picker = document.getElementById("picker") as DrivePickerElement;
const openButton = document.getElementById("open-picker") as HTMLButtonElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;

// Optional: Set credentials via JS if not in HTML
// picker.setAttribute('client-id', 'YOUR_CLIENT_ID');
// picker.setAttribute('app-id', 'YOUR_APP_ID');

openButton.addEventListener("click", () => {
	picker.visible = true;
});

picker.addEventListener("picker-picked", (e: Event) => {
	const event = e as PickerPickedEvent;
	console.log("Picked:", event.detail);
	resultDiv.innerHTML = "";
	const pre = document.createElement("pre");
	pre.textContent = JSON.stringify(event.detail, null, 2);
	resultDiv.appendChild(pre);
});

picker.addEventListener("picker-canceled", () => {
	console.log("Canceled");
	resultDiv.textContent = "Picker canceled";
});

picker.addEventListener("picker-oauth-error", (e) => {
	console.error("OAuth Error", e);
	resultDiv.textContent = `OAuth Error: ${JSON.stringify(e)}`;
});
