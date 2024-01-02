import { Meta } from "@storybook/react";
import React, { Component } from "react";

import Board from "../src";
import { NewCardFormProps } from "../src/components/NewCardForm";

import data from "./data/base.json";
Board.displayName = "Board";

class NewCardFormComponent extends Component<NewCardFormProps> {
	private titleRef: any;
	private descRef: any;
	handleAdd = () =>
		this.props.onAdd({
			label: "",
			laneId: this.props.laneId,
			title: this.titleRef.value,
			description: this.descRef.value,
		});
	setTitleRef = (ref) => (this.titleRef = ref);
	setDescRef = (ref) => (this.descRef = ref);
	render() {
		const { onCancel } = this.props;
		return (
			<div
				style={{
					background: "white",
					borderRadius: 3,
					border: "1px solid #eee",
					borderBottom: "1px solid #ccc",
				}}
			>
				<div style={{ padding: 5, margin: 5 }}>
					<div>
						<div style={{ marginBottom: 5 }}>
							<input type="text" ref={this.setTitleRef} placeholder="Title" />
						</div>
						<div style={{ marginBottom: 5 }}>
							<input
								type="text"
								ref={this.setDescRef}
								placeholder="Description"
							/>
						</div>
					</div>
					<button onClick={this.handleAdd}>Add</button>
					<button onClick={onCancel}>Cancel</button>
				</div>
			</div>
		);
	}
}

export default ({
	title: "Custom Components",
	component: () => (
		<Board
			data={data}
			editable={true}
			// @ts-ignore
			components={{ NewCardForm: NewCardFormComponent }}
		/>
	),
} satisfies Meta<typeof Board>);

export const NewCardForm = {};
