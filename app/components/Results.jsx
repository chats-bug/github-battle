import * as React from 'react';
import PropTypes from "prop-types";
import { beginBattle } from '../utils/api';

function PlayerResult({username}) {
	return (
		<article className="card">
			<div className="split">
				<div>
					<h2>{username}</h2>
					<p>Location</p>
				</div>
				<img 
					width={32}
					height={32}
					src={`https://github.com/${username}.png?size=200`}
					alt={`Avatar for ${username}`}
				/>
				<div>
					<table>
						<tbody>
							<tr>
								<td>Name</td>
								<td>{username}</td>
							</tr>
							<tr>
								<td>Company</td>
								<td>Company</td>
							</tr>
							<tr>
								<td>Followers</td>
								<td>Followers</td>
							</tr>
							<tr>
								<td>Following</td>
								<td>Following</td>
							</tr>
							<tr>
								<td>Repositories</td>
								<td>Repositories</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</article>
	)
}


export default class Results extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			reset: false
		}
	}

	componentDidMount() {
		const { playerOne, playerTwo } = this.props;
		beginBattle([playerOne, playerTwo]).then((data) => console.log(data)); 
	}

	resetBattle() {
		this.setState()
	}

	render() {
		const { playerOne, playerTwo } = this.props;

		return(
			<main className="stack main-stack animate-in">
				<div className="split">
					<h1>Results</h1>
					<button
						onClick={resetBattle()}
						className={`btn primary`}>
						Reset
					</button>
				</div>
				<section className="grid">
					<PlayerResult username={playerOne} />
					<PlayerResult username={playerTwo} />
				</section>
			</main>
		)
	}
}