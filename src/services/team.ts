interface TeamDetails {
  idTeam: string;
  strTeam: string;
  strAlternate?: string;
  strTeamAlternate?: string;
  intFormedYear?: string;
  strSport: string;
  strLeague: string;
  strDivision?: string;
  strStadium?: string;
  strStadiumThumb?: string;
  strStadiumDescription?: string;
  strStadiumLocation?: string;
  strLocation?: string;
  strWebsite?: string;
  strFacebook?: string;
  strTwitter?: string;
  strInstagram?: string;
  strYoutube?: string;
  strTeamBadge?: string;
  strBadge?: string;
  strTeamBanner?: string;
  strBanner?: string;
  strTeamLogo?: string;
  strDescriptionEN?: string;
  strCountry?: string;
  strGender?: string;
  intStadiumCapacity?: string;
}

// Utility functions
const handleApiError = (context: string, error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.error(`${context} error:`, message);
};

const fetchWithValidation = async (url: string, context: string) => {
  const response = await fetch(url, { cache: "force-cache" });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${context}`);
  }
  return response.json();
};

// Get team details by name
export async function getTeam(teamName: string): Promise<TeamDetails | null> {
  try {
    const data = await fetchWithValidation(
      `https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=${encodeURIComponent(
        teamName
      )}`,
      `Team search for "${teamName}"`
    );

    return data.teams?.[0] || null;
  } catch (error) {
    handleApiError(`getTeam("${teamName}")`, error);
    return null;
  }
}
