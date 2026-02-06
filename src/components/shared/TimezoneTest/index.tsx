/**
 * Timezone Testing Component
 * 
 * Temporary component for testing timezone conversion in the browser.
 * Add this to any page during development to verify the fix works correctly.
 * 
 * Usage:
 * 1. Import: import TimezoneTest from 'components/shared/TimezoneTest';
 * 2. Add to any page: <TimezoneTest />
 * 3. Open browser console to see test results
 */

import { useEffect, useState } from 'react';
import { formatRelativeTime, formatLocalDateTime } from 'helpers/common';

interface TestResult {
  label: string;
  utcTimestamp: string;
  relativeTime: string;
  localTime: string;
  expected: string;
  passed: boolean;
}

export default function TimezoneTest() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Run tests on mount
    const now = Date.now();
    const tests = [
      { label: 'Just now', offset: 30 * 1000, expected: 'now' },
      { label: '2 minutes ago', offset: 2 * 60 * 1000, expected: '2m ago' },
      { label: '30 minutes ago', offset: 30 * 60 * 1000, expected: '30m ago' },
      { label: '2 hours ago', offset: 2 * 60 * 60 * 1000, expected: '2h ago' },
      { label: '5 hours ago', offset: 5 * 60 * 60 * 1000, expected: '5h ago' },
      { label: '1 day ago', offset: 24 * 60 * 60 * 1000, expected: '1d ago' },
    ];

    const results = tests.map(({ label, offset, expected }) => {
      const utcTimestamp = new Date(now - offset).toISOString();
      const relativeTime = formatRelativeTime(utcTimestamp);
      const localTime = formatLocalDateTime(utcTimestamp);
      const passed = relativeTime === expected;

      return {
        label,
        utcTimestamp,
        relativeTime,
        localTime,
        expected,
        passed,
      };
    });

    setTestResults(results);

    // Update current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timezoneOffset = -currentTime.getTimezoneOffset() / 60;
  const allPassed = testResults.every((r) => r.passed);

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md bg-base-800 border border-primary-1 rounded-lg p-4 shadow-xl max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-primary-1">
          🕐 Timezone Conversion Test
        </h3>
        <div className={`px-2 py-1 rounded text-xs font-bold ${allPassed ? 'bg-status-success text-black' : 'bg-status-error-100 text-white'}`}>
          {allPassed ? '✅ ALL PASSED' : '❌ FAILED'}
        </div>
      </div>

      <div className="space-y-2 text-xs mb-4">
        <div className="flex justify-between">
          <span className="text-text-secondary">Local Time:</span>
          <span className="text-text-primary font-mono">
            {currentTime.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">UTC Time:</span>
          <span className="text-text-primary font-mono">
            {currentTime.toISOString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Timezone:</span>
          <span className="text-text-primary font-mono">
            UTC{timezoneOffset >= 0 ? '+' : ''}{timezoneOffset}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {testResults.map((result, index) => (
          <div
            key={index}
            className={`p-2 rounded border ${result.passed ? 'border-status-success/30 bg-status-success/5' : 'border-status-error-100/30 bg-status-error-100/5'}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-text-primary text-xs">
                {result.label}
              </span>
              <span className="text-xs">
                {result.passed ? '✅' : '❌'}
              </span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-text-secondary">Result:</span>
                <span className="text-text-primary font-mono">
                  {result.relativeTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Expected:</span>
                <span className="text-text-tertiary font-mono">
                  {result.expected}
                </span>
              </div>
              <div className="text-text-secondary truncate">
                Local: {result.localTime}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-2 bg-primary-1/10 rounded text-xs text-text-secondary">
        <p className="mb-1">
          <strong>How to test:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-xs">
          <li>Place a bet on any game</li>
          <li>Check Last Wins section immediately</li>
          <li>Should show "now" or accurate time</li>
          <li>Compare with wallet transactions</li>
        </ol>
      </div>

      <div className="mt-3 text-xs text-text-tertiary text-center">
        Remove this component in production
      </div>
    </div>
  );
}
