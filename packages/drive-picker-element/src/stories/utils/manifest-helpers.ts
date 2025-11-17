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

import type { StrictInputType } from "@storybook/csf";
import type {
	CustomElementDeclaration,
	Declaration,
	Event,
	Package,
} from "custom-elements-manifest/schema";
import manifest from "../../../custom-elements.json";

const pkg = manifest as Package;

function isCustomElementDeclaration(
	declaration?: Declaration,
): declaration is CustomElementDeclaration {
	return (declaration as CustomElementDeclaration)?.customElement === true;
}
export const manifestElements = Object.fromEntries(
	pkg.modules.flatMap((module) =>
		(module.declarations ?? [])
			.filter(isCustomElementDeclaration)
			.map((declaration) => [declaration.tagName, declaration]),
	),
) as { [key: string]: CustomElementDeclaration };

export const getElementEvents = (tagName: string): Event[] => {
	const declaration = manifestElements[tagName];
	return (declaration.events ?? []).filter((event) => event.name !== "type");
};

export const elementArgTypes: {
	[k: string]: { [k: string]: StrictInputType };
} = Object.fromEntries(
	Object.entries(manifestElements).map(([tagName, declaration]) => [
		tagName,
		Object.fromEntries([
			...(declaration.attributes ?? []).map((attr) => {
				const inputType: StrictInputType = {
					name: attr.name,
					description: attr.description,
					table: { type: { summary: attr.type?.text }, category: tagName },
					control: {},
				};

				switch (attr.type?.text) {
					case "boolean":
						inputType.control = { type: "boolean" };
						break;
					case "string":
						inputType.control = "text";
						break;
					case "number":
						inputType.control = "number";
						break;
					default:
						// check if string literal union such as "default"|"true"|"false"
						if (
							attr.type?.text.match(/"[a-zA-Z-0-9-_"]*"/) &&
							attr.type?.text.includes("|")
						) {
							inputType.control = "select";
							inputType.options = attr.type?.text.replace(/"/g, "").split("|");
						} else {
							throw new Error(`Unsupported type: ${attr.type?.text}`);
						}
				}

				if (
					tagName === "drive-picker" &&
					[
						"client-id",
						"scope",
						"hd",
						"prompt",
						"login-hint",
						"include-granted-scopes",
					].includes(attr.name) &&
					inputType.table
				) {
					inputType.table.category = "OAuth";
				}

				return [attr.name, inputType];
			}),
		]),
	]),
);
