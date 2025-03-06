import autosize from "../helpers/autosize";
import React, { FC, useEffect, useRef, useState } from "react";
import { InlineInput as _InlineInput } from "../styles/Base";

interface InlineInputProps {
	onSave?: (inputValue: string) => void;
	onCancel?: () => void;
	border?: boolean;
	placeholder?: string;
	value?: string;
	autoFocus?: boolean;
	resize?: "none" | "vertical" | "horizontal";
}

export const InlineInput: FC<InlineInputProps> = ({
	autoFocus = false,
	border = false,
	onSave = () => {},
	onCancel = () => {},
	placeholder = "",
	value = "",
	resize = "none",
}) => {
	const [inputValue, setInputValue] = useState(value);
	const inputRef = useRef<HTMLTextAreaElement | null>(null);

	const onFocus = (e: React.FocusEvent<HTMLTextAreaElement>) =>
		e.target.select();

	const onMouseDown = (e: React.MouseEvent<HTMLTextAreaElement>) => {
		if (document.activeElement !== e.target) {
			e.preventDefault();
			inputRef.current.focus();
		}
	};

	const onBlur = () => {
		updateValue();
	};

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			inputRef.current.blur();
			e.preventDefault();
		}
		if (e.key === "Escape") {
			setValue(value);
			inputRef.current.blur();
			e.preventDefault();
		}
		if (e.key === "Tab") {
			if (inputValue.length === 0) {
				onCancel();
			}
			inputRef.current.blur();
			e.preventDefault();
		}
	};

	const getValue = () => inputRef.current.value || "";
	const setValue = (newValue: string) => {
		if (inputRef.current) {
			inputRef.current.value = newValue;
		}
	};

	const updateValue = () => {
		if (getValue() !== value) {
			onSave(getValue());
		}
	};

	const setRef = (ref: HTMLTextAreaElement) => {
		inputRef.current = ref;
		if (resize !== "none") {
			autosize(inputRef.current);
		}
	};

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	return (
		<_InlineInput
			ref={setRef}
			border={border}
			onMouseDown={onMouseDown}
			onFocus={onFocus}
			onBlur={onBlur}
			onKeyDown={onKeyDown}
			placeholder={value.length === 0 ? undefined : placeholder}
			defaultValue={value}
			autoComplete="off"
			autoCorrect="off"
			autoCapitalize="off"
			spellCheck="false"
			rows={1}
			autoFocus={autoFocus}
		/>
	);
};
