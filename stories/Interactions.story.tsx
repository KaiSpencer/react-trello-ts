import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Board from "../src";
Board.displayName = "Board";

const data = {
	lanes: [
		{
			id: "lane1",
			title: "Planned Tasks",
			cards: [
				{
					id: "Card1",
					title: "Card1",
					description: "foo card",
					metadata: { id: "Card1" },
				},
				{
					id: "Card2",
					title: "Card2",
					description: "bar card",
					metadata: { id: "Card2" },
				},
			],
		},
		{
			id: "lane2",
			title: "Executing",
			cards: [
				{
					id: "Card3",
					title: "Card3",
					description: "foobar card",
					metadata: { id: "Card3" },
				},
			],
		},
	],
};

export default ({
	title: "Advanced Features",
	component: Board,
} satisfies Meta<typeof Board>);

type Story = StoryObj<typeof Board>;
export const EventHandling: Story = {
	name: "Event Handling",
	render: (args) => {
		return (
			<Board
				draggable={true}
				data={data}
				onCardClick={(cardId, metadata, laneId) =>
					alert(
						`Card with id:${cardId} clicked. Has metadata.id: ${metadata.id}. Card in lane: ${laneId}`,
					)
				}
				onLaneClick={(laneId) => alert(`Lane with id:${laneId} clicked`)}
			/>
		);
	},
};
