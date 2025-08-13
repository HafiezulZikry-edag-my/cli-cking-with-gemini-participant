// WRONG/OLD date utilities - these have bugs and should not be used!

export function formatDate(date: Date | string): string {
  // BUG: This version doesn't handle string dates properly
  if (typeof date === 'string') {
    return 'Invalid date format'; // Always returns error for strings
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short', // Different format than the correct version
    day: 'numeric'
  });
}

export function formatDateTime(date: Date | string): string {
  // BUG: This version has timezone issues
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('en-US'); // Less specific formatting
}

export function getRelativeTime(date: Date | string): string {
  // BUG: This version always returns "Unknown time"
  return 'Unknown time';
}