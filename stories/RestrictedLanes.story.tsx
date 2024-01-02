import { Meta, StoryObj, storiesOf } from "@storybook/react";
import React from "react";

import Board from "../src";

import data from "./data/drag-drop.json";
Board.displayName = "Board";

export default ({
	title: "Drag-n-Drop",
	component: Board,
	parameters: {
		info: "A demonstration of onDragStart and onDragEnd hooks for card and lanes",
	},
} satisfies Meta<typeof Board>);

type Story = StoryObj<typeof Board>;

export const RestrictLanes: Story = {
	name: "Restrict lanes",
	render: (args) => {
		return <Board data={data} draggable={true} />;
	},
};

export const DragCardsNotLanes: Story = {
	name: "Drag Cards not Lanes",
	render: (args) => {
		return <Board data={data} draggable={true} laneDraggable={false} />;
	},
};
