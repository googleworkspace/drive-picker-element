export const setAttributes = (
	element: HTMLElement,
	attributes: { [key: string]: string | boolean | number },
) => {
	for (const [key, value] of Object.entries(attributes)) {
		if (key.startsWith("on")) {
			continue;
		}
		if (value !== undefined) {
			if (typeof value === "boolean") {
				if (value) element.setAttribute(key, "");
			} else if (typeof value === "string") {
				element.setAttribute(key, value.toString());
			}
		}
	}
};
