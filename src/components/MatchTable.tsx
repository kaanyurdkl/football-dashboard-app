// COMPONENTS
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// TYPES
import type { Match } from "@/types";

interface MatchTableProps {
  matches: Match[];
}

export default function MatchTable({ matches }: MatchTableProps) {
  if (matches.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground text-sm">No recent matches</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs">Match</TableHead>
          <TableHead className="text-xs text-center">Score</TableHead>
          <TableHead className="text-xs text-center">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matches.map((match, index) => (
          <TableRow key={index}>
            <TableCell className="text-xs">
              <div className="space-y-1">
                <div className="font-medium">
                  {match.strHomeTeam} vs {match.strAwayTeam}
                </div>
              </div>
            </TableCell>
            <TableCell className="text-xs text-center">
              <div className="font-medium">
                {match.intHomeScore !== null && match.intAwayScore !== null
                  ? `${match.intHomeScore}-${match.intAwayScore}`
                  : "TBD"}
              </div>
            </TableCell>
            <TableCell className="text-xs text-center">
              <div className="text-muted-foreground">
                {new Date(match.dateEvent).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
