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

import type {
	Attribute,
	ClassField,
	ClassMember,
	ClassMethod,
} from "custom-elements-manifest/schema";
import type { TableCell } from "mdast";
import { fromMarkdown } from "mdast-util-from-markdown";
import { inlineCode, tableCell, text } from "./builder";

export type CELL<T = Attribute | ClassMember> = {
	heading: string;
	get: (x: T) => TableCell;
};

const formatParam = (param: { name?: string; type?: { text: string } }) =>
	`${param?.name}${param?.type?.text ? `: ${param.type.text}` : ""}`;

export const DEFAULT: CELL<Attribute> = {
	heading: "Default",
	get: (x) => tableCell(inlineCode(x.default ?? "")),
};
export const NAME: CELL = {
	heading: "Name",
	get: (x) => tableCell(inlineCode(x.name)),
};
export const SLOT_NAME: CELL = {
	...NAME,
	get: (x) => tableCell(x.name ? inlineCode(x.name) : text("default")),
};

export const ATTR_FIELD: CELL<Attribute> = {
	heading: "Field",
	get: (x) => tableCell(text(x.fieldName ?? "")),
};
export const INHERITANCE: CELL<Attribute | ClassMember> = {
	heading: "Inherited From",
	get: (x) => tableCell(text(x.inheritedFrom?.name ?? "")),
};

export const RETURN: CELL<ClassMethod> = {
	heading: "Return",
	get: (x) => tableCell(inlineCode(x.return?.type?.text ?? "")),
};
export const TYPE: CELL<ClassField | Attribute> = {
	heading: "Type",
	get: (x) => tableCell(inlineCode(x.type?.text ?? "")),
};

export const DESCRIPTION: CELL = {
	heading: "Description",
	get: (x) => {
		const description = x.description ?? "";
		const root = fromMarkdown(description);
		const node = root.children[0];

		if (node?.type === "paragraph") {
			return tableCell(...node.children);
		}

		return tableCell(text(description));
	},
};
