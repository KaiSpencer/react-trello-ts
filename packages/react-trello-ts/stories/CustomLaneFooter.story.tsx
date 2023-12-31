import { storiesOf } from "@storybook/react";
import React from "react";

import { LaneFooterComponent } from "rt/components/Lane/LaneFooter";
import Board from "../src";

import data from "./data/collapsible.json";

const LaneFooter: LaneFooterComponent = ({ onClick, onKeyDown, collapsed }) => (
	<div onClick={onClick} onKeyDown={onKeyDown}>
		{collapsed ? "click to expand" : "click to collapse"}
	</div>
);

storiesOf("Custom Components", module).add("LaneFooter", () => (
	<Board
		collapsibleLanes={true}
		components={{ LaneFooter: LaneFooter }}
		data={data}
	/>
));
