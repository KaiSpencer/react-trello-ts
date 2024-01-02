import { Meta } from "@storybook/react";
import React, { CSSProperties } from "react";
import Board from "../src";
import { CardComponent } from "../src/components/Card";
import { Tag } from "../src/components/Card/Tag";
import { MovableCardWrapper } from "../src/styles/Base";
import { BoardData } from "../src/types/Board";
import { DeleteButton } from "./../src/widgets/DeleteButton";
Board.displayName = "Board";

const CustomCardExample: CardComponent<{
	name: string;
	cardStyle: CSSProperties;
	body: string;
	dueOn: string;
	cardColor: CSSProperties["color"];
	subTitle: string;
	escalationText: string;
}> = ({
	onClick,
	className,
	name,
	cardStyle,
	body,
	dueOn,
	cardColor,
	subTitle,
	tagStyle,
	escalationText,
	tags,
	showDeleteButton,
	onDelete,
	id,
	index,
	t,
}) => {
	const clickDelete = (e) => {
		onDelete();
		e.stopPropagation();
	};

	return (
		<MovableCardWrapper
			onClick={onClick}
			style={cardStyle}
			className={className}
		>
			<header
				style={{
					borderBottom: "1px solid #eee",
					paddingBottom: 6,
					marginBottom: 10,
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					color: cardColor,
				}}
			>
				<div style={{ fontSize: 14, fontWeight: "bold" }}>{name}</div>
				<div style={{ fontSize: 11 }}>{dueOn}</div>
				{showDeleteButton && <DeleteButton onClick={clickDelete} />}
			</header>
			<div style={{ fontSize: 12, color: "#BD3B36" }}>
				<div style={{ color: "#4C4C4C", fontWeight: "bold" }}>{subTitle}</div>
				<div style={{ padding: "5px 0px" }}>
					<i>{body}</i>
				</div>
				<div
					style={{
						marginTop: 10,
						textAlign: "center",
						color: cardColor,
						fontSize: 15,
						fontWeight: "bold",
					}}
				>
					{escalationText}
				</div>
				{tags && (
					<div
						style={{
							borderTop: "1px solid #eee",
							paddingTop: 6,
							display: "flex",
							justifyContent: "flex-end",
							flexDirection: "row",
							flexWrap: "wrap",
						}}
					>
						{tags.map((tag) => (
							<Tag key={tag.title} {...tag} tagStyle={tagStyle} />
						))}
					</div>
				)}
			</div>
		</MovableCardWrapper>
	);
};

const data: BoardData = {
	lanes: [
		{
			id: "lane1",
			title: "Planned Tasks",
			label: "12/12",
			style: { backgroundColor: "cyan", padding: 20 },
			titleStyle: { fontSize: 20, marginBottom: 15 },
			labelStyle: { color: "#009688", fontWeight: "bold" },
			cards: [
				{
					id: "Card1",
					name: "John Smith",
					dueOn: "due in a day",
					subTitle: "SMS received at 12:13pm today",
					body: "Thanks. Please schedule me for an estimate on Monday.",
					escalationText: "Escalated to OPS-ESCALATIONS!",
					cardColor: "#BD3B36",
					cardStyle: {
						borderRadius: 6,
						boxShadow: "0 0 6px 1px #BD3B36",
						marginBottom: 15,
					},
					metadata: { id: "Card1" },
				},
				{
					id: "Card2",
					name: "Card Weathers",
					dueOn: "due now",
					subTitle: "Email received at 1:14pm",
					body: "Is the estimate free, and can someone call me soon?",
					escalationText: "Escalated to Admin",
					cardColor: "#E08521",
					cardStyle: {
						borderRadius: 6,
						boxShadow: "0 0 6px 1px #E08521",
						marginBottom: 15,
					},
					metadata: { id: "Card1" },
				},
			],
		},
		{
			id: "lane2",
			title: "Long Lane name this is i suppose ha!",
			cards: [
				{
					id: "Card3",
					name: "Michael Caine",
					dueOn: "due in a day",
					subTitle: "Email received at 4:23pm today",
					body:
						"You are welcome. Interested in doing business with you" + " again",
					escalationText: "Escalated to OPS-ESCALATIONS!",
					cardColor: "#BD3B36",
					cardStyle: {
						borderRadius: 6,
						boxShadow: "0 0 6px 1px #BD3B36",
						marginBottom: 15,
					},
					metadata: { id: "Card1" },
					tags: [
						{ title: "Critical", color: "white", bgcolor: "red" },
						{ title: "2d ETA", color: "white", bgcolor: "#0079BF" },
					],
				},
			],
		},
	],
};

export default ({
	title: "Custom Components",
	component: () => {
		return (
			<Board
				tagStyle={{ fontSize: "80%" }}
				data={data}
				draggable={true}
				components={{ Card: CustomCardExample }}
				onCardClick={(cardId, metadata) =>
					alert(
						`Card with id:${cardId} clicked. Has metadata.id: ${metadata.id}`,
					)
				}
			/>
		);
	},
} satisfies Meta<typeof Board>);

export const Card: Meta = {};
