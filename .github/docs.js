import fs from "node:fs";
import { customElementsManifestToMarkdown } from "@custom-elements-manifest/to-markdown";
import prettier from "prettier";

const START = "<!-- START docs -->";
const END = "<!-- END docs -->";

const manifest = JSON.parse(
	fs.readFileSync("dist/custom-elements.json", "utf-8"),
);
const markdown = customElementsManifestToMarkdown(manifest, {
	private: "hidden",
	omitDeclarations: ["mixins", "variables", "functions", "exports"],
	omitSections: ["super-class", "static-methods", "main-heading"],
});

console.log(markdown);
// fs.writeFileSync("./custom-elements.md", markdown);

// // read docs files
// const docs = ["docs/drive-picker.md", "docs/drive-picker-docs-view.md"]
//   .map((file) => {
//     const anchor = file.split("/").pop().replace(/\.md$/, "");
//     return `<a name="${anchor}"></a>\n${fs.readFileSync(file, "utf-8")}`;
//   })
//   .join("\n")
//   .replace(/^(#+)/gm, (_, p1) => `${p1}#`)
//   .trim();

// // insert into README.md
// const readme = fs.readFileSync("README.md", "utf-8");

// const startIdx = readme.indexOf(START) + START.length;
// const endIdx = readme.indexOf(END);

// const updated = await prettier.format(
//   `${readme.substring(0, startIdx)}\n${docs}\n${readme.substring(endIdx)}`,
//   { parser: "markdown" }
// );

// fs.writeFileSync("README.md", updated);
