import { FEATURED_LEAGUES } from "@/config/leagues";

export async function getTodaysMatches() {
  try {
    const now = new Date();
    const today =
      now.getFullYear() +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getDate()).padStart(2, "0");

    const promises = FEATURED_LEAGUES.map((league) =>
      fetch(
        `https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=${today}&l=${league.strLeague}`,
        { cache: "force-cache" }
      ).then((res) => res.json())
    );

    const results = await Promise.all(promises);

    if (!results || results.length === 0) {
      throw new Error("No matches data received from API");
    }

    let todaysMatchesCount = 0;

    FEATURED_LEAGUES.forEach((league, index) => {
      const todayData = results[index];

      todaysMatchesCount += todayData?.events?.length || 0;
    });

    return { todaysMatchesCount };
  } catch (error) {
    if (error instanceof Error && error.message) {
      console.error("Matches data error:", error.message);
    } else {
      console.error("Something went wrong loading matches data");
    }

    return {
      todaysMatchesCount: null,
    };
  }
}
