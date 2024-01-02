import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Board from "../src";
import type { LaneFooterComponent } from "../src/components/Lane/LaneFooter";

import data from "./data/collapsible.json";
Board.displayName = "Board";

const LaneFooterComponent: LaneFooterComponent = ({
	onClick,
	onKeyDown,
	collapsed,
}) => (
	<div onClick={onClick} onKeyDown={onKeyDown}>
		{collapsed ? "click to expand" : "click to collapse"}
	</div>
);

export default ({
	title: "Custom Components",
	component: Board,
} satisfies Meta<typeof Board>);
type Story = StoryObj<typeof Board>;
export const LaneFooter: Story = {
	render: (args) => {
		return (
			<Board
				collapsibleLanes={true}
				components={{ LaneFooter: LaneFooterComponent }}
				data={data}
			/>
		);
	},
};
