// LIBRARIES
import { notFound } from "next/navigation";
// SERVICES
import { getTeam } from "@/services/team";

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

  return <div>{team.strTeam}</div>;
}
