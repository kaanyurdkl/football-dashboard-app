// CONFIG
import { FEATURED_LEAGUES } from "@/config/leagues";
// UTILS
import { getTodayDate, getYesterdayDate } from "@/lib/utils";
// TYPES
import type { LeagueDetails, Match } from "@/types";

// Helper function to get last weekend dates (Saturday and Sunday)
function getLastWeekendDates() {
  const now = new Date();
  const currentDay = now.getDay();

  let daysSinceLastSunday;
  if (currentDay === 0) {
    daysSinceLastSunday = 0;
  } else {
    daysSinceLastSunday = currentDay;
  }

  const lastSunday = new Date(
    now.getTime() - daysSinceLastSunday * 24 * 60 * 60 * 1000
  );
  const lastSaturday = new Date(lastSunday.getTime() - 24 * 60 * 60 * 1000);

  return {
    saturday: lastSaturday.toLocaleDateString("en-CA", {
      timeZone: "America/Toronto",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    sunday: lastSunday.toLocaleDateString("en-CA", {
      timeZone: "America/Toronto",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
  };
}

export async function getTodaysAndRecentMatches(
  leagues: LeagueDetails[] | null
) {
  try {
    const today = getTodayDate();
    const yesterdayStr = getYesterdayDate();
    const { saturday: lastSaturday, sunday: lastSunday } =
      getLastWeekendDates();

    const promises = FEATURED_LEAGUES.flatMap((league) => [
      fetch(
        `https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=${today}&l=${encodeURIComponent(
          league.strLeague.replace(/\s+/g, "_")
        )}`,
        { cache: "force-cache" }
      ).then((res) => res.json()),
      fetch(
        `https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=${yesterdayStr}&l=${encodeURIComponent(
          league.strLeague.replace(/\s+/g, "_")
        )}`,
        { cache: "force-cache" }
      ).then((res) => res.json()),
    ]);

    const results = await Promise.all(promises);

    if (!results || results.length === 0) {
      throw new Error("No matches data received from API");
    }

    let todaysMatchesCount = 0;
    const recentMatchesByLeague: Record<
      string,
      {
        leagueName: string;
        leagueBadge?: string;
        matches: Match[];
        dateRange: string;
      }
    > = {};

    const hasRecentMatches = results.some(
      (result) => result?.events?.length > 0
    );

    let weekendResults = [];
    if (!hasRecentMatches) {
      // Only call weekend APIs if no recent matches found
      const weekendPromises = FEATURED_LEAGUES.flatMap((league) => [
        fetch(
          `https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=${lastSaturday}&l=${encodeURIComponent(
            league.strLeague.replace(/\s+/g, "_")
          )}`,
          { cache: "force-cache" }
        ).then((res) => res.json()),
        fetch(
          `https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=${lastSunday}&l=${encodeURIComponent(
            league.strLeague.replace(/\s+/g, "_")
          )}`,
          { cache: "force-cache" }
        ).then((res) => res.json()),
      ]);
      weekendResults = await Promise.all(weekendPromises);
    }

    FEATURED_LEAGUES.forEach((league, index) => {
      const todayData = results[index * 2];
      const yesterdayData = results[index * 2 + 1];

      todaysMatchesCount += todayData?.events?.length || 0;

      const todayMatches = todayData?.events || [];
      const yesterdayMatches = yesterdayData?.events || [];

      let allMatches = [...todayMatches, ...yesterdayMatches];
      let dateRange = "Recent matches";

      // If no recent matches and we have weekend data, use weekend matches
      if (allMatches.length === 0 && weekendResults.length > 0) {
        const saturdayData = weekendResults[index * 2];
        const sundayData = weekendResults[index * 2 + 1];
        const saturdayMatches = saturdayData?.events || [];
        const sundayMatches = sundayData?.events || [];
        allMatches = [...saturdayMatches, ...sundayMatches];
        dateRange = "Last weekend matches";
      }

      allMatches.sort(
        (a, b) =>
          new Date(b.dateEvent).getTime() - new Date(a.dateEvent).getTime()
      );

      recentMatchesByLeague[league.idLeague] = {
        leagueName: league.strLeague,
        leagueBadge: leagues?.[index]?.strBadge,
        matches: allMatches,
        dateRange,
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

export async function getLeagueRecentMatches(leagueId: string) {
  const allLeaguesData = await getTodaysAndRecentMatches(null);

  if (!allLeaguesData.recentMatchesByLeague) {
    return null;
  }

  return allLeaguesData.recentMatchesByLeague[leagueId] || null;
}
