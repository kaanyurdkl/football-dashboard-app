import { FEATURED_LEAGUES } from "@/config/leagues";

export async function getFeaturedLeaguesDetails() {
  try {
    const promises = FEATURED_LEAGUES.map((league) =>
      fetch(
        `https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=${league.idLeague}`,
        { cache: "force-cache" }
      ).then((res) => res.json())
    );

    const results = await Promise.all(promises);

    if (!results || results.length === 0) {
      throw new Error("No league details received from API");
    }

    const leagues = results
      .map((result) => result.leagues?.[0])
      .filter(Boolean);

    return {
      leagues,
    };
  } catch (error) {
    if (error instanceof Error && error.message) {
      console.error("League details error:", error.message);
    } else {
      console.error("Something went wrong loading league details");
    }

    return {
      leagues: null,
    };
  }
}
