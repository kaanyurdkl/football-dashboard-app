// COMPONENTS
import StatsCard from "@/components/StatsCard";
// SERVICES
import { getFeaturedTeamsAndStadiums } from "@/services/teams";
import { getTodaysMatches } from "@/services/matches";
// CONFIG
import { FEATURED_LEAGUES } from "@/config/leagues";

export default async function Stats() {
  const { featuredTeamsCount, featuredStadiumsCount } =
    await getFeaturedTeamsAndStadiums();
  const { todaysMatchesCount } = await getTodaysMatches();

  const statsCards = [
    {
      title: "Featured Leagues",
      value: FEATURED_LEAGUES.length,
      description: "Major European leagues",
    },
    {
      title: "Featured Teams",
      value: featuredTeamsCount,
      description: "Across 4 major leagues",
    },
    {
      title: "Stadiums",
      value: featuredStadiumsCount,
      description: "Iconic venues",
    },
    {
      title: "Today's Matches",
      value: todaysMatchesCount,
      description: "From featured leagues",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Stats</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card) => (
          <StatsCard
            key={card.title}
            title={card.title}
            value={card.value}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
}
