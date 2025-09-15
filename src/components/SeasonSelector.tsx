"use client";

// COMPONENTS
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AVAILABLE_SEASONS = [
  { value: "2025-2026", label: "2025-26" },
  { value: "2024-2025", label: "2024-25" },
  { value: "2023-2024", label: "2023-24" },
  { value: "2022-2023", label: "2022-23" },
  { value: "2021-2022", label: "2021-22" },
];

interface SeasonSelectorProps {
  currentSeason: string;
  onSeasonChange: (season: string) => void;
  isLoading?: boolean;
}

export default function SeasonSelector({
  currentSeason,
  onSeasonChange,
  isLoading = false,
}: SeasonSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Season:</span>
      <Select
        value={currentSeason}
        onValueChange={onSeasonChange}
        disabled={isLoading}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Select season" />
        </SelectTrigger>
        <SelectContent>
          {AVAILABLE_SEASONS.map((season) => (
            <SelectItem key={season.value} value={season.value}>
              {season.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isLoading && (
        <span className="text-xs text-muted-foreground">Loading...</span>
      )}
    </div>
  );
}
