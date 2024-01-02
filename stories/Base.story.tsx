import { Meta } from "@storybook/react";
import React from "react";
import Board from "../src";

import data from "./data/base.json";
Board.displayName = "Board";

const meta: Meta<typeof Board> = {
	title: "Basic Functions",
	component: Board,
};
export default meta;

export const FullBoardExample = () => <Board data={data} />;
