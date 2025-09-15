export interface Player {
  idPlayer: string;
  strPlayer: string;
  strNationality?: string;
  strPosition?: string;
  dateBorn?: string;
  strHeight?: string;
  strWeight?: string;
  strThumb?: string;
  strCutout?: string;
  strDescriptionEN?: string;
}

export interface Match {
  strEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string;
  intAwayScore: string;
  dateEvent: string;
  strLeague: string;
}

export interface TeamDetails {
  idTeam: string;
  strTeam: string;
  strAlternate?: string;
  strTeamAlternate?: string;
  intFormedYear?: string;
  strSport: string;
  strLeague: string;
  strDivision?: string;
  strStadium?: string;
  strStadiumThumb?: string;
  strStadiumDescription?: string;
  strStadiumLocation?: string;
  strLocation?: string;
  strWebsite?: string;
  strFacebook?: string;
  strTwitter?: string;
  strInstagram?: string;
  strYoutube?: string;
  strTeamBadge?: string;
  strBadge?: string;
  strTeamBanner?: string;
  strBanner?: string;
  strTeamLogo?: string;
  strDescriptionEN?: string;
  strCountry?: string;
  strGender?: string;
  intStadiumCapacity?: string;
}

export interface LeagueDetails {
  idLeague: string;
  strLeague: string;
  strCountry: string;
  strBadge?: string;
  strBanner?: string;
  strDescriptionEN?: string;
  strWebsite?: string;
  strCurrentSeason?: string;
  intFormedYear?: string;
  strTrophy?: string;
}

export interface LeagueStanding {
  idStanding: string;
  idTeam: string;
  intRank: string;
  strTeam: string;
  strBadge: string;
  intPlayed: string;
  intWin: string;
  intDraw: string;
  intLoss: string;
  intGoalsFor: string;
  intGoalsAgainst: string;
  intGoalDifference: string;
  intPoints: string;
  strForm: string;
}

export interface Team {
  strTeam: string;
  strTeamBadge: string;
}

export interface League {
  idLeague: string;
  strLeague: string;
  strCountry: string;
  strBanner?: string;
  strBadge?: string;
}

export interface ApiTeam {
  strTeam: string;
  strTeamBadge?: string;
  strBadge?: string;
  strStadium?: string;
}

export interface PositionData {
  position: string;
  count: number;
}

export interface NationalityData {
  nationality: string;
  count: number;
  percentage: number;
}

export interface SearchTeamResult {
  idTeam: string;
  strTeam: string;
  strLeague?: string;
  strCountry?: string;
  strBadge?: string;
  strSport?: string;
}

export interface SearchLeagueResult {
  idLeague: string;
  strLeague: string;
  strCountry: string;
}

export type SearchType = "teams" | "leagues";

export interface LeagueMatches {
  leagueName: string;
  leagueBadge?: string;
  matches: Match[];
}