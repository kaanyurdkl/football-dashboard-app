// COMPONENTS
import Stats from "@/components/Stats";
import LeagueCarouselSection from "@/components/LeagueCarouselSection";
import { getFeaturedTeamsAndStadiums } from "@/services/teams";

export default async function DashboardPage() {
  const { featuredTeamsCount, featuredStadiumsCount, teamsByLeague } =
    await getFeaturedTeamsAndStadiums();

  return (
    <div className="space-y-6">
      <Stats
        featuredTeamsCount={featuredTeamsCount}
        featuredStadiumsCount={featuredStadiumsCount}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LeagueCarouselSection teamsByLeague={teamsByLeague} />
      </div>
    </div>
  );
}
