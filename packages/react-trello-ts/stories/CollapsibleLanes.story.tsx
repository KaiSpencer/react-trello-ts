import { storiesOf } from "@storybook/react";
import React from "react";
import debug from "./helpers/debug";

import Board from "../src";

const data = require("./data/collapsible.json");

storiesOf("Advanced Features", module).add(
	"Collapsible Lanes",
	() => {
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
	{ info: "Collapse lanes when double clicking on the lanes" },
);
