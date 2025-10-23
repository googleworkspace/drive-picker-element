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

import browserslistToEsbuild from "browserslist-to-esbuild";
import { type Options, defineConfig } from "tsup";

const defaultOptions: Options = {
	sourcemap: true,
	splitting: false,
	dts: true,
	outDir: "dist",
	outExtension,
};

export default defineConfig((overrideOptions) => [
	...andMinifiedVersion({
		...defaultOptions,
		entry: ["src/index.ts"],
		format: ["iife"],
		dts: false,
		target: browserslistToEsbuild([
			"supports custom-elementsv1 and defaults",
			// biome-ignore lint/suspicious/noExplicitAny: type not exported by tsup
		]) as any,
		...overrideOptions,
	}),
	{
		...defaultOptions,
		entry: ["src/index.ts"],
		format: ["esm"],
		target: "es6",
		...overrideOptions,
	},
	{
		...overrideOptions,
		...defaultOptions,
		entry: ["src/drive-picker/index.ts"],
		format: ["esm"],
		outDir: "dist/drive-picker",
		splitting: true,
		treeshake: false,
		...overrideOptions,
	},
]);

function outExtension({ format, options }) {
	let js = "";

	if (format !== "esm") {
		js += `.${format}`;
	}

	if (options.minify) {
		js += ".min";
	}

	js += ".js";

	return { js };
}

function andMinifiedVersion(options: Options): [Options, Options] {
	return [
		{
			...options,
			minify: !options.watch,
			dts: false,
			metafile: true,
		},
		{
			...options,
		},
	];
}
