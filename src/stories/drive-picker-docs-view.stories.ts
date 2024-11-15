import type { Meta, StoryObj } from "@storybook/web-components";
import type { DrivePickerDocsViewElementProps } from "..";
import type { LazyPreviewElement } from "./utils/lazy-preview-element";
import { elementArgTypes, getElementEvents } from "./utils/manifest-helpers";

import { setAttributes } from "./utils/attribute-helpers";
import { APP_ID, CLIENT_ID, META_PARAMETERS } from "./utils/common";

import "./utils/lazy-preview-element";
import "..";

const argTypes = elementArgTypes["drive-picker-docs-view"];
type Args = Required<DrivePickerDocsViewElementProps>;

const elementEventNames = getElementEvents("drive-picker").map(
	(event) => event.name,
);

const meta: Meta = {
	component: "drive-picker",
	argTypes,
	args: {},
	parameters: META_PARAMETERS,
	tags: ["autodocs"],
};

export default meta;

const render = ({ ...args }) => {
	const drivePicker = document.createElement("drive-picker");
	drivePicker.setAttribute("app-id", APP_ID);
	drivePicker.setAttribute("client-id", CLIENT_ID);

	const drivePickerDocsView = document.createElement("drive-picker-docs-view");
	setAttributes(drivePickerDocsView, args);
	drivePicker.appendChild(drivePickerDocsView);

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
