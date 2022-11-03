export async function fetchPopularRepos(language) {
	const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

	const res = await fetch(endpoint);
	const data = res.json();
	if (!data.items) {
		throw new Error(data.message);
	}
	return data.items;
}

export async function beginBattle(players) {
	const playerOneData = await fetchUserData(players[0]);
	const playerTwoData = await fetchUserData(players[1]);

	// sort the players according to their scores
	return [playerOneData, playerTwoData].sort((a, b) => b.score - a.score);
}


async function fetchUserData(username) {
	const profile = await getProfile(username);
	const repos = await getRepos(username);
	const score = getScore(repos);

	return { profile, score };
}


async function getProfile(username) {
	const endpoint = `https://api.github.com/users/${username}`;
	
	const res = await fetch(endpoint);
	const profile = await res.json();
	if (profile.message) {
		throw new Error(getErrorMsg(profile.message, username))
	}

	return profile;
}


async function getRepos(username) {
	const endpoint = `https://api.github.com/users/${username}/repos?per_page=100`;
	
	const res = await fetch(endpoint);
	const repos = res.json();
	if (repos.message) {
		throw new Error(getErrorMsg(repos.message, username))
	}

	return repos;
}


function getErrorMsg(message, username) {
	if (message == 'Not Found') {
		return `${username} doesn't exist`
	}
	return message;
}


function getScore(repos) {
	const totalStars  = repos.reduce((count, { stargazers_count }) => {
		return count + stargazers_count;
	}, 0);

	const totalForks  = repos.reduce((count, { forks_count }) => {
		return count + forks_count;
	}, 0);

	return totalForks + totalForks + (repos.length);
} 