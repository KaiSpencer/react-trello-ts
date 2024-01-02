import { Meta } from "@storybook/react";
import React from "react";
import debug from "./helpers/debug";

import Board from "../src";

import data from "./data/collapsible.json";
Board.displayName = "Board";

export default ({
	title: "Advanced Features",
	component: () => {
		const shouldReceiveNewData = (nextData) => {
			debug("data has changed");
			debug(nextData);
		};

		return (
			<Board
				data={data}
				draggable={true}
				collapsibleLanes={true}
				onDataChange={shouldReceiveNewData}
			/>
		);
	},
} satisfies Meta<typeof Board>);

export const CollapsibleLanes = {};
