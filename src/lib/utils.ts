import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format a Date object to YYYY-MM-DD string
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

//Get the current football season (e.g., "2025-2026")
export const getCurrentSeason = (): string => {
  const now = new Date();
  const torontoDate = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Toronto" })
  );
  const year = torontoDate.getFullYear();
  const month = torontoDate.getMonth();

  // If we're in August or later, it's the new season
  return month >= 7 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
};

// Get yesterday's date formatted as YYYY-MM-DD
export const getYesterdayDate = (): string => {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  return formatDate(yesterday);
};

// Get today's date formatted as YYYY-MM-DD
export const getTodayDate = (): string => {
  return formatDate(new Date());
};
