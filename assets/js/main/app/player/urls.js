import appUrls from 'main/app/urls';
let index = appUrls.index

module.exports = {
	index: index,

	profileIndex: `${index}/profile`,
	profileDetail: `${index}/profile/:playerId?`,

	leagueIndex: `${index}/league`,
	leagueDetail: `${index}/league/:leagueId?`,

	seasonIndex: `${index}/league/:leagueId?/season`,
	seasonDetail: `${index}/league/:leagueId?/season/:seasonId?`,
	seasonDetailSchedule: `${index}/league/:leagueId?/season/:seasonId?/schedule`,
	seasonDetailRankings: `${index}/league/:leagueId?/season/:seasonId?/rankings`,

	matchIndex: `${index}/league/:leagueId?/season/:seasonId?/match`,
	matchDetail: `${index}/league/:leagueId?/season/:seasonId?/match/:matchId?`,

	teamIndex: `${index}/league/:leagueId?/season/:seasonId?/team`,
	teamDetail: `${index}/league/:leagueId?/season/:seasonId?/team/:teamId?`,
	teamDetailMatches: `${index}/league/:leagueId?/season/:seasonId?/team/:teamId?/matches`,
	teamDetailMembers: `${index}/league/:leagueId?/season/:seasonId?/team/:teamId?/team-members`,
	teamDetailDetails: `${index}/league/:leagueId?/season/:seasonId?/team/:teamId?/team-details`,
}
