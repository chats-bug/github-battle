import React, { Children } from "react";
import PropTypes from "prop-types";


const container = {
	position: "relative",
	display: "flex",
};

export default class Tooltip extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			hovering: false
		}

		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
	}

	onMouseOver() {
		this.setState({ hovering: true })
	}

	onMouseOut() {
		this.setState({ hovering: false })
	}

	render() {
		const { element, children } = this.props;

		return (
			<div
				onMouseOver={this.onMouseOver}
				onMouseOut={this.onMouseOut}
				style={container}
			>
			{this.state.hovering === true && element}
			{children}
			</div>
		)
	}
}