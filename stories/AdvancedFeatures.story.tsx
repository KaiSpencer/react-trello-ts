import React, { Component } from "react";

import { Meta, StoryObj } from "@storybook/react";
import Board from "../src";

import data from "./data/base.json";
import debug from "./helpers/debug";
Board.displayName = "Board";

class AsyncBoard extends Component {
	state = {
		boardData: { lanes: [{ id: "loading", title: "loading..", cards: [] }] },
	};

	componentDidMount() {
		setTimeout(this.getBoard.bind(this), 1000);
	}

	getBoard() {
		this.setState({ boardData: data });
	}

	render() {
		return <Board data={this.state.boardData} />;
	}
}

const meta: Meta<typeof AsyncBoard> = {
	title: "Advanced Features",
	component: Board,
};

export default meta;
type Story = StoryObj<typeof Board>;

export const AsyncLoad: Story = {
	render(args) {
		return <AsyncBoard />;
	},
};

export const CollapsibleLanes: Story = {
	args: {
		data,
		draggable: true,
		collapsibleLanes: true,
		onDataChange: (nextData) => {
			debug("data has changed");
			debug(nextData);
		},
	},
};

/**
 * This story implements onCardClick and onLaneClick handlers.
 * These handlers are called when a card or lane is clicked.
 * Try clicking on a card or lane to see an alert.
 */
export const EventHandling: Story = {
	name: "Event Handling",
	args: {
		data,
		draggable: true,
		onCardClick: (cardId, metadata, laneId) =>
			alert(
				`Card with id:${cardId} clicked. Has metadata.id: ${metadata.id}. Card in lane: ${laneId}`,
			),
		onLaneClick: (laneId) => alert(`Lane with id:${laneId} clicked`),
	},
};
