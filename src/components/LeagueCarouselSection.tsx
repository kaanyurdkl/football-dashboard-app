// COMPONENTS
import LeagueCarousel from "@/components/LeagueCarousel";

interface League {
  idLeague: string;
  strLeague: string;
  strCountry: string;
  strBanner?: string;
  strBadge?: string;
}

interface Team {
  strTeam: string;
  strTeamBadge: string;
}

interface LeagueCarouselSectionProps {
  leagues: League[] | null;
  teamsByLeague: Record<string, Team[]> | null;
}

export default async function LeagueCarouselSection({
  leagues,
  teamsByLeague,
}: LeagueCarouselSectionProps) {
  return (
    <div className="lg:col-span-2 space-y-4">
      <h3 className="text-lg font-semibold">Featured Leagues</h3>
      <div className="relative">
        <LeagueCarousel leagues={leagues} teamsByLeague={teamsByLeague} />
      </div>
    </div>
  );
}
