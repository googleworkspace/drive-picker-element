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
import prettier from "prettier";
import ts, { factory } from "typescript";

import type {
	CustomElementDeclaration,
	Declaration,
	Package,
} from "custom-elements-manifest/schema";

const manifest = JSON.parse(
	fs.readFileSync("custom-elements.json", "utf-8"),
) as Package;

function isCustomElementDeclaration(
	declaration?: Declaration,
): declaration is CustomElementDeclaration {
	return (declaration as CustomElementDeclaration)?.customElement === true;
}

const customElements = manifest.modules
	.flatMap((module) => module.declarations)
	.filter(isCustomElementDeclaration)
	.sort((a, b) => a.tagName?.localeCompare(b.tagName ?? "") ?? 0);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const resultFile = ts.createSourceFile(
	"props.ts",
	"",
	ts.ScriptTarget.Latest,
	false,
	ts.ScriptKind.TS,
);

const statements: ts.Statement[] = [];

for (const element of customElements) {
	const properties: ts.PropertySignature[] = [];

	for (const attribute of element.attributes ?? []) {
		// Create the property signature
		const prop = factory.createPropertySignature(
			undefined, // No modifiers
			attribute.name.includes("-")
				? factory.createStringLiteral(`${attribute.name}`)
				: factory.createIdentifier(attribute.name),
			factory.createToken(ts.SyntaxKind.QuestionToken), // Make props optional
			factory.createTypeReferenceNode(
				attribute.type?.text ?? "unknown",
				undefined,
			),
		);

		if (attribute.description) {
			const jsDocText = `* ${attribute.description.replace(/\n/g, "\n * ")}`;
			ts.addSyntheticLeadingComment(
				prop,
				ts.SyntaxKind.MultiLineCommentTrivia,
				jsDocText,
				true,
			);
		}

		properties.push(prop);
	}

	const propsInterface = factory.createInterfaceDeclaration(
		[factory.createModifier(ts.SyntaxKind.ExportKeyword)],
		factory.createIdentifier(`${element.name}Props`),
		undefined,
		undefined,
		properties,
	);

	statements.push(propsInterface);
}

const outputFile = "src/drive-picker/props.ts";
const resultText = await prettier.format(
	printer.printList(
		ts.ListFormat.MultiLine,
		factory.createNodeArray(statements),
		resultFile,
	),
	{
		parser: "typescript",
		useTabs: true,
	},
);

const licenseHeader = `/**
 * Copyright 2025 Google LLC
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
 */`;

fs.writeFileSync(outputFile, `${licenseHeader}\n\n${resultText}`, "utf8");
console.log(`Generated React JSX definitions at ${outputFile}`);
