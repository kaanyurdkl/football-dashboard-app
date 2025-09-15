// CONFIG
import { FEATURED_LEAGUES } from "@/config/leagues";
// UTILS
import { getTodayDate, getYesterdayDate } from "@/lib/utils";
// TYPES
import type { LeagueDetails, Match } from "@/types";

export async function getTodaysAndRecentMatches(leagues: LeagueDetails[] | null) {
  try {
    const today = getTodayDate();
    const yesterdayStr = getYesterdayDate();

    const promises = FEATURED_LEAGUES.flatMap((league) => [
      fetch(
        `https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=${today}&l=${league.strLeague}`,
        { cache: "force-cache" }
      ).then((res) => res.json()),
      fetch(
        `https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=${yesterdayStr}&l=${league.strLeague}`,
        { cache: "force-cache" }
      ).then((res) => res.json()),
    ]);

    const results = await Promise.all(promises);

    if (!results || results.length === 0) {
      throw new Error("No matches data received from API");
    }

    let todaysMatchesCount = 0;
    const recentMatchesByLeague: Record<string, {
      leagueName: string;
      leagueBadge?: string;
      matches: Match[];
    }> = {};

    FEATURED_LEAGUES.forEach((league, index) => {
      const todayData = results[index * 2];
      const yesterdayData = results[index * 2 + 1];

      todaysMatchesCount += todayData?.events?.length || 0;

      const todayMatches = todayData?.events || [];
      const yesterdayMatches = yesterdayData?.events || [];

      const allMatches = [...todayMatches, ...yesterdayMatches].sort(
        (a, b) =>
          new Date(b.dateEvent).getTime() - new Date(a.dateEvent).getTime()
      );

      recentMatchesByLeague[league.idLeague] = {
        leagueName: league.strLeague,
        leagueBadge: leagues?.[index]?.strBadge,
        matches: allMatches,
      };
    });

    return { todaysMatchesCount, recentMatchesByLeague };
  } catch (error) {
    if (error instanceof Error && error.message) {
      console.error("Matches data error:", error.message);
    } else {
      console.error("Something went wrong loading matches data");
    }

    return {
      todaysMatchesCount: null,
      recentMatchesByLeague: null,
    };
  }
}
