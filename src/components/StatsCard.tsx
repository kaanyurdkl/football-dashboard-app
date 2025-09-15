interface StatsCardProps {
  title: string;
  value: number | null;
  description: string;
}

export default function StatsCard({
  title,
  value,
  description,
}: StatsCardProps) {
  return (
    <div key={title} className="bg-card rounded-lg border p-6">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  );
}
