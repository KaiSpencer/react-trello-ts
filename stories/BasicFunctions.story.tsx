import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Board from "../src";

import data from "./data/base.json";
import dataSortedLane from "./data/data-sort.json";
Board.displayName = "Board";

const meta: Meta<typeof Board> = {
	title: "Basic Functions",
	parameters: {
		info: "A demonstration of onDragStart and onDragEnd hooks for card and lanes",
	},
	component: Board,
};
export default meta;
type Story = StoryObj<typeof Board>;

export const FullBoardExample: Story = {
	args: { data },
};

export const SortedLane: Story = {
	args: {
		data: dataSortedLane,
		laneSortFunction: (cardA, cardB) => {
			const dateA = new Date(cardA.metadata.completedAt);
			const dateB = new Date(cardB.metadata.completedAt);
			return dateA.getTime() - dateB.getTime();
		},
	},
};

export const ReverseSortedLane: Story = {
	args: {
		data: dataSortedLane,
		laneSortFunction(cardA, cardB) {
			const dateA = new Date(cardA.metadata.completedAt);
			const dateB = new Date(cardB.metadata.completedAt);
			return dateB.getTime() - dateA.getTime();
		},
	},
};

const PER_PAGE = 15;
function generateCards(requestedPage = 1) {
	const cards = [];
	const fetchedItems = (requestedPage - 1) * PER_PAGE;
	for (let i = fetchedItems + 1; i <= fetchedItems + PER_PAGE; i++) {
		cards.push({
			id: `${i}`,
			title: `Card${i}`,
			description: `Description for #${i}`,
		});
	}
	return cards;
}
function delayedPromise(durationInMs, resolutionPayload) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(resolutionPayload);
		}, durationInMs);
	});
}
function paginate(requestedPage, laneId) {
	// simulate no more cards after page 2
	if (requestedPage > 2) {
		return delayedPromise(2000, []);
	}
	const newCards = generateCards(requestedPage);
	return delayedPromise(2000, newCards);
}
export const BasicFunctions: Story = {
	args: {
		data: {
			lanes: [
				{
					id: "Lane1",
					title: "Lane1",
					cards: generateCards(),
				},
			],
		},
		laneSortFunction: (card1, card2) => parseInt(card1.id) - parseInt(card2.id),
		onLaneScroll: paginate,
	},
};

export const Tags: Story = {
	name: "Tags",
	args: {
		data: {
			lanes: [
				{
					id: "lane1",
					title: "Planned Tasks",
					cards: [
						{
							id: "Card1",
							title: "Card1",
							description: "foo card",
							metadata: { cardId: "Card1" },
							tags: [
								{ title: "High", color: "white", bgcolor: "#EB5A46" },
								{ title: "Tech Debt", color: "white", bgcolor: "#0079BF" },
								{
									title: "Very long tag that is",
									color: "white",
									bgcolor: "#61BD4F",
								},
								{ title: "One more", color: "white", bgcolor: "#61BD4F" },
							],
						},
						{
							id: "Card2",
							title: "Card2",
							description: "bar card",
							metadata: { cardId: "Card2" },
							tags: [{ title: "Low" }],
						},
					],
				},
			],
		},
		tagStyle: { fontSize: "80%" },
	},
};
