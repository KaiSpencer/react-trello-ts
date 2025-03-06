import { Meta } from "@storybook/react";
import React from "react";

import { MovableCardWrapper } from "../src/styles/Base";
import debug from "./helpers/debug";

import Board from "../src";
import { BoardData } from "../src/types/Board";
Board.displayName = "Board";

const CustomCard = (props) => {
	return (
		<MovableCardWrapper
			data-id={props.id}
			onClick={props.onClick}
			className={props.className}
			style={{ backgroundColor: props.cardColor, padding: 6, ...props.style }}
		>
			<header
				style={{
					borderBottom: "1px solid #eee",
					paddingBottom: 6,
					marginBottom: 10,
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<div style={{ fontSize: 14, fontWeight: "bold" }}>{props.name}</div>
			</header>
			<div style={{ fontSize: 12, color: "#BD3B36" }}>
				<div style={{ color: "#4C4C4C", fontWeight: "bold" }}>
					{props.subTitle}
				</div>
				<div style={{ padding: "5px 0px" }}>
					<i>{props.body}</i>
				</div>
			</div>
		</MovableCardWrapper>
	);
};

const customCardData = {
	lanes: [
		{
			id: "lane1",
			title: "Planned",
			cards: [
				{
					id: "Card1",
					name: "John Smith",
					subTitle: "SMS received at 12:13pm today",
					body: "Thanks. Please schedule me for an estimate on Monday.",
					metadata: { id: "Card1" },
				},
				{
					id: "Card2",
					name: "Card Weathers",
					subTitle: "Email received at 1:14pm",
					body: "Is the estimate free, and can someone call me soon?",
					metadata: { id: "Card1" },
				},
			],
		},
		{
			id: "lane2",
			title: "Work In Progress",
			cards: [
				{
					id: "Card3",
					name: "Michael Caine",
					subTitle: "Email received at 4:23pm today",
					body: "You are welcome. Interested in doing business with you again",
					metadata: { id: "Card1" },
				},
			],
		},
	],
};

const BoardWithCustomCard = () => {
	const [boardData, setBoardData] = React.useState<BoardData>(customCardData);
	const onDragEnd = (cardId, sourceLandId, targetLaneId, index, card) => {
		debug("Calling onDragEnd");

		// Create updated card without immer
		const updatedCard = {
			...card,
			cardColor: "#d0fdd2",
		};

		// Create updated board without immer
		const updatedBoard = {
			...boardData,
			lanes: boardData.lanes.map((lane) => {
				// Source lane - remove the card
				if (lane.id === sourceLandId) {
					return {
						...lane,
						cards: lane.cards?.filter((c) => c.id !== cardId) ?? [],
					};
				}
				// Target lane - add the card at the specified index
				if (lane.id === targetLaneId) {
					const newCards = [...(lane.cards ?? [])];
					newCards.splice(index, 0, updatedCard);
					return {
						...lane,
						cards: newCards,
					};
				}
				// Other lanes remain unchanged
				return lane;
			}),
		};

		setBoardData(updatedBoard);
	};
	return (
		<Board
			tagStyle={{ fontSize: "80%" }}
			data={boardData}
			draggable={true}
			handleDragEnd={onDragEnd}
			onCardClick={(cardId, metadata) =>
				alert(`Card with id:${cardId} clicked. Has metadata.id: ${metadata.id}`)
			}
			components={{ Card: CustomCard }}
		/>
	);
};

export default ({
	title: "Custom Components",
	component: BoardWithCustomCard,
} satisfies Meta<typeof Board>);

export const DragnDropStyling = {};
