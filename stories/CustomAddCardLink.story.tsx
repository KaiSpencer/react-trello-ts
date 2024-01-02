import { Meta } from "@storybook/react";
import React from "react";

import Board from "../src";
import { AddCardLinkComponent } from "../src/components/AddCardLink";

import data from "./data/collapsible.json";
Board.displayName = "Board";

export default ({
	title: "Custom Components",
	component: () => {
		const CustomAddCardLink: AddCardLinkComponent = ({ onClick, t }) => (
			<button onClick={onClick}>{t("Click to add card")}</button>
		);
		return (
			<Board
				data={data}
				editable={true}
				components={{ AddCardLink: CustomAddCardLink }}
			/>
		);
	},
} satisfies Meta<typeof Board>);

export const AddCardLink = {};
