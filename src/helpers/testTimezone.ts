/**
 * Test Utility for Timezone Conversion
 * 
 * This file helps verify that UTC timestamps are correctly converted
 * to the user's local timezone and displayed as accurate relative times.
 * 
 * Usage: Import and call testTimezoneConversion() in browser console
 */

import { formatRelativeTime, formatLocalDateTime } from 'helpers/common';

/**
 * Test timezone conversion with various UTC timestamps
 */
export const testTimezoneConversion = () => {
  console.group('🕐 Timezone Conversion Tests');
  
  const now = new Date();
  console.log('Current local time:', now.toLocaleString());
  console.log('Current UTC time:', now.toISOString());
  console.log('Timezone offset:', -now.getTimezoneOffset() / 60, 'hours');
  console.log('---');
  
  // Test cases with different time offsets
  const testCases = [
    {
      label: 'Just now (30 seconds ago)',
      timestamp: new Date(Date.now() - 30 * 1000).toISOString(),
      expected: 'now',
    },
    {
      label: '2 minutes ago',
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      expected: '2m ago',
    },
    {
      label: '45 minutes ago',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      expected: '45m ago',
    },
    {
      label: '2 hours ago',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      expected: '2h ago',
    },
    {
      label: '5 hours ago',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      expected: '5h ago',
    },
    {
      label: '1 day ago',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      expected: '1d ago',
    },
    {
      label: '3 days ago',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      expected: '3d ago',
    },
  ];
  
  // Test with Z suffix (explicit UTC)
  console.group('✅ Timestamps with Z suffix (explicit UTC)');
  testCases.forEach(({ label, timestamp, expected }) => {
    const result = formatRelativeTime(timestamp);
    const localTime = formatLocalDateTime(timestamp);
    const passed = result === expected;
    
    console.log(
      `${passed ? '✅' : '❌'} ${label}`,
      '\n  UTC:', timestamp,
      '\n  Local:', localTime,
      '\n  Relative:', result,
      '\n  Expected:', expected
    );
  });
  console.groupEnd();
  
  // Test without Z suffix (implicit UTC - our fix handles this)
  console.group('✅ Timestamps without Z suffix (implicit UTC)');
  testCases.forEach(({ label, timestamp, expected }) => {
    const timestampWithoutZ = timestamp.replace('Z', '');
    const result = formatRelativeTime(timestampWithoutZ);
    const localTime = formatLocalDateTime(timestampWithoutZ);
    const passed = result === expected;
    
    console.log(
      `${passed ? '✅' : '❌'} ${label} (no Z)`,
      '\n  UTC:', timestampWithoutZ,
      '\n  Local:', localTime,
      '\n  Relative:', result,
      '\n  Expected:', expected
    );
  });
  console.groupEnd();
  
  // Test edge cases
  console.group('🔍 Edge Cases');
  
  // Future timestamp (should handle gracefully)
  const futureTimestamp = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  console.log('Future timestamp:', formatRelativeTime(futureTimestamp));
  
  // Invalid timestamp
  console.log('Invalid timestamp:', formatRelativeTime('invalid-date'));
  
  // Different formats
  const dateOnly = '2026-01-09';
  console.log('Date only format:', formatRelativeTime(dateOnly));
  
  console.groupEnd();
  
  console.groupEnd();
  
  return {
    status: 'Tests completed',
    note: 'Check console output above for detailed results',
  };
};

/**
 * Simulate a last win API response and test the conversion
 */
export const testLastWinTimestamp = (utcTimestamp?: string) => {
  const timestamp = utcTimestamp || new Date(Date.now() - 2 * 60 * 1000).toISOString();
  
  console.group('🎰 Last Win Timestamp Test');
  console.log('Simulating API response with UTC timestamp:', timestamp);
  
  const mockApiResponse = {
    gameName: 'Defender',
    betId: 'test-bet-123',
    gameId: 'ne-games-defender',
    amount: 150.50,
    currency: 'USDT',
    timestamp: timestamp,
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
  };
  
  console.log('API Response:', mockApiResponse);
  
  const relativeTime = formatRelativeTime(timestamp);
  const localTime = formatLocalDateTime(timestamp);
  
  console.log('---');
  console.log('Converted to relative time:', relativeTime);
  console.log('Converted to local time:', localTime);
  console.log('---');
  console.log('Expected: Should show accurate relative time based on your timezone');
  console.groupEnd();
  
  return {
    utcTimestamp: timestamp,
    relativeTime,
    localTime,
  };
};

/**
 * Compare with transaction timestamps (which work correctly)
 */
export const compareWithTransactions = () => {
  const utcTimestamp = new Date(Date.now() - 5 * 60 * 1000).toISOString();
  
  console.group('⚖️ Comparison: Last Wins vs Transactions');
  
  // Last Wins conversion
  const lastWinRelative = formatRelativeTime(utcTimestamp);
  const lastWinLocal = formatLocalDateTime(utcTimestamp);
  
  // Transaction conversion (how transactions do it)
  const date = new Date(utcTimestamp);
  const transactionLocal = {
    day: date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    time: date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    })
  };
  
  console.log('UTC Timestamp:', utcTimestamp);
  console.log('---');
  console.log('Last Wins Display:');
  console.log('  Relative:', lastWinRelative);
  console.log('  Full:', lastWinLocal);
  console.log('---');
  console.log('Transaction Display:');
  console.log('  Day:', transactionLocal.day);
  console.log('  Time:', transactionLocal.time);
  console.log('---');
  console.log('✅ Both should show the same local time');
  
  console.groupEnd();
};

// Export all test functions
export default {
  testTimezoneConversion,
  testLastWinTimestamp,
  compareWithTransactions,
};
