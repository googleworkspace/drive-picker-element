import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
	stories: [
		"**/*.mdx",
		"../src/**/*.mdx",
		"../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	addons: ["@storybook/addon-essentials"],
	framework: {
		name: "@storybook/web-components-vite",
		options: {},
	},
};
export default config;
