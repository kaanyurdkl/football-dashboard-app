// COMPONENTS
import StatsSection from "@/components/StatsSection";
import LeagueCarouselSection from "@/components/LeagueCarouselSection";
import RecentMatchesSection from "@/components/RecentMatchesSection";
// SERVICES
import { getFeaturedTeamsAndStadiums } from "@/services/teams";

export default async function DashboardPage() {
  const { featuredTeamsCount, featuredStadiumsCount, teamsByLeague } =
    await getFeaturedTeamsAndStadiums();

  return (
    <div className="space-y-6">
      <StatsSection
        featuredTeamsCount={featuredTeamsCount}
        featuredStadiumsCount={featuredStadiumsCount}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LeagueCarouselSection teamsByLeague={teamsByLeague} />
        <RecentMatchesSection />
      </div>
    </div>
  );
}
