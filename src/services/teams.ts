import { FEATURED_LEAGUES } from "@/config/leagues";

export async function getFeaturedTeamsAndStadiums() {
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

    results.forEach((data) => {
      if (data.teams) {
        featuredTeamsCount += data.teams.length;

        data.teams.forEach((team) => {
          if (team.strStadium) {
            featuredStadiums.add(team.strStadium);
          }
        });
      }
    });

    return { featuredTeamsCount, featuredStadiumsCount: featuredStadiums.size };
  } catch (error) {
    if (error instanceof Error && error.message) {
      console.error("Teams data error:", error.message);
    } else {
      console.error("Something went wrong loading teams data");
    }

    return {
      featuredTeamsCount: null,
      featuredStadiumsCount: null,
    };
  }
}
