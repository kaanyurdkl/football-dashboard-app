// CONFIG
import { FEATURED_LEAGUES } from "@/config/leagues";

// Types
interface LeagueDetails {
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

interface LeagueStanding {
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

const handleApiError = (context: string, error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.error(`${context} error:`, message);
};

const fetchWithValidation = async (url: string, context: string) => {
  const response = await fetch(url, { cache: "force-cache" });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${context}`);
  }
  return response.json();
};

// Get details for a single league by ID
export async function getLeague(
  leagueId: string
): Promise<LeagueDetails | null> {
  try {
    const data = await fetchWithValidation(
      `https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=${leagueId}`,
      `League details for ${leagueId}`
    );

    return data.leagues?.[0] || null;
  } catch (error) {
    handleApiError(`getLeague(${leagueId})`, error);
    return null;
  }
}

// Get details for all featured leagues
export async function getAllLeagues(): Promise<LeagueDetails[]> {
  try {
    const promises = FEATURED_LEAGUES.map((league) =>
      getLeague(league.idLeague)
    );

    const results = await Promise.all(promises);
    return results.filter(Boolean) as LeagueDetails[];
  } catch (error) {
    handleApiError("getAllLeagues", error);
    return [];
  }
}

// Get league standings for a specific season
export async function getLeagueStandings(
  leagueId: string,
  season?: string
): Promise<LeagueStanding[]> {
  try {
    const url = season
      ? `https://www.thesportsdb.com/api/v1/json/123/lookuptable.php?l=${leagueId}&s=${season}`
      : `https://www.thesportsdb.com/api/v1/json/123/lookuptable.php?l=${leagueId}`;

    const data = await fetchWithValidation(
      url,
      `League standings for ${leagueId}`
    );
    return data.table || [];
  } catch (error) {
    handleApiError(`getLeagueStandings(${leagueId})`, error);
    return [];
  }
}

// Get league details with standings
export async function getLeagueWithStandings(
  leagueId: string,
  season?: string
) {
  try {
    // Check if league exists in featured list
    const leagueConfig = FEATURED_LEAGUES.find(
      (league) => league.idLeague === leagueId
    );

    if (!leagueConfig) {
      return {
        config: null,
        details: null,
        standings: [],
        error: true,
      };
    }

    // Fetch league details and standings in parallel
    const [details, standings] = await Promise.all([
      getLeague(leagueId),
      getLeagueStandings(leagueId, season),
    ]);

    return {
      config: leagueConfig,
      details,
      standings,
      error: false,
    };
  } catch (error) {
    handleApiError(`getLeagueWithStandings(${leagueId})`, error);

    // Return config if available for fallback
    const leagueConfig = FEATURED_LEAGUES.find(
      (league) => league.idLeague === leagueId
    );

    return {
      config: leagueConfig || null,
      details: null,
      standings: [],
      error: true,
    };
  }
}
