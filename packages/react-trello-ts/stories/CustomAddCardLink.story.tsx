import { storiesOf } from "@storybook/react";
import React from "react";

import { AddCardLinkComponent } from "rt/components/AddCardLink";
import Board from "../src";

const data = require("./data/collapsible.json");

const CustomAddCardLink: AddCardLinkComponent = ({ onClick, t }) => (
	<button onClick={onClick}>{t("Click to add card")}</button>
);

storiesOf("Custom Components", module).add("AddCardLink", () => {
	return (
		<Board
			data={data}
			editable={true}
			components={{ AddCardLink: CustomAddCardLink }}
		/>
	);
});
