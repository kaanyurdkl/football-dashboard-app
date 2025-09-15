import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format a Date object to YYYY-MM-DD string
export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

//Get the current football season (e.g., "2025-2026")
export const getCurrentSeason = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // If we're in August or later, it's the new season
  return month >= 7 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
};

// Get yesterday's date formatted as YYYY-MM-DD
export const getYesterdayDate = (): string => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return formatDate(yesterday);
};

// Get today's date formatted as YYYY-MM-DD
export const getTodayDate = (): string => {
  return formatDate(new Date());
};
