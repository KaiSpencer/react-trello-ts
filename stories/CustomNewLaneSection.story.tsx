import React from "react";

import Board from "../src";

import data from "./data/data-sort.json";
Board.displayName = "Board";

const NewLaneSectionComponent = ({ t, onClick }) => (
	<button onClick={onClick}>{t("Add another lane")}</button>
);

export default {
	title: "Custom Components",
	component: () => (
		<Board
			editable={true}
			canAddLanes={true}
			components={{ NewLaneSection: NewLaneSectionComponent }}
			data={data}
		/>
	),
};

export const NewLaneSection = {};
