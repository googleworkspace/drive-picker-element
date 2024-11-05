import fs from "node:fs";
import { customElementsManifestToMarkdown } from "@custom-elements-manifest/to-markdown";
import prettier from "prettier";
import { remark } from "remark";
import remarkBehead from "remark-behead";
import remarkGfm from "remark-gfm";

const START = "<!-- START docs -->";
const END = "<!-- END docs -->";

const manifest = JSON.parse(fs.readFileSync("custom-elements.json", "utf-8"));
const markdown = customElementsManifestToMarkdown(manifest, {
	private: "hidden",
	omitDeclarations: ["mixins", "variables", "functions", "exports"],
	omitSections: ["super-class", "static-methods", "main-heading"],
});

function transpose(matrix) {
	return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}

// plugin to remove unused columns in table
function removeEmptyColumns() {
	/**
	 * @param {Root} tree
	 * @return {undefined}
	 */
	return (tree) => {
		// find table nodes
		for (const node of tree.children) {
			if (node.type === "table") {
				// find empty columns
				const cells = [];

				// iterate over rows, skipping the header
				node.children.slice(1).forEach((row, y) => {
					cells.push([]);
					row.children.forEach((cell, x) => {
						cells[y].push(
							cell.type === "tableCell" && cell.children.length === 0,
						);
					});
				});

				// transpose cells matrix
				const empytColumns = [];
				const transposed = transpose(cells);

				transposed.forEach((rows, x) => {
					if (rows.every((cell) => cell)) {
						empytColumns.push(x);
					}
				});

				// remove empty columns
				for (const row of node.children) {
					row.children = row.children.filter(
						(_, i) => !empytColumns.includes(i),
					);
				}
			}
		}
	};
}

// remark markdown
const processed = await remark()
	.use(remarkBehead, { depth: 1 })
	.use(remarkGfm)
	.use(removeEmptyColumns)
	.process(markdown);

// insert into README.md
const readme = fs.readFileSync("README.md", "utf-8");

const startIdx = readme.indexOf(START) + START.length;
const endIdx = readme.indexOf(END);

const updated = await prettier.format(
	`${readme.substring(0, startIdx)}\n${processed}\n${readme.substring(endIdx)}`,
	{ parser: "markdown" },
);

fs.writeFileSync("README.md", updated);
