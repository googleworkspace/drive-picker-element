import type { Meta, StoryObj } from "@storybook/web-components";
import type { DrivePickerElementProps } from "..";
import type { LazyPreviewElement } from "./utils/lazy-preview-element";
import { elementArgTypes, getElementEvents } from "./utils/manifest-helpers";

import { setAttributes } from "./utils/attribute-helpers";
import { APP_ID, CLIENT_ID, META_PARAMETERS } from "./utils/common";

import "./utils/lazy-preview-element";
import "..";

const argTypes = elementArgTypes["drive-picker"];
type Args = Required<DrivePickerElementProps>;

const elementEventNames = getElementEvents("drive-picker").map(
	(event) => event.name,
);

const meta: Meta = {
	component: "drive-picker",
	argTypes,
	args: {
		"app-id": APP_ID,
		"client-id": CLIENT_ID,
	},
	parameters: META_PARAMETERS,
	tags: ["autodocs"],
};

export default meta;

const render = ({ ...args }) => {
	const drivePicker = document.createElement("drive-picker");

	setAttributes(drivePicker, args);

	for (const eventName of elementEventNames) {
		drivePicker.addEventListener(eventName, (e) => {
			console.log(e);
		});
	}

	const lazyPreviewElement = document.createElement(
		"lazy-preview",
	) as LazyPreviewElement;

	lazyPreviewElement.element = drivePicker;

	// Use a template to show the drive-picker element only when the user clicks the preview button
	const template = document.createElement("template");
	template.innerHTML = drivePicker.outerHTML;
	lazyPreviewElement.appendChild(template);

	return lazyPreviewElement;
};

type Story = StoryObj<Args>;

export const Default: Story = {
	render,
	args: {},
};

export const ExplicitScope: Story = {
	name: "With explicit scope",
	render,
	args: {
		scope:
			"https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.file",
	},
};
