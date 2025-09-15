// CONFIG
import { FEATURED_LEAGUES } from "@/config/leagues";
// TYPES
import type { Team, ApiTeam } from "@/types";

export async function getFeaturedTeamsAndStadiums(): Promise<{
  featuredTeamsCount: number | null;
  featuredStadiumsCount: number | null;
  teamsByLeague: Record<string, Team[]> | null;
}> {
  try {
    const promises = FEATURED_LEAGUES.map((league) =>
      fetch(
        `https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=${league.strLeague}`,
        { cache: "force-cache" }
      ).then((res) => res.json())
    );

    const results = await Promise.all(promises);

    if (!results || results.length === 0) {
      throw new Error("No data received from API");
    }

    let featuredTeamsCount = 0;
    const featuredStadiums = new Set();
    const teamsByLeague: Record<string, Team[]> = {};

    results.forEach((data, index) => {
      const league = FEATURED_LEAGUES[index];

      if (data.teams) {
        featuredTeamsCount += data.teams.length;

        teamsByLeague[league.idLeague] = data.teams.slice(0, 5).map((team: ApiTeam) => ({
          strTeam: team.strTeam,
          strTeamBadge: team.strTeamBadge || team.strBadge || '',
        }));

        data.teams.forEach((team: ApiTeam) => {
          if (team.strStadium) {
            featuredStadiums.add(team.strStadium);
          }
        });
      }
    });

    return {
      featuredTeamsCount,
      featuredStadiumsCount: featuredStadiums.size,
      teamsByLeague,
    };
  } catch (error) {
    if (error instanceof Error && error.message) {
      console.error("Teams data error:", error.message);
    } else {
      console.error("Something went wrong loading teams data");
    }

    return {
      featuredTeamsCount: null,
      featuredStadiumsCount: null,
      teamsByLeague: null,
    };
  }
}
