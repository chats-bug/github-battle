import * as React from 'react';
import PropTypes from "prop-types";
import { hashtag } from "./icons";
import Tooltip from './Tooltip';

function TableHead({ theme }) {
	return (
		<thead>
			<tr>
				<th style={{ width: "5%"}} className={theme}>{hashtag}</th>
				<th style={{ width: "50%"}} className={theme}>Repositories</th>
				<th style={{ width: "15%"}} className={theme}>Stars</th>
				<th style={{ width: "15%"}} className={theme}>Forks</th>
				<th style={{ width: "15%"}} className={theme}>Open Issues</th>
			</tr>
		</thead>
	)
}

function MoreInfo(created_at, forked_count, language, updated_at, watchers, login,) {
	return (
		<ul className="tooltip stack">
			<li className="split">
				<span>By:</span> <span>{login}</span>
			</li>
			{language && (
				<li className="split">
					<span>Language:</span> <span>{language}</span>
				</li>
      	)}
			<li className="split">
				<span>Created:</span> <span>{new Date(created_at).toLocaleDateString()}</span>
			</li>
			<li className="split">
				<span>Updated:</span> <span>{new Date(updated_at).toLocaleDateString()}</span>
			</li>
			<li className="split">
				<span>Watchers:</span> <span>{watchers}</span>
			</li>
			<li className="split">
				<span>Created:</span> <span>{created_at}</span>
			</li>
			{forked_count && (
				<li className="split">
					<span>Forked:</span> <span>{forked_count.toLocaleString()}</span>
				</li>
			)}
		</ul>
	)
}

MoreInfo.propTypes = {
	created_at: PropTypes.string.isRequired,
	language: PropTypes.string,
	updated_at: PropTypes.string.isRequired,
	watchers: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
};


function TableRow({ index, owner, stargazers_count, forks, open_issues, name, created_at, updated_at, language, watchers }) {
	const { login, avatar_url} = owner;
	return (
		<tr>
			<td>{index+1}</td>
			<td>
				<Tooltip element={MoreInfo(created_at, forks, language, updated_at, watchers, login)}>
					<div className="row gap-md">
						<img
							width={32}
							height={32}
							className="avatar"
							src={avatar_url}
							alt={`Avatar for  ${login}`}
						/>
						<a href={`https://github.com/${login}/${name}`}>{name}</a>
					</div>
				</Tooltip>
			</td>
			<td>{stargazers_count}</td>
			<td>{forks}</td>
			<td>{open_issues}</td>
			
		</tr>
	)
}

TableRow.propTypes = {
	index: PropTypes.number.isRequired,
	owner: PropTypes.object.isRequired,
	stargazers_count: PropTypes.number.isRequired,
	forks: PropTypes.number.isRequired,
	open_issues: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
}

export default function Table({ repos, theme }) {
	return (
		<table>
			<TableHead theme={theme}/>
			<tbody>
				{repos.map((repo, index) => {
					return <TableRow key={index} index={index} {...repo}/>
				})}
			</tbody>
		</table>
	)
}

Table.propTypes = {
	repos: PropTypes.array.isRequired,
};