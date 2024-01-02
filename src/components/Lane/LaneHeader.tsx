import React, {
	CSSProperties,
	FC,
	HTMLAttributes,
	PropsWithChildren,
} from "react";
import createTranslate from "../../helpers/createTranslate";
import {
	LaneHeader as _LaneHeader,
	RightContent,
	Title,
} from "../../styles/Base";
import { InlineInput } from "../../widgets/InlineInput";
import { LaneMenu } from "./LaneHeader/LaneMenu";

export type LaneHeaderProps = _LaneHeaderProps & {
	[key: string]: any;
};
interface _LaneHeaderProps extends HTMLAttributes<HTMLHeadElement> {
	updateTitle?: (title: string) => void;
	canAddLanes?: boolean;
	onDelete?: () => void;
	editLaneTitle?: boolean;
	label?: string;
	titleStyle?: CSSProperties;
	labelStyle?: CSSProperties;
	laneDraggable?: boolean;
	t: typeof createTranslate;
}
export const LaneHeader: FC<PropsWithChildren<LaneHeaderProps>> = ({
	updateTitle = () => {},
	canAddLanes = false,
	onDelete,
	onDoubleClick,
	editLaneTitle,
	label,
	title,
	titleStyle,
	labelStyle,
	t,
	laneDraggable,
}) => {
	return (
		<_LaneHeader onDoubleClick={onDoubleClick} editLaneTitle={editLaneTitle}>
			<Title draggable={laneDraggable} style={titleStyle}>
				{editLaneTitle ? (
					<InlineInput
						value={title}
						border={true}
						placeholder={t("placeholder.title") as unknown as string}
						resize="vertical"
						onSave={updateTitle}
					/>
				) : (
					title
				)}
			</Title>
			{label && (
				<RightContent>
					<span style={labelStyle}>{label}</span>
				</RightContent>
			)}
			{canAddLanes && <LaneMenu t={t} onDelete={onDelete} />}
		</_LaneHeader>
	);
};
