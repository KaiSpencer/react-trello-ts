import React, { Component } from "react";

import { Meta, StoryObj } from "@storybook/react";
import Board from "../src";

import data from "./data/base.json";
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
	component: AsyncBoard,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AsyncBoard>;

export const AsyncLoad: Story = {};
