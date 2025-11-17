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

import fs from "node:fs";
import type { ClassMethod } from "custom-elements-manifest";
import type {
	CustomElementDeclaration,
	Declaration,
	Package,
} from "custom-elements-manifest/schema";
import type { Root } from "mdast";
import { fromMarkdown } from "mdast-util-from-markdown";
import prettier from "prettier";
import { remark } from "remark";
import remarkBehead from "remark-behead";
import remarkGfm from "remark-gfm";
import remarkGithub from "remark-github";
import remarkToc from "remark-toc";
import type { Node } from "unist";
import {
	h1,
	h2,
	inlineCode,
	table,
	tableCell,
	tableRow,
	text,
} from "./lib/builder";
import * as CELLS from "./lib/cells";

const START = "<!-- START docs -->";
const END = "<!-- END docs -->";

const manifest = JSON.parse(
	fs.readFileSync("custom-elements.json", "utf-8"),
) as Package;

function isCustomElementDeclaration(
	declaration?: Declaration,
): declaration is CustomElementDeclaration {
	return (declaration as CustomElementDeclaration)?.customElement === true;
}

function makeTable<T>(
	title: string,
	cells: CELLS.CELL<T>[],
	rows: T[],
): Node[] {
	return [
		h2(text(title)),
		table(
			tableRow(...cells.map((header) => tableCell(text(header.heading)))),
			...rows.map((row) => tableRow(...cells.map((cell) => cell.get(row)))),
		),
	];
}

const customElements = manifest.modules
	.flatMap((module) => module.declarations)
	.filter(isCustomElementDeclaration)
	.sort((a, b) => a.tagName?.localeCompare(b.tagName ?? "") ?? 0);

const nodes: Node[] = [];

for (const element of customElements) {
	nodes.push(h1(inlineCode(`<${element.tagName}/>`)));

	nodes.push(fromMarkdown(element.description ?? ""));
	nodes.push(
		...makeTable(
			"Attributes",
			[CELLS.NAME, CELLS.TYPE, CELLS.DESCRIPTION],
			element.attributes ?? [],
		),
	);
	const events = (element.events ?? []).filter((e) => e.description);
	if (events.length > 0) {
		nodes.push(
			...makeTable(
				"Events",
				[CELLS.NAME, CELLS.TYPE, CELLS.DESCRIPTION],
				events,
			),
		);
	}
	const slots = (element.slots ?? []).filter((s) => s.description);

	if (slots.length > 0) {
		nodes.push(
			...makeTable("Slots", [CELLS.SLOT_NAME, CELLS.DESCRIPTION], slots),
		);
	}
	const publicMembers =
		element.members?.filter((member) => member.privacy === "public") ?? [];

	const methods: ClassMethod[] =
		publicMembers.filter(
			(member): member is ClassMethod => member.kind === "method",
		) ?? [];

	const properties: ClassMethod[] =
		publicMembers.filter(
			(member): member is ClassMethod => member.kind === "field",
		) ?? [];

	if (properties.length > 0) {
		nodes.push(
			...makeTable(
				"Properties",
				[CELLS.NAME, CELLS.TYPE, CELLS.DESCRIPTION],
				properties,
			),
		);
	}

	if (methods.length > 0) {
		nodes.push(
			...makeTable(
				"Methods",
				[CELLS.NAME, CELLS.DESCRIPTION, CELLS.RETURN],
				methods,
			),
		);
	}
}
const processor = remark().use(remarkGfm);

const docs = processor.stringify(
	(await processor.use(remarkBehead, { minDepth: 3 }).run({
		type: "root",
		children: nodes,
	} as Root)) as Root,
);

const readme = fs.readFileSync("README.md", "utf-8");
const startIdx = readme.indexOf(START) + START.length;
const endIdx = readme.indexOf(END);

let ast = remark()
	.use(remarkGfm)
	.parse(
		`${readme.substring(0, startIdx)}\n${docs}\n${readme.substring(endIdx)}`,
	);

ast = (await remark()
	.use(remarkToc, { heading: "Index", tight: true, maxDepth: 3 })
	.use(remarkGithub, {
		repository: "googleworkspace/drive-picker-element",
	})
	.run(ast)) as Root;

const markdown = remark()
	.use(remarkGfm)
	.stringify(ast as Root);

fs.writeFileSync(
	"README.md",
	await prettier.format(markdown, {
		parser: "markdown",
	}),
);
