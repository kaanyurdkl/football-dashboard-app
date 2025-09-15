// CONFIG
import { FEATURED_LEAGUES } from "@/config/leagues";

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

// Search teams
export async function searchTeams(query: string): Promise<SearchTeamResult[]> {
  if (query.length < 3) return [];

  try {
    const response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=${encodeURIComponent(
        query
      )}`,
      { cache: "force-cache" }
    );

    if (!response.ok) return [];

    const data = await response.json();
    return data.teams?.slice(0, 5) || [];
  } catch (error) {
    console.error("Search teams error:", error);
    return [];
  }
}

// Search leagues
export function searchLeagues(query: string): SearchLeagueResult[] {
  if (query.length < 2) return [];

  const lowerQuery = query.toLowerCase();

  return FEATURED_LEAGUES.filter((league) =>
    league.strLeague.toLowerCase().includes(lowerQuery)
  ).map((league) => ({
    idLeague: league.idLeague,
    strLeague: league.strLeague,
    strCountry: "",
  }));
}

export async function performSearch(query: string, type: SearchType) {
  if (type === "teams") {
    const teams = await searchTeams(query);
    return { type: "teams", teams };
  } else {
    const leagues = searchLeagues(query);
    return { type: "leagues", leagues };
  }
}
