// COMPONENTS
import StatsSection from "@/components/StatsSection";
import LeagueCarouselSection from "@/components/LeagueCarouselSection";
import RecentMatchesSection from "@/components/RecentMatchesSection";
// SERVICES
import { getFeaturedTeamsAndStadiums } from "@/services/teams";
import { getTodaysAndRecentMatches } from "@/services/matches";
import { getFeaturedLeaguesDetails } from "@/services/leagues";

export default async function DashboardPage() {
  const { featuredTeamsCount, featuredStadiumsCount, teamsByLeague } =
    await getFeaturedTeamsAndStadiums();
  const { leagues } = await getFeaturedLeaguesDetails();
  const { todaysMatchesCount, recentMatchesByLeague } =
    await getTodaysAndRecentMatches(leagues);

  return (
    <div className="space-y-6">
      <StatsSection
        featuredTeamsCount={featuredTeamsCount}
        featuredStadiumsCount={featuredStadiumsCount}
        todaysMatchesCount={todaysMatchesCount}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LeagueCarouselSection
          leagues={leagues}
          teamsByLeague={teamsByLeague}
        />
        <RecentMatchesSection recentMatchesByLeague={recentMatchesByLeague} />
      </div>
    </div>
  );
}
