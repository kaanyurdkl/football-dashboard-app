"use client";

// LIBRARIES
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
// COMPONENTS
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface League {
  idLeague: string;
  strLeague: string;
  strCountry: string;
  strBanner?: string;
  strBadge?: string;
}

interface LeagueCarouselProps {
  leagues: League[] | null;
}

export default function LeagueCarousel({ leagues }: LeagueCarouselProps) {
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
            <div className="p-6 flex flex-col gap-4 lg:flex-row">
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
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 cursor-pointer -translate-y-1/2" />
      <CarouselNext className="absolute right-4 top-1/2 cursor-pointer -translate-y-1/2" />
    </Carousel>
  );
}
