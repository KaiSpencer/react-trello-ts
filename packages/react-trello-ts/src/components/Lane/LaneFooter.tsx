import React, { FC, HTMLAttributes, PropsWithChildren } from "react";

import { LaneFooter as _LaneFooter } from "../../styles/Base";
import { CollapseBtn, ExpandBtn } from "../../styles/Elements";

export type LaneFooterComponent = FC<PropsWithChildren<LaneFooterProps>>;

interface LaneFooterProps extends HTMLAttributes<HTMLDivElement> {
	collapsed?: boolean;
}
export const LaneFooter: LaneFooterComponent = ({
	onClick,
	onKeyDown,
	collapsed,
}) => (
	<_LaneFooter onClick={onClick} onKeyDown={onKeyDown}>
		{collapsed ? <ExpandBtn /> : <CollapseBtn />}
	</_LaneFooter>
);
