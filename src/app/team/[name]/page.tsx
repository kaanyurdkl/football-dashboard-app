// LIBRARIES
import { notFound } from "next/navigation";
// SERVICES
import { getTeam } from "@/services/team";
import Image from "next/image";
import CollapsibleDescription from "@/components/CollapsibleDescription";
import {
  Calendar,
  ExternalLink,
  MapPin,
  Users,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

export default async function TeamPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  const team = await getTeam(decodedName);

  if (!team) {
    notFound();
  }

  console.log(team);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-lg border overflow-hidden">
            {team.strBanner && (
              <div className="relative w-full h-48">
                <Image
                  src={team.strBanner}
                  alt={`${team.strTeam} banner`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                {team.strBadge && (
                  <div className="relative w-16 h-16">
                    <Image
                      src={team.strBadge}
                      alt={`${team.strTeam} badge`}
                      fill
                      className="object-contain"
                      sizes="64px"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-3xl font-bold">{team.strTeam}</h1>
                  {team.strTeamAlternate && (
                    <p className="text-muted-foreground text-lg">
                      {team.strTeamAlternate}
                    </p>
                  )}
                  <p className="text-muted-foreground">
                    {team.strCountry} • {team.strLeague}
                  </p>
                </div>
                <div className="flex grow justify-end self-stretch gap-3 mt-2">
                  {team.strWebsite && (
                    <a
                      href={`https://${team.strWebsite}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                  {team.strFacebook && (
                    <a
                      href={`https://facebook.com/${team.strFacebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  )}
                  {team.strTwitter && (
                    <a
                      href={`https://twitter.com/${team.strTwitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {team.strInstagram && (
                    <a
                      href={`https://instagram.com/${team.strInstagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>

              {team.strDescriptionEN && (
                <CollapsibleDescription
                  description={team.strDescriptionEN}
                  maxLength={400}
                />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Team Information</h2>
            <div className="space-y-4">
              {team.intFormedYear && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Founded
                    </span>
                    <p className="text-sm font-medium">{team.intFormedYear}</p>
                  </div>
                </div>
              )}

              {team.strStadium && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Stadium
                    </span>
                    <p className="text-sm font-medium">{team.strStadium}</p>
                    {team.intStadiumCapacity && (
                      <p className="text-xs text-muted-foreground">
                        Capacity:{" "}
                        {parseInt(team.intStadiumCapacity).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {team.strLocation && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Location
                    </span>
                    <p className="text-sm font-medium">{team.strLocation}</p>
                  </div>
                </div>
              )}

              {team.strSport && (
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">Sport</span>
                    <p className="text-sm font-medium">{team.strSport}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
