import { storiesOf } from "@storybook/react";
import React from "react";

import Board from "../src";

const data = require("./data/data-sort.json");

const NewLaneSection = ({ t, onClick }) => (
	<button onClick={onClick}>{t("Add another lane")}</button>
);

storiesOf("Custom Components", module).add(
	"NewLaneSection",
	() => (
		<Board
			editable={true}
			canAddLanes={true}
			components={{ NewLaneSection: NewLaneSection }}
			data={data}
		/>
	),
	{},
);
