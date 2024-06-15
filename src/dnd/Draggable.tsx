import React, { Component, ReactElement } from "react";
const constants = require("trello-smooth-dnd").constants;
const { wrapperClass } = constants;

export class Draggable extends Component<{
	render?: () => ReactElement;
	className?: string;
}> {
	render() {
		if (this.props.render) {
			return React.cloneElement(this.props.render(), {
				className: wrapperClass,
			});
		}

		const clsName = this.props.className ? `${this.props.className} ` : "";
		return (
			<div {...this.props} className={`${clsName}${wrapperClass}`}>
				{this.props.children}
			</div>
		);
	}
}
