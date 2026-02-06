import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';

/**
 * Parses a UTC timestamp string and returns a Date object in the user's local timezone
 * Ensures proper handling of timestamps with or without 'Z' suffix
 * @param timestamp - UTC timestamp string
 * @returns Date object representing the timestamp in local timezone
 */
export const parseUTCTimestamp = (timestamp: string): Date => {
  // Ensure timestamp is treated as UTC
  let utcTimestamp = timestamp;
  if (!timestamp.endsWith('Z') && !timestamp.includes('+') && timestamp.includes('T')) {
    utcTimestamp = `${timestamp}Z`;
  }
  return new Date(utcTimestamp);
};

export const formatTransactionsDateToRender = (rawDate: {
  day: string;
  time: string;
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { screenWidth } = useBreakpoint();
  const isLargeScreen = screenWidth >= BREAKPOINTS.xl;

  return isLargeScreen ? `${rawDate.day}, ${rawDate.time}` : rawDate.day;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};
