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

import type { Meta, StoryObj } from "@storybook/web-components";
import type { LazyPreviewElement } from "./utils/lazy-preview-element";
import { elementArgTypes, getElementEvents } from "./utils/manifest-helpers";

import { setAttributes } from "./utils/attribute-helpers";
import { APP_ID, CLIENT_ID, META_PARAMETERS } from "./utils/common";

import "./utils/lazy-preview-element";
import "..";

const elementEventNames = getElementEvents("drive-picker").map(
	(event) => event.name,
);

const searchParams = new URL(location.href).searchParams;
const argsAllowedFromParams = [
	...Object.keys(elementArgTypes["drive-picker"]),
	...Object.keys(elementArgTypes["drive-picker-docs-view"]),
];
const searchParamsArgs = JSON.parse(searchParams.get("args") || "{}");
const argValuesFromParams = Object.fromEntries(
	argsAllowedFromParams
		.map((arg) => [arg, searchParamsArgs[arg] || undefined])
		.filter(([, value]) => value !== undefined),
);

const postHeightToParent = () => {
	let height = document.body.getBoundingClientRect().height;

	const pickerDialog = document.querySelector("div.picker-dialog");

	if (pickerDialog) {
		const pickerDialogHeight = pickerDialog.getBoundingClientRect().height;
		if (pickerDialogHeight > 0) {
			height = Math.min(523, pickerDialogHeight);
		}
	}

	const data = {
		type: "resizeMessage",
		height,
	};
	parent.postMessage(data, "*");
};

const resizeObserver = new ResizeObserver(() => {
	postHeightToParent();
});

window.addEventListener("DOMContentLoaded", () => {
	resizeObserver.observe(document.body);
	const observedElements = new Set<Element>();

	setInterval(() => {
		const pickerDialog = document.querySelector("div.picker-dialog");
		if (pickerDialog && !observedElements.has(pickerDialog)) {
			resizeObserver.observe(pickerDialog);
		}
	}, 50);

	for (const a of document.querySelectorAll("a")) {
		if (a.href.startsWith("https://")) {
			a.target = "_blank";
		}
	}
});

const meta: Meta = {
	component: "drive-picker",
	argTypes: {
		...elementArgTypes["drive-picker"],
		...elementArgTypes["drive-picker-docs-view"],
	},
	args: {
		prompt: "",
		...argValuesFromParams,
		"app-id": APP_ID,
		"client-id": CLIENT_ID,
	},
	parameters: META_PARAMETERS,
	tags: ["autodocs"],
};

export default meta;

const render = ({ ...args }) => {
	const drivePicker = document.createElement("drive-picker");
	const drivePickerDocsView = document.createElement("drive-picker-docs-view");

	setAttributes(
		drivePicker,
		Object.fromEntries(
			Object.entries(args).filter(
				([key]) => elementArgTypes["drive-picker"][key],
			),
		),
	);

	setAttributes(
		drivePickerDocsView,
		Object.fromEntries(
			Object.entries(args).filter(
				([key]) => elementArgTypes["drive-picker-docs-view"][key],
			),
		),
	);

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

type Story = StoryObj;

export const Default: Story = {
	render,
	args: {},
};
