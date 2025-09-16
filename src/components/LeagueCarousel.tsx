"use client";

// LIBRARIES
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
// COMPONENTS
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// ICONS
import { ArrowRight } from "lucide-react";

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

interface LeagueCarouselProps {
  leagues: League[] | null;
  teamsByLeague: Record<string, Team[]> | null;
}

export default function LeagueCarousel({
  leagues,
  teamsByLeague,
}: LeagueCarouselProps) {
  const plugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
    })
  );

  if (!leagues) {
    return <p className="text-muted-foreground">Loading leagues...</p>;
  }

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-full"
    >
      <CarouselContent>
        {leagues.map((league, index) => (
          <CarouselItem key={index}>
            <div className="bg-card rounded-lg border overflow-hidden">
              {league.strBanner && (
                <div className="relative w-full h-32">
                  <Image
                    src={league.strBanner}
                    alt={`${league.strLeague} banner`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3 items-center">
                  {league.strBadge && (
                    <div className="relative w-8 h-8 flex-shrink-0">
                      <Image
                        src={league.strBadge}
                        alt={`${league.strLeague} logo`}
                        fill
                        className="object-contain"
                        sizes="32px"
                      />
                    </div>
                  )}
                  <div className="text-left">
                    <h4 className="font-medium text-sm">{league.strLeague}</h4>
                    <p className="text-xs text-muted-foreground">
                      {league.strCountry}
                    </p>
                  </div>
                </div>
                {teamsByLeague && teamsByLeague[league.idLeague] && (
                  <div className="flex items-center gap-2">
                    {teamsByLeague[league.idLeague]
                      .filter((team) => team.strTeamBadge)
                      .slice(0, 4)
                      .map((team, teamIndex) => (
                        <div
                          key={teamIndex}
                          className="relative w-8 h-8 flex-shrink-0"
                        >
                          <Image
                            src={team.strTeamBadge}
                            alt={`${team.strTeam} logo`}
                            fill
                            className="object-contain"
                            sizes="32px"
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/league/${league.idLeague}`}>
                    View League
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 cursor-pointer -translate-y-1/2" />
      <CarouselNext className="absolute right-4 top-1/2 cursor-pointer -translate-y-1/2" />
    </Carousel>
  );
}
