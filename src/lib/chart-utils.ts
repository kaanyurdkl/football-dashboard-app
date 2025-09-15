interface Player {
  idPlayer: string;
  strPlayer: string;
  strNationality?: string;
  strPosition?: string;
  dateBorn?: string;
  strHeight?: string;
  strWeight?: string;
  strThumb?: string;
  strCutout?: string;
  strDescriptionEN?: string;
}

export interface PositionData {
  position: string;
  count: number;
}

export interface NationalityData {
  nationality: string;
  count: number;
  percentage: number;
}

export function getPositionDistribution(players: Player[]): PositionData[] {
  if (!players.length) return [];

  const positionCounts = players.reduce((acc, player) => {
    const position = player.strPosition || "Unknown";
    acc[position] = (acc[position] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(positionCounts)
    .map(([position, count]) => ({ position, count }))
    .sort((a, b) => b.count - a.count);
}

export function getNationalityDistribution(players: Player[]): NationalityData[] {
  if (!players.length) return [];

  const nationalityCounts = players.reduce((acc, player) => {
    const nationality = player.strNationality || "Unknown";
    acc[nationality] = (acc[nationality] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const total = players.length;

  return Object.entries(nationalityCounts)
    .map(([nationality, count]) => ({
      nationality,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}