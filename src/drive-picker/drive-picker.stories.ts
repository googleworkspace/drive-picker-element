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

import { action } from "@storybook/addon-actions";
import { withActions } from "@storybook/addon-actions/decorator";
import type { Meta, StoryObj } from "@storybook/web-components";
import { type TemplateResult, html } from "lit";
import type { DrivePickerElementProps } from ".";
import "./drive-picker-element";
import { ifDefined } from "lit/directives/if-defined.js";

const drivePickerTemplate = (
	{ appId, clientId, oauthToken, visible }: DrivePickerElementProps,
	slot?: TemplateResult,
) =>
	html`<drive-picker
    ?visible=${visible}
    app-id=${appId}
    client-id=${clientId}
    oauth-token=${ifDefined(oauthToken)}
    @picked=${action("picked")}
    @cancel=${action("cancel")}
    >${slot}</drive-picker
  >`;

const meta: Meta<DrivePickerElementProps> = {
	title: "Drive Picker",
	tags: ["autodocs"],
	decorators: [withActions],
	parameters: {
		actions: { handles: ["picked", "cancel"] },
	},
	render: (props: DrivePickerElementProps) => drivePickerTemplate(props),
	argTypes: {
		appId: { control: "text" },
		clientId: { control: "text" },
		oauthToken: { control: "text" },
		visible: { control: "boolean" },
	},
	args: {
		visible: true,
	},
};

export default meta;
type Story = StoryObj<DrivePickerElementProps>;

export const Primary: Story = {
	args: {
		visible: true,
		clientId:
			"675807958095-nsptdcn5qdb6pl44cge1c6ghact9t5q0.apps.googleusercontent.com",
		developerKey: "AIzaSyAdqZwr-cdocUdGbt9l0zc5s58jnrGseOY",
		appId: "675807958095",
	},
};

export const DocsView: Story = {
	args: {
		visible: true,
		clientId:
			"675807958095-nsptdcn5qdb6pl44cge1c6ghact9t5q0.apps.googleusercontent.com",
		developerKey: "AIzaSyAdqZwr-cdocUdGbt9l0zc5s58jnrGseOY",
		appId: "675807958095",
	},
	render: (props: DrivePickerElementProps) =>
		drivePickerTemplate(
			props,
			html`<drive-picker-docs-view owned-by-me=""></drive-picker-docs-view>`,
		),
};
