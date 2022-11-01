import * as React from 'react';
import PropTypes from "prop-types";
import {  fetchPopularRepos } from "../utils/api";
import Table from './table';

function LanguagesNav({ selected, onUpdateLanguage }) {
	const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];

	return(
		<select
			onChange={(e) => onUpdateLanguage(e.target.value)}
			selected={selected}
		>
			{languages.map((language) => (
				<option key={language} value={language}>
					{language}
				</option>
			))}
		</select>
	)
}
LanguagesNav.propTypes = {
	selected: PropTypes.string.isRequired,
	onUpdateLanguage: PropTypes.func.isRequired
}

export default class Popular extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLanguage: "All",
			repos: null,
			error: null
		};
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	async componentDidMount() {
		await this.updateLanguage(this.state.selectedLanguage);
	}

	async updateLanguage(selectedLanguage) {
		this.setState({
			selectedLanguage
		});

		const repos = await fetchPopularRepos(selectedLanguage).catch((error) => {
			console.warn("Error fetching repos: ", error);
			this.setState({
				error: `Error fetching repos`
			});
		});

		this.setState({
			repos,
			error: null
		});
	}

	render() {
		const { repos, error, selectedLanguage } = this.state

		return(
			<main className="stack main-stack animate-in">
				<div className="split">
					<h1>Popular</h1>
					<LanguagesNav 
							selected={selectedLanguage}
							onUpdateLanguage={this.updateLanguage}
						/>
				</div>

				{error && <p className="text-center error">{error}</p>}
				
				{repos && <Table repos={repos}/>}
			</main>
		);
	}
};