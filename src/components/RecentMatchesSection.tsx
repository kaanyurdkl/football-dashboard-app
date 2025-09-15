import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchTable from "@/components/MatchTable";
import Image from "next/image";
interface Match {
  strEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string;
  intAwayScore: string;
  dateEvent: string;
  strLeague: string;
}

interface LeagueMatches {
  leagueName: string;
  leagueBadge?: string;
  matches: Match[];
}

interface RecentMatchesProps {
  recentMatchesByLeague: Record<string, LeagueMatches> | null;
}

export default async function RecentMatchesSection({
  recentMatchesByLeague,
}: RecentMatchesProps) {
  if (!recentMatchesByLeague) {
    return (
      <div className="bg-card rounded-lg border p-6">
        <p className="text-muted-foreground text-center">Loading matches...</p>
      </div>
    );
  }

  const leagueKeys = Object.keys(recentMatchesByLeague);

  if (leagueKeys.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-6">
        <p className="text-muted-foreground text-center">
          No recent matches found
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Latest Matches</h3>
      <div className="bg-card rounded-lg border">
        <Tabs defaultValue={leagueKeys[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            {leagueKeys.map((leagueKey) => (
              <TabsTrigger
                key={leagueKey}
                value={leagueKey}
                className="cursor-pointer"
              >
                {recentMatchesByLeague[leagueKey].leagueBadge ? (
                  <div className="relative w-8 h-8">
                    <Image
                      src={recentMatchesByLeague[leagueKey].leagueBadge!}
                      alt={recentMatchesByLeague[leagueKey].leagueName}
                      fill
                      className="object-contain"
                      sizes="32px"
                    />
                  </div>
                ) : (
                  <span className="text-xs">
                    {
                      recentMatchesByLeague[leagueKey].leagueName
                        .split(" ")
                        .slice(-1)[0]
                    }
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {leagueKeys.map((leagueKey) => (
            <TabsContent key={leagueKey} value={leagueKey} className="mt-0">
              <div className="p-4 border-b">
                <h4 className="text-sm font-medium">
                  {recentMatchesByLeague[leagueKey].leagueName}
                </h4>
              </div>
              <MatchTable matches={recentMatchesByLeague[leagueKey].matches} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
