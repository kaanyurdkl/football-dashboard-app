import { FEATURED_LEAGUES } from "@/config/leagues";
import { notFound } from "next/navigation";

export default async function LeaguePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const leagueConfig = FEATURED_LEAGUES.find(
    (league) => league.idLeague === id
  );
  if (!leagueConfig) {
    notFound();
  }

  return <div>League details</div>;
}
