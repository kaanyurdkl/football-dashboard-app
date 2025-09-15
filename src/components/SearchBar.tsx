"use client";

// LIBRARIES
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
// COMPONENTS
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// SERVICES
import { performSearch } from "@/services/search";
// TYPES
import type { SearchType, SearchTeamResult, SearchLeagueResult } from "@/types";
// ICONS
import { Search, Loader2 } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("teams");
  const [results, setResults] = useState<{
    teams?: SearchTeamResult[];
    leagues?: SearchLeagueResult[];
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const router = useRouter();

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.length >= (searchType === "teams" ? 3 : 2)) {
      debounceRef.current = setTimeout(async () => {
        setIsLoading(true);
        try {
          const searchResults = await performSearch(query, searchType);
          setResults(searchResults);
          setShowResults(true);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsLoading(false);
        }
      }, 500);
    } else {
      setResults({});
      setShowResults(false);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, searchType]);

  const handleResultClick = (result: SearchTeamResult | SearchLeagueResult) => {
    if (searchType === "teams") {
      router.push(
        `/team/${encodeURIComponent((result as SearchTeamResult).strTeam)}`
      );
    } else {
      router.push(`/league/${(result as SearchLeagueResult).idLeague}`);
    }
    setQuery("");
    setShowResults(false);
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative flex gap-2">
      <Select
        value={searchType}
        onValueChange={(value: SearchType) => setSearchType(value)}
      >
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="teams">Search by Teams</SelectItem>
          <SelectItem value="leagues">Search by Leagues</SelectItem>
        </SelectContent>
      </Select>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={`Search ${searchType}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 w-full"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
        {showResults && query.length >= (searchType === "teams" ? 3 : 2) && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
            {searchType === "teams" && results.teams?.length ? (
              results.teams.map((team) => (
                <button
                  key={team.idTeam}
                  onClick={() => handleResultClick(team)}
                  className="w-full px-3 py-2 text-left hover:bg-muted flex items-center gap-3 border-b last:border-b-0"
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm">{team.strTeam}</div>
                    {team.strLeague && (
                      <div className="text-xs text-muted-foreground">
                        {team.strLeague}
                      </div>
                    )}
                  </div>
                </button>
              ))
            ) : searchType === "leagues" && results.leagues?.length ? (
              results.leagues.map((league) => (
                <button
                  key={league.idLeague}
                  onClick={() => handleResultClick(league)}
                  className="w-full px-3 py-2 text-left hover:bg-muted flex items-center gap-3 border-b last:border-b-0"
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm">
                      {league.strLeague}
                    </div>
                  </div>
                </button>
              ))
            ) : !isLoading ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                No {searchType} found
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
