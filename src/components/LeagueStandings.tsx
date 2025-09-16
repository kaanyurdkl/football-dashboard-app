"use client";

// LIBRARIES
import { useState, useRef, useEffect } from "react";
import useSWR from "swr";
// COMPONENTS
import Image from "next/image";
import Link from "next/link";
import SeasonSelector from "@/components/SeasonSelector";
// ICONS
import { Info } from "lucide-react";

interface Team {
  idStanding: string;
  idTeam: string;
  intRank: string;
  strTeam: string;
  strBadge: string;
  intPlayed: string;
  intWin: string;
  intDraw: string;
  intLoss: string;
  intGoalsFor: string;
  intGoalsAgainst: string;
  intGoalDifference: string;
  intPoints: string;
  strForm: string;
}

interface LeagueStandingsProps {
  leagueId: string;
  initialStandings: Team[];
  initialSeason?: string;
  highlightTeamId?: string;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
  return data.table || [];
};

export default function LeagueStandings({
  leagueId,
  initialStandings,
  initialSeason = "2025-2026",
  highlightTeamId,
}: LeagueStandingsProps) {
  const [currentSeason, setCurrentSeason] = useState(initialSeason);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);

  const {
    data: standings,
    error,
    isLoading,
  } = useSWR(
    `https://www.thesportsdb.com/api/v1/json/123/lookuptable.php?l=${leagueId}&s=${currentSeason}`,
    fetcher,
    {
      fallbackData:
        currentSeason === initialSeason ? initialStandings : undefined,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      keepPreviousData: true, // Keep previous data while loading new data
    }
  );

  // Save scroll position before season change
  useEffect(() => {
    const saveScrollPosition = () => {
      scrollPositionRef.current = window.scrollY;
    };

    // Save scroll position when component is about to update
    saveScrollPosition();
  }, [currentSeason]);

  // Restore scroll position after data loads
  useEffect(() => {
    if (!isLoading && scrollPositionRef.current > 0) {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        window.scrollTo({
          top: scrollPositionRef.current,
          behavior: "instant",
        });
      });
    }
  }, [isLoading, standings]);

  const handleSeasonChange = (newSeason: string) => {
    // Save current scroll position before changing season
    scrollPositionRef.current = window.scrollY;
    setCurrentSeason(newSeason);
  };

  // Determine what content to show
  const hasStandings = standings && standings.length > 0;
  const showNoData = !hasStandings && !isLoading && !error;

  return (
    <div ref={containerRef} className="bg-card rounded-lg border">
      <div className="p-6 border-b">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">League Standings</h2>
            <p className="text-muted-foreground mt-1">
              {currentSeason.replace("-", "/")} Season
            </p>
          </div>
          <SeasonSelector
            currentSeason={currentSeason}
            onSeasonChange={handleSeasonChange}
            isLoading={isLoading}
          />
        </div>
      </div>
      {error && (
        <div className="p-6 text-center">
          <p className="text-muted-foreground">
            Failed to load standings for {currentSeason.replace("-", "/")}{" "}
            season.
          </p>
        </div>
      )}
      {showNoData && (
        <div className="p-6 text-center">
          <p className="text-muted-foreground">
            No standings data available for this season.
          </p>
        </div>
      )}
      {hasStandings && !error && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 text-sm font-semibold">Pos</th>
                <th className="text-left p-4 text-sm font-semibold">Team</th>
                <th className="text-center p-4 text-sm font-semibold">P</th>
                <th className="text-center p-4 text-sm font-semibold">W</th>
                <th className="text-center p-4 text-sm font-semibold">D</th>
                <th className="text-center p-4 text-sm font-semibold">L</th>
                <th className="text-center p-4 text-sm font-semibold">GF</th>
                <th className="text-center p-4 text-sm font-semibold">GA</th>
                <th className="text-center p-4 text-sm font-semibold">GD</th>
                <th className="text-center p-4 text-sm font-semibold">Pts</th>
                <th className="text-center p-4 text-sm font-semibold">Form</th>
              </tr>
            </thead>
            <tbody className={isLoading ? "opacity-50" : ""}>
              {standings.map((team: Team) => {
                const isHighlighted =
                  highlightTeamId && team.idTeam === highlightTeamId;
                return (
                  <tr
                    key={team.idStanding}
                    className={`border-b hover:bg-muted/50 ${
                      isHighlighted
                        ? "bg-primary/10 border-primary/20 ring-1 ring-primary/20"
                        : ""
                    }`}
                  >
                    <td className="p-4 text-sm font-medium">{team.intRank}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {team.strBadge && (
                          <div className="relative w-6 h-6">
                            <Image
                              src={team.strBadge}
                              alt={`${team.strTeam} badge`}
                              fill
                              className="object-contain"
                              sizes="24px"
                            />
                          </div>
                        )}
                        <Link
                          href={`/team/${encodeURIComponent(team.strTeam)}`}
                          className="text-sm font-medium hover:text-primary hover:underline transition-colors"
                        >
                          {team.strTeam}
                        </Link>
                      </div>
                    </td>
                    <td className="text-center p-4 text-sm">
                      {team.intPlayed}
                    </td>
                    <td className="text-center p-4 text-sm">{team.intWin}</td>
                    <td className="text-center p-4 text-sm">{team.intDraw}</td>
                    <td className="text-center p-4 text-sm">{team.intLoss}</td>
                    <td className="text-center p-4 text-sm">
                      {team.intGoalsFor}
                    </td>
                    <td className="text-center p-4 text-sm">
                      {team.intGoalsAgainst}
                    </td>
                    <td className="text-center p-4 text-sm">
                      {team.intGoalDifference}
                    </td>
                    <td className="text-center p-4 text-sm font-bold">
                      {team.intPoints}
                    </td>
                    <td className="text-center p-4 text-xs font-mono">
                      {team.strForm}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {hasStandings && !error && (
        <div className="px-6 py-4">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Info className="h-3 w-3" />
            Due to API limitations, only the top 5 teams are displayed. Premium
            API access is required for complete league standings.
          </p>
        </div>
      )}
    </div>
  );
}
