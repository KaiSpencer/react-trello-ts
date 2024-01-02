import React, { FC, HTMLAttributes, PropsWithChildren } from "react";
import { StyledComponent, ThemedStyledFunction } from "styled-components";
import { DelButton, DeleteWrapper } from "../styles/Elements";

type DeleteButtonProps = HTMLAttributes<HTMLDivElement>;
export const DeleteButton: FC<PropsWithChildren<DeleteButtonProps>> = ({
	...rest
}) => {
	return (
		<DeleteWrapper {...rest}>
			<DelButton>&#10006;</DelButton>
		</DeleteWrapper>
	);
};
