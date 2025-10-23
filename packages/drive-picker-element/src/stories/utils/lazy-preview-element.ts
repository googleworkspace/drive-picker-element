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

export class LazyPreviewElement<
	T extends HTMLElement = HTMLElement,
> extends HTMLElement {
	element: T | null = null;

	connectedCallback() {
		const style = document.createElement("style");
		style.textContent = `
lazy-preview {
    height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

lazy-preview button {
	padding: 8px 16px;
	border-radius: 4px;
	border: none;
	background-color: #1a73e8;
	color: white;
	cursor: pointer;
}

lazy-preview button:hover {
	background-color: #1765cc;
}
		`;

		this.appendChild(style);

		const button = document.createElement("button");
		button.textContent = "Open Drive Picker";
		this.appendChild(button);

		button.addEventListener("click", () => {
			this.preview();
		});
	}

	preview() {
		this.querySelector("drive-picker")?.remove();
		if (!this.element) {
			throw new Error("drive-picker not found");
		}
		this.appendChild(this.element);
	}
}

customElements.define("lazy-preview", LazyPreviewElement);

declare global {
	interface HTMLElementTagNameMap {
		"lazy-preview": LazyPreviewElement;
	}
}
