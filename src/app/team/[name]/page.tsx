export default async function TeamPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const decodedName = decodeURIComponent(name);

  const response = await fetch(
    `https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=${encodeURIComponent(
      decodedName
    )}`,
    { cache: "force-cache" }
  );

  const data = await response.json();

  console.log(data.teams?.[0]);

  return <div>{name}</div>;
}
