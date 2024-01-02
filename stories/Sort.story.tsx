import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Board from "../src";

import data from "./data/data-sort.json";
Board.displayName = "Board";

export default ({
	title: "Basic Functions",
	component: Board,
} satisfies Meta<typeof Board>);

type Story = StoryObj<typeof Board>;

export const SortedLane: Story = {
	name: "Sorted Lane",
	render: (args) => {
		return (
			<Board
				data={data}
				laneSortFunction={(card1, card2) =>
					new Date(card1.metadata.completedAt).getTime() -
					new Date(card2.metadata.completedAt).getTime()
				}
			/>
		);
	},
};

export const ReverseSortedLane: Story = {
	name: "Reverse Sorted Lane",
	render: (args) => {
		return (
			<Board
				data={data}
				laneSortFunction={(card1, card2) => {
					console.log("card1", card1);

					return (
						new Date(card2.metadata.completedAt).getTime() -
						new Date(card1.metadata.completedAt).getTime()
					);
				}}
			/>
		);
	},
};
