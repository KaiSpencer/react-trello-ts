import React, { Component } from "react";

import Board from "../src";

import data from "./data/data-sort.json";
Board.displayName = "Board";

class NewLaneFormComponent extends Component {
	render() {
		const { onCancel, t } = this.props;
		const handleAdd = () => this.props.onAdd({ title: this.inputRef.value });
		const setInputRef = (ref) => (this.inputRef = ref);
		return (
			<div>
				<input ref={setInputRef} placeholder={t("placeholder.title")} />
				<button onClick={handleAdd}>{t("button.Add lane")}</button>
				<button onClick={onCancel}>{t("button.Cancel")}</button>
			</div>
		);
	}
}

export default {
	title: "Custom Components",
	component: () => (
		<Board
			editable={true}
			canAddLanes={true}
			components={{ NewLaneForm: NewLaneFormComponent }}
			data={data}
		/>
	),
};

export const NewLaneForm = {};
