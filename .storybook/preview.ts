import type { Preview } from "@storybook/web-components";
import Page from "./page.mdx";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		docs: {
			page: Page,
		},
	},
	tags: ["autodocs"],
};

export default preview;
