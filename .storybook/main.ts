import type { StorybookConfig } from "@storybook/react-vite";

export default ({
	addons: ["@storybook/addon-essentials", "@chromatic-com/storybook"],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	stories: ["../stories/**/*.story.@(js|tsx|mdx)"],
	core: {},
	docs: {},
	typescript: {
		reactDocgen: "react-docgen-typescript",
	},
} satisfies StorybookConfig);
