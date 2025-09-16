// LIBRARIES
import Image from "next/image";
import { notFound } from "next/navigation";
// COMPONENTS
import CollapsibleDescription from "@/components/CollapsibleDescription";
import LeagueStandings from "@/components/LeagueStandings";
import FeaturedTeams from "@/components/FeaturedTeams";
import LeagueRecentMatches from "@/components/LeagueRecentMatches";
// SERVICES
import { getLeagueWithStandings } from "@/services/leagues";
// UTILS
import { getCurrentSeason } from "@/lib/utils";

export default async function LeaguePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { config, details, standings, error } = await getLeagueWithStandings(
    id,
    getCurrentSeason()
  );

  if (!config) {
    notFound();
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{config?.strLeague}</h1>
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Failed to load league information
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-lg border overflow-hidden">
            {details?.strBanner && (
              <div className="relative w-full h-48">
                <Image
                  src={details.strBanner}
                  alt={`${details.strLeague} banner`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                {details?.strBadge && (
                  <div className="relative w-16 h-16">
                    <Image
                      src={details.strBadge}
                      alt={`${details.strLeague} badge`}
                      fill
                      className="object-contain"
                      sizes="64px"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-3xl font-bold">
                    {details?.strLeague || config?.strLeague}
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    {details?.strCountry} • Founded {details?.intFormedYear}
                  </p>
                </div>
              </div>

              {details?.strDescriptionEN && (
                <CollapsibleDescription
                  description={details.strDescriptionEN}
                  maxLength={300}
                />
              )}

              <div className="flex flex-wrap gap-4">
                {details?.strWebsite && (
                  <a
                    href={details.strWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
                  >
                    Official Website
                  </a>
                )}
                {details?.strCurrentSeason && (
                  <span className="text-sm bg-muted px-4 py-2 rounded-md">
                    Current Season: {details.strCurrentSeason}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">League Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Founded</span>
                <span className="text-sm font-medium">
                  {details?.intFormedYear || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Country</span>
                <span className="text-sm font-medium">
                  {details?.strCountry || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Teams</span>
                <span className="text-sm font-medium">
                  {standings.length || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {details?.strTrophy && (
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Trophy</h3>
              <div className="relative w-full h-40">
                <Image
                  src={details.strTrophy}
                  alt={`${details.strLeague} trophy`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {standings.length > 0 && (
          <FeaturedTeams
            standings={standings}
            leagueName={details?.strLeague || config?.strLeague || "League"}
          />
        )}
        <LeagueRecentMatches
          leagueId={id}
          leagueName={details?.strLeague || config?.strLeague || "League"}
        />
      </div>

      <LeagueStandings
        leagueId={id}
        initialStandings={standings}
        initialSeason={getCurrentSeason()}
      />
    </div>
  );
}
