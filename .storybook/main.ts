import type { StorybookConfig } from "@storybook/react-vite";

export default ({
	addons: ["@storybook/addon-essentials"],
	framework: "@storybook/react-vite",
	stories: ["../stories/**/*.story.@(js|tsx|mdx)"],

	core: {
		builder: "@storybook/builder-vite",
	},
	docs: { autodocs: true },
} satisfies StorybookConfig);
