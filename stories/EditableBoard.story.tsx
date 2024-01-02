import { Meta, StoryObj, storiesOf } from "@storybook/react";
import React, { Component } from "react";
import debug from "./helpers/debug";

import Board from "../src";

import data from "./data/base.json";
import smallData from "./data/data-sort.json";

const disallowAddingCardData = { ...data };
disallowAddingCardData.lanes[0].title = "Disallowed adding card";
disallowAddingCardData.lanes[0].disallowAddingCard = true;
Board.displayName = "Board";

export default ({
	title: "Editable Board",
	component: Board,
} satisfies Meta<typeof Board>);
type Story = StoryObj<typeof Board>;
export const AddDeleteCards: Story = {
	name: "Add/Delete Cards",
	render: (args) => {
		const shouldReceiveNewData = (nextData) => {
			debug("Board has changed");
			debug(nextData);
		};

		const handleCardDelete = (cardId, laneId) => {
			debug(`Card: ${cardId} deleted from lane: ${laneId}`);
		};

		const handleCardAdd = (card, laneId) => {
			debug(`New card added to lane ${laneId}`);
			debug(card);
		};

		return (
			<Board
				data={data}
				draggable={true}
				id="EditableBoard1"
				onDataChange={shouldReceiveNewData}
				onCardDelete={handleCardDelete}
				onCardAdd={handleCardAdd}
				onCardClick={(cardId, metadata, laneId) =>
					alert(`Card with id:${cardId} clicked. Card in lane: ${laneId}`)
				}
				editable={true}
			/>
		);
	},
};

export const AddNewLane: Story = {
	name: "Add New Lane",
	render: (args) => {
		return (
			<Board
				data={smallData}
				editable={true}
				canAddLanes={true}
				onLaneAdd={(t) => debug(`You added a line with title ${t.title}`)}
			/>
		);
	},
};

export const DisallowAddingCardForSpecificLane: Story = {
	name: "Disallow Adding Card for specific Lane",
	render: (args) => {
		return <Board data={disallowAddingCardData} editable={true} />;
	},
};

export const InlineEditLaneTitleAndCards: Story = {
	render: (args) => {
		return (
			<Board
				data={smallData}
				editable={true}
				canAddLanes={true}
				editLaneTitle={true}
				onCardUpdate={(cardId, data) =>
					debug(`onCardUpdate: ${cardId} -> ${JSON.stringify(data, null, 2)}`)
				}
				onLaneUpdate={(laneId, data) =>
					debug(`onLaneUpdate: ${laneId} -> ${data.title}`)
				}
				onLaneAdd={(t) => debug(`You added a line with title ${t.title}`)}
			/>
		);
	},
};
