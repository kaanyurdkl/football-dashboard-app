// COMPONENTS
import LeagueCarousel from "@/components/LeagueCarousel";
// SERVICES
import { getFeaturedLeaguesDetails } from "@/services/leagues";

export default async function LeagueCarouselSection({ teamsByLeague }) {
  const { leagues } = await getFeaturedLeaguesDetails();

  return (
    <div className="lg:col-span-2 space-y-4">
      <h3 className="text-lg font-semibold">Featured Leagues</h3>
      <div className="relative">
        <LeagueCarousel leagues={leagues} teamsByLeague={teamsByLeague} />
      </div>
    </div>
  );
}
