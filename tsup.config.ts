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
