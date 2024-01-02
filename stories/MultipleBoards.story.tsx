import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Board from "../src";

Board.displayName = "Board";

import data1 from "./data/base.json";
import data2 from "./data/other-board.json";

const containerStyles = {
	height: 500,
	padding: 20,
};

export default ({
	title: "Multiple Boards",
	tags: ["autodocs"],
	component: Board,
} satisfies Meta<typeof Board>);
type Story = StoryObj<typeof Board>;
export const MultipleBoards: Story = {
	render: (args) => {
		return (
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div style={containerStyles}>
					<Board id="board1" data={data1} draggable={true} />
				</div>
				<div style={containerStyles}>
					<Board id="board2" data={data2} draggable={true} />
				</div>
			</div>
		);
	},
};
