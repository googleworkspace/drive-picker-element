export class LazyPreviewElement<
	T extends HTMLElement = HTMLElement,
> extends HTMLElement {
	element: T | null = null;

	connectedCallback() {
		const style = document.createElement("style");
		style.textContent = `
lazy-preview {
	display: flex;
	justify-content: center;
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
	background-color: #4285f4;
}
		`;

		this.appendChild(style);

		const button = document.createElement("button");
		button.textContent = "Preview";
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
