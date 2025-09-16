"use client";

// LIBRARIES
import { useEffect, useState } from "react";
// COMPONENTS
import MatchTable from "@/components/MatchTable";
// SERVICES
import { getLeagueRecentMatches } from "@/services/matches";
// TYPES
import type { LeagueMatches } from "@/types";

interface LeagueRecentMatchesProps {
  leagueId: string;
  leagueName: string;
}

export default function LeagueRecentMatches({
  leagueId,
  leagueName,
}: LeagueRecentMatchesProps) {
  const [matchesData, setMatchesData] = useState<LeagueMatches | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getLeagueRecentMatches(leagueId);
        setMatchesData(data);
      } catch (error) {
        console.error("Error fetching league matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [leagueId]);

  if (loading) {
    return (
      <div className="bg-card rounded-lg border p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Recent Matches</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Latest results from {leagueName}
          </p>
        </div>
        <div className="animate-pulse space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (!matchesData || matchesData.matches.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Recent Matches</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Latest results from {leagueName}
          </p>
        </div>
        <p className="text-muted-foreground text-center py-8">
          No recent matches found for {leagueName}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Recent Matches</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {matchesData.dateRange} from {leagueName}
        </p>
      </div>
      <div className="p-4">
        <MatchTable matches={matchesData.matches} />
      </div>
    </div>
  );
}