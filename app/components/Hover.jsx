import * as React from 'react';

export default class Hover extends React.Component {
	state = {
		hovering: false
	}

	onMouseOver = () => {
		this.setState({ hovering: true })
	}

	onMouseOut = () => {
		this.setState({ hovering: false })
	}

	render() {
		const { hovering } = this.state;
		return (
			<div onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
				{this.props.children(hovering)}
			</div>
		);
	}
}