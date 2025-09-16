"use client";

// LIBRARIES
import Link from "next/link";
import Image from "next/image";
// TYPES
import type { LeagueStanding } from "@/types";

interface FeaturedTeamsProps {
  standings: LeagueStanding[];
  leagueName: string;
}

export default function FeaturedTeams({
  standings,
  leagueName,
}: FeaturedTeamsProps) {
  const featuredTeams = standings.slice(0, 3);

  if (featuredTeams.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-6">Top Teams</h2>
        <p className="text-muted-foreground text-sm">
          No standings data available for {leagueName}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card text-center rounded-lg border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Top Teams</h2>
        <p className="text-sm text-muted-foreground mt-1">
          See details for each top team
        </p>
      </div>
      <div className="flex justify-center gap-4">
        {featuredTeams.map((team) => (
          <Link
            key={team.idTeam}
            href={`/team/${encodeURIComponent(team.strTeam)}`}
            className="flex flex-col items-center p-3 rounded-lg hover:bg-muted/50 transition-colors group flex-1 max-w-48"
          >
            <div className="relative mb-2">
              {team.strBadge && (
                <div className="relative w-16 h-16 group-hover:scale-105 transition-transform">
                  <Image
                    src={team.strBadge}
                    alt={`${team.strTeam} logo`}
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
              )}
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                {team.intRank}
              </div>
            </div>
            <span className="text-sm font-medium text-center leading-tight">
              {team.strTeam}
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              {team.intPoints} pts
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
