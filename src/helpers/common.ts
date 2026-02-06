import { Fixture } from 'api/SportsHomePage/sportsHomePage.types';
import { getRebetApi } from 'store/SportsHomePage/slice';
import { z } from 'zod';

const xApiKey = import.meta.env.VITE_X_Api_Key;
const xClientId = import.meta.env.VITE_X_Client_Id;


export const sleep = async (ms: number) =>
  new Promise<void>((resolve) => {
    const id = setTimeout(() => {
      resolve();
      clearTimeout(id);
    }, ms);
  });

export const passwordSchema = z
  .string({ required_error: 'Password is required' })
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must have at least one uppercase letter')
  .regex(/\d/, 'Password must have at least one number')
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    'Password must have at least one special character',
  );

export const isValidValue = <T extends Record<string, unknown>>(
  obj: T,
  value: any,
): value is T[keyof T] => {
  return Object.values(obj).includes(value);
};

export const replaceString = (
  str: string,
  pattern: RegExp,
  replacement: string,
): string => {
  return str.replace(pattern, replacement);
};

export const cleanUrlSegment = (url: string): string => {

  if (url === "/" || url === "/home") {
    return 'home'
  }
  const lastSegment = url.split('/').filter(Boolean).pop();

  if (!lastSegment) return '';

  return replaceString(lastSegment, /-/g, ' ');
};

export const setScrollBarWidth = () => {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.overflow = 'scroll';

  document.body.appendChild(outer);

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;

  document.body.removeChild(outer);

  document.body.style.setProperty(
    '--scrollbar-width',
    `${100 - widthWithScroll}px`,
  );
};

export const getTimefromMatch = (
  fixtureStatusName: string,
  fixtureStartDate: string,
  fixtureDateType?: string
) => {
  const startDate = new Date(fixtureStartDate);
  const now = new Date();

  const datePart = startDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });

  const hours = startDate.getHours().toString().padStart(2, '0');
  const minutes = startDate.getMinutes().toString().padStart(2, '0');
  const timePart = `${hours}:${minutes}`;

  if (fixtureStatusName === "Prematch") {
    const isToday =
      startDate.getDate() === now.getDate() &&
      startDate.getMonth() === now.getMonth() &&
      startDate.getFullYear() === now.getFullYear();

    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );

    const isTomorrow =
      startDate.getDate() === tomorrow.getDate() &&
      startDate.getMonth() === tomorrow.getMonth() &&
      startDate.getFullYear() === tomorrow.getFullYear();

    if (isToday) return `Today, ${timePart}`;
    if (isTomorrow) return `Tomorrow, ${timePart}`;
    if (fixtureDateType && fixtureDateType === "notime") {
      return `${datePart}`;
    }
    return `${datePart} ${timePart}`;
  }

  if (fixtureStatusName === "Live") return `${timePart}`;
  if (fixtureStatusName === "Finished") return "FT";
  return `${datePart} ${timePart}`;
};

export const getIcons = (leagueName: string, logoName: string, size?: string) => {
  switch (leagueName) {
    case "leagueName": return `SB-leagueImg SB-img__${logoName?.replaceAll(" ", '-').toLowerCase()} ${size ?? ""}`
    case "homeName": return `SB-teamImg SB-home SB-img__${logoName?.replaceAll(" ", '-').toLowerCase()} ${size ?? ""}`
    case "awayName": return `SB-teamImg SB-away SB-img__${logoName?.replaceAll(" ", '-').toLowerCase()} ${size ?? ""}`
    case "country": return `SB-flag ${logoName?.replaceAll(" ", '-').toLowerCase()} ${size ?? ""}`
    default: return size ?? ""
  }
}

export const getFormattedTotalCount = (data: Fixture): { total: number; formatted: string } => {
  const total = data?.markets?.reduce((total, market) =>
    total +
    (market?.selections
      ? market.selections.reduce(
        (selTotal, selection) => selTotal + (selection?.betCount || 0),
        0
      )
      : 0),
    0
  ) || 0;

  let formatted = "";
  if (total < 1000) formatted = total.toString();
  else if (total < 1_000_000) formatted = (total / 1000).toFixed(total % 1000 === 0 ? 0 : 1) + "k";
  else if (total < 1_000_000_000) formatted = (total / 1_000_000).toFixed(total % 1_000_000 === 0 ? 0 : 1) + "M";
  else formatted = (total / 1_000_000_000).toFixed(total % 1_000_000_000 === 0 ? 0 : 1) + "B";

  return { total, formatted };
};

export const formatPlacedDateTime = (dateString: string) => {
  if (!dateString) return { date: '', time: '' };
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const time = date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });
  return {
    date: `${day} ${month}`,
    time: time
  };
};

export const getChannelType = () => {
  const isMobile = /mobile/i.test(navigator.userAgent);
  return isMobile ? "Mobile" : "Internet";
};


export const updateFixturesInLocalStorage = (rebetResponse: any) => {
  try {
    const newFixtures = rebetResponse?.competitions?.fixtures || [];
    if (newFixtures.length === 0) return;

    const existingFixtures = JSON.parse(localStorage.getItem('betSlipData') || '[]');
    let updatedFixtures = [...existingFixtures];

    newFixtures.forEach((newFixture: any) => {
      const existingIndex = updatedFixtures.findIndex(
        (existing: any) => existing.providerFixtureId === newFixture.providerFixtureId
      );
      if (existingIndex !== -1) {
        updatedFixtures[existingIndex] = newFixture;
      } else {
        updatedFixtures.push(newFixture);
      }
    });
    localStorage.setItem('betSlipData', JSON.stringify(updatedFixtures));

    window.dispatchEvent(new CustomEvent("betSlip_updated"));
    window.dispatchEvent(new CustomEvent("switch_to_betslip_tab"));

    return newFixtures.length;
  } catch (error) {
    console.error('Error updating fixtures in localStorage:', error);
    return 0;
  }
};

export const handleRebet = (ids: string[], dispatch: any) => {
  dispatch(getRebetApi({
    'X-Client-Id': xClientId,
    'X-Api-Key': xApiKey,
    'X-Language-Code': 'en',
    selectionId: ids,
  })).then((response: any) => {
    if (response.payload) {
      updateFixturesInLocalStorage(response.payload);
    }
  }).catch((error: any) => {
    console.error('Rebet failed:', error);
  });
}

export function addZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

export function getDateRange(filter: string): { fromDate: string; toDate: string } {
  const todayDate = new Date();
  let fromDate = '';
  let toDate = '';
  toDate = todayDate.getFullYear() + '-' + addZero(todayDate.getMonth() + 1) + '-' + addZero(todayDate.getDate()) + 'T' + addZero(todayDate.getHours()) + ':' + addZero(todayDate.getMinutes()) + ':' + addZero(todayDate.getSeconds()) + 'Z';
  if (filter === 'Yesterday') {
    const prev = new Date(todayDate);
    prev.setDate(todayDate.getDate() - 1);
    fromDate = prev.getFullYear() + '-' + addZero(prev.getMonth() + 1) + '-' + addZero(prev.getDate()) + 'T00:00:00Z';
  } else if (filter === 'This Week') {
    const prev = new Date(todayDate);
    prev.setDate(todayDate.getDate() - 7);
    fromDate = prev.getFullYear() + '-' + addZero(prev.getMonth() + 1) + '-' + addZero(prev.getDate()) + 'T00:00:00Z';
  } else if (filter === 'This Month') {
    const prev = new Date(todayDate);
    prev.setMonth(todayDate.getMonth() - 1);
    fromDate = prev.getFullYear() + '-' + addZero(prev.getMonth() + 1) + '-' + addZero(prev.getDate()) + 'T00:00:00Z';
  } else {
    fromDate = todayDate.getFullYear() + '-' + addZero(todayDate.getMonth() + 1) + '-' + addZero(todayDate.getDate()) + 'T00:00:00Z';
  }
  return { fromDate, toDate };
}

/**
 * Converts UTC timestamp to user's local timezone and returns relative time
 * Uses date-fns for accurate timezone-aware calculations
 * @param timestamp - UTC timestamp string (with or without 'Z' suffix)
 * @returns Formatted relative time string (e.g., "Just now", "2m ago", "5h ago")
 */
export const formatRelativeTime = (timestamp: string): string => {
  try {
    // Ensure timestamp is treated as UTC
    let utcTimestamp = timestamp;
    if (!timestamp.endsWith('Z') && !timestamp.includes('+') && timestamp.includes('T')) {
      utcTimestamp = `${timestamp}Z`;
    }
    
    // Parse the UTC timestamp - this automatically converts to local timezone
    const date = new Date(utcTimestamp);
    
    // Validate the date
    if (isNaN(date.getTime())) {
      console.error('Invalid timestamp:', timestamp);
      return timestamp;
    }
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    
    // Handle future dates (shouldn't happen but just in case)
    if (diffMs < 0) {
      return 'Just now';
    }
    
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // More granular time display
    if (diffSeconds < 30) {
      return 'Just now';
    } else if (diffSeconds < 60) {
      return 'Just now';
    } else if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  } catch (error) {
    console.error('Error formatting relative time:', error, 'for timestamp:', timestamp);
    return timestamp;
  }
};

/**
 * Converts UTC timestamp to user's local timezone and returns formatted date/time
 * Automatically converts from UTC to browser's local timezone
 * @param timestamp - UTC timestamp string
 * @param options - Intl.DateTimeFormatOptions for customizing output
 * @returns Formatted date string in user's local timezone
 */
export const formatLocalDateTime = (
  timestamp: string,
  options?: Intl.DateTimeFormatOptions
): string => {
  try {
    // Ensure timestamp is treated as UTC
    let utcTimestamp = timestamp;
    if (!timestamp.endsWith('Z') && !timestamp.includes('+') && timestamp.includes('T')) {
      utcTimestamp = `${timestamp}Z`;
    }
    
    const date = new Date(utcTimestamp);
    
    // Validate the date
    if (isNaN(date.getTime())) {
      console.error('Invalid timestamp for local formatting:', timestamp);
      return timestamp;
    }
    
    const defaultOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      ...options,
    };
    
    // This will automatically display in the user's local timezone
    return new Intl.DateTimeFormat('en-GB', defaultOptions).format(date);
  } catch (error) {
    console.error('Error formatting local date time:', error, 'for timestamp:', timestamp);
    return timestamp;
  }
};