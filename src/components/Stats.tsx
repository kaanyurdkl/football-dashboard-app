export default function Stats() {
  const statsCards = [
    {
      title: "Featured Leagues",
      description: "Major European leagues",
    },
    {
      title: "Featured Teams",
      description: "Across 4 major leagues",
    },
    {
      title: "Today's Matches",
      description: "From featured leagues",
    },
    {
      title: "Stadiums",
      description: "Iconic venues",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Stats</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card) => (
          <div key={card.title} className="bg-card rounded-lg border p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              {card.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
