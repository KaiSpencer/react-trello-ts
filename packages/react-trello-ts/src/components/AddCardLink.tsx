import React, { FC, HTMLAttributes, PropsWithChildren } from "react";
import { createTranslate } from "..";
import { AddCardLink as _AddCardLink } from "../styles/Base";

/**
 * AddCardLink component type
 *
 * Pass in a type to the optional generic to add custom properties
 *
 * @example
 *
 * type Props = {
 * 	customProperty: string;
 * }
 *
 * const CustomAddCardLink: AddCardLinkComponent<Props> = ({ customProperty, ...props }) => {
 * 	return (
 *		...
 *		{customProperty}
 *		...
 * 	)
 * }
 */
export type AddCardLinkComponent<TCustomAddCardLinkProps extends {} = object> =
	FC<PropsWithChildren<AddCardLinkProps & TCustomAddCardLinkProps>>;

interface AddCardLinkProps
	extends HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
	t: typeof createTranslate;
}
export const AddCardLink: FC<PropsWithChildren<AddCardLinkProps>> = ({
	onClick,
	t,
}) => <_AddCardLink onClick={onClick}>{t("Click to add card")}</_AddCardLink>;
