import React, {
	CSSProperties,
	EventHandler,
	FC,
	MouseEvent,
	PropsWithChildren,
} from "react";
import {
	MovableCardWrapper,
	CardHeader,
	CardRightContent,
	CardTitle,
	Detail,
	Footer,
} from "../styles/Base";
import { InlineInput } from "../widgets/InlineInput";
import { Tag, TagProps } from "./Card/Tag";
import { DeleteButton } from "../widgets/DeleteButton";
import { createTranslate } from "..";
import { Card as ICard } from "../types/Board";
import { StyledComponent } from "styled-components";

/**
 * Card component type
 *
 * Pass in a type to the optional generic to add custom properties to the card
 *
 * @example
 *
 * type CustomCardProps = {
 * 	dueOn: string;
 * }
 *
 * const CustomCard: CardComponent<CustomCardProps> = ({ dueOn, ...props }) => {
 * 	return (
 * 		<Card {...props}>
 * 			<Detail>{dueOn}</Detail>
 * 		</Card>
 * 	)
 * }
 */
export type CardComponent<TCustomCardProps extends {} = {}> = FC<
	PropsWithChildren<CardProps & TCustomCardProps>
>;

export type CardProps = {
	showDeleteButton?: boolean;
	onDelete?: () => void;
	onClick?: (e) => void;
	onChange?: (card: ICard) => void;
	style?: CSSProperties;
	tagStyle?: CSSProperties;
	className?: string;
	id: string;
	index: number;
	title?: string;
	label?: string;
	description?: string;
	tags?: TagProps[];
	cardDraggable?: boolean;
	editable?: boolean;
	t: typeof createTranslate;
};

export const Card: CardComponent = ({
	onDelete,
	onChange,
	id,
	onClick,
	style,
	className,
	description,
	label,
	t,
	tags,
	title,
	cardDraggable,
	editable,
	showDeleteButton,
	tagStyle,
}) => {
	const _onDelete = (
		e:
			| React.MouseEvent<HTMLDivElement>
			| React.MouseEvent<StyledComponent<"div", any>>,
	) => {
		onDelete();
		e.stopPropagation();
	};
	const updateCard = (card: Partial<ICard>) => {
		onChange({ ...card, id });
	};

	return (
		<MovableCardWrapper
			data-id={id}
			onClick={onClick}
			style={style}
			className={className}
		>
			<CardHeader>
				<CardTitle draggable={cardDraggable}>
					{editable ? (
						<InlineInput
							value={title}
							border={true}
							placeholder={t("placeholder.title") as unknown as string}
							resize="vertical"
							onSave={(value: ICard["title"]) => updateCard({ title: value })}
						/>
					) : (
						title
					)}
				</CardTitle>
				<CardRightContent>
					{editable ? (
						<InlineInput
							value={label}
							border={true}
							placeholder={t("placeholder.label") as unknown as string}
							resize="vertical"
							onSave={(value: ICard["label"]) => updateCard({ label: value })}
						/>
					) : (
						label
					)}
				</CardRightContent>
				{showDeleteButton && <DeleteButton onClick={_onDelete} />}
			</CardHeader>
			<Detail>
				{editable ? (
					<InlineInput
						value={description}
						border={true}
						placeholder={t("placeholder.description") as unknown as string}
						resize="vertical"
						onSave={(value: ICard["description"]) =>
							updateCard({ description: value })
						}
					/>
				) : (
					description
				)}
			</Detail>
			{tags && tags.length > 0 && (
				<Footer>
					{tags.map((tag) => (
						<Tag key={tag.title} {...tag} tagStyle={tagStyle} />
					))}
				</Footer>
			)}
		</MovableCardWrapper>
	);
};
