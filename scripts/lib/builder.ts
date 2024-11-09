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
	Heading,
	Html,
	InlineCode,
	Paragraph,
	PhrasingContent,
	Text,
} from "mdast";
import type { Table, TableCell, TableRow } from "mdast";
import { fromMarkdown } from "mdast-util-from-markdown";

export const inlineCode = (value: string): InlineCode => ({
	type: "inlineCode",
	value,
});

export const text = (value: string): Text => ({
	type: "text",
	value,
});

export const table = (...children: TableRow[]): Table => ({
	type: "table",
	children,
});

export const tableRow = (...children: TableCell[]): TableRow => ({
	type: "tableRow",
	children,
});

export const tableCell = (...children: PhrasingContent[]): TableCell => ({
	type: "tableCell",
	children,
});

export const paragraph = (...children: PhrasingContent[]): Paragraph => ({
	type: "paragraph",
	children,
});

const heading = (
	depth: 1 | 2 | 3 | 4 | 5 | 6,
	...children: PhrasingContent[]
): Heading => ({
	type: "heading",
	depth,
	children,
});

export const h1 = (...children: PhrasingContent[]): Heading =>
	heading(1, ...children);
export const h2 = (...children: PhrasingContent[]): Heading =>
	heading(2, ...children);
export const h3 = (...children: PhrasingContent[]): Heading =>
	heading(3, ...children);
export const h4 = (...children: PhrasingContent[]): Heading =>
	heading(4, ...children);
export const h5 = (...children: PhrasingContent[]): Heading =>
	heading(5, ...children);
export const h6 = (...children: PhrasingContent[]): Heading =>
	heading(6, ...children);

export const html = (value: string): Html => ({
	type: "html",
	value,
});
