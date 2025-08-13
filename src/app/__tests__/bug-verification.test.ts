/**
 * Comprehensive Bug Verification Tests
 * 
 * Tests ALL bugs in the consolidated dashboard:
 * - 16+ security vulnerabilities
 * - 10+ performance issues
 * ALL IN ONE LOCATION: /dashboard
 */

import { describe, test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { join } from 'path';

// Helper function to read dashboard source code
const readDashboardSource = (): string => {
  try {
    const fullPath = join(process.cwd(), 'src', 'app', 'dashboard', 'page.tsx');
    return readFileSync(fullPath, 'utf8');
  } catch (error) {
    return '';
  }
};

describe('🚨 SECURITY VULNERABILITIES - Consolidated Dashboard', () => {
  const dashboardSource = readDashboardSource();

  test('Security Bug 1: Should not use vulnerable moment.js (CVE-2022-24785)', () => {
    // BROKEN: moment.js import and usage
    const usesMomentJS = dashboardSource.includes('import moment from \'moment\'') &&
                        dashboardSource.includes('moment(dateString)');
    
    // FIXED: Should use date-fns or native Date API
    const usesSecureDateLib = dashboardSource.includes('date-fns') ||
                             (dashboardSource.includes('new Date(') && !usesMomentJS);
    
    expect(usesMomentJS && !usesSecureDateLib).toBe(false);
  });

  test('Security Bug 2: Should not hardcode sensitive PII data in client code', () => {
    // BROKEN: USERS_DATABASE with SSN, salary, address hardcoded
    const hasHardcodedPII = dashboardSource.includes('USERS_DATABASE') &&
                           dashboardSource.includes('ssn: "123-45-6789"') &&
                           dashboardSource.includes('salary: 75000');
    
    // FIXED: Should fetch from secure API
    const usesSecureAPI = dashboardSource.includes('fetch(\'/api/users\'') ||
                         dashboardSource.includes('getUserData') ||
                         !hasHardcodedPII;
    
    expect(hasHardcodedPII && !usesSecureAPI).toBe(false);
  });

  test('Security Bug 3: Should not expose API keys in client JavaScript', () => {
    // BROKEN: API_KEYS object with credentials
    const hasExposedAPIKeys = dashboardSource.includes('API_KEYS') &&
                             dashboardSource.includes('DATABASE_ADMIN') &&
                             dashboardSource.includes('ENCRYPTION_KEY');
    
    expect(hasExposedAPIKeys).toBe(false);
  });

  test('Security Bug 4: Should not read userId from URL without validation', () => {
    // BROKEN: searchParams.get('userId') used directly
    const hasVulnerablePattern = dashboardSource.includes('searchParams.get(\'userId\')') && 
                                 dashboardSource.includes('setSelectedUserId(parseInt(userIdParam))');
    
    // FIXED: Should have authorization checks
    const hasAuthCheck = dashboardSource.includes('authorize') || 
                        dashboardSource.includes('validateUser') ||
                        dashboardSource.includes('checkPermission');
    
    expect(hasVulnerablePattern && !hasAuthCheck).toBe(false);
  });

  test('Security Bug 5: Should not activate admin mode via URL parameter', () => {
    // BROKEN: adminParam === 'true' sets admin mode
    const hasAdminUrlBug = dashboardSource.includes('adminParam === \'true\'') && 
                           dashboardSource.includes('setAdminMode(true)');
    
    // FIXED: Should require proper authentication
    const hasProperAdminAuth = dashboardSource.includes('authenticateAdmin') ||
                              dashboardSource.includes('verifyAdminToken') ||
                              !hasAdminUrlBug;
    
    expect(hasAdminUrlBug && !hasProperAdminAuth).toBe(false);
  });

  test('Security Bug 6: Should not show all users without authorization', () => {
    // BROKEN: setUsers(USERS_DATABASE) without auth checks
    const hasUnauthorizedDataAccess = dashboardSource.includes('setUsers(USERS_DATABASE)') &&
                                     !dashboardSource.includes('authorizeUserAccess');
    
    expect(hasUnauthorizedDataAccess).toBe(false);
  });

  test('Security Bug 7: Should not put session tokens in URL', () => {
    // BROKEN: Session tokens in URL searchParams
    const hasTokenInUrl = dashboardSource.includes('session_${userId}_${Date.now()}') &&
                         dashboardSource.includes('url.searchParams.set(\'token\'');
    
    // FIXED: Should use secure session management
    const hasSecureSession = dashboardSource.includes('sessionStorage') ||
                            dashboardSource.includes('httpOnly') ||
                            !hasTokenInUrl;
    
    expect(hasTokenInUrl && !hasSecureSession).toBe(false);
  });

  test('Security Bug 8: Should prevent SQL injection in search', () => {
    // BROKEN: String concatenation in SQL-like operations
    const hasSQLInjectionRisk = dashboardSource.includes('SELECT * FROM users WHERE name LIKE \'%${term}%\'');
    
    // FIXED: Should use parameterized queries
    const hasSecureSearch = dashboardSource.includes('parameterized') ||
                           dashboardSource.includes('sanitize') ||
                           !hasSQLInjectionRisk;
    
    expect(hasSQLInjectionRisk && !hasSecureSearch).toBe(false);
  });

  test('Security Bug 9: Should not expose database error messages', () => {
    // BROKEN: Database schema info in error messages
    const hasDBErrorExposure = dashboardSource.includes('Table: users_pii') ||
                               dashboardSource.includes('Columns: ssn, salary');
    
    expect(hasDBErrorExposure).toBe(false);
  });

  test('Security Bug 10: Should not allow user switching without authentication', () => {
    // BROKEN: handleUserSwitch without auth checks
    const hasInsecureUserSwitch = dashboardSource.includes('handleUserSwitch') &&
                                 dashboardSource.includes('setSelectedUserId(userId)') &&
                                 !dashboardSource.includes('authenticateUserSwitch');
    
    expect(hasInsecureUserSwitch).toBe(false);
  });

  test('Security Bug 11: Should not allow client-side admin bypass', () => {
    // BROKEN: Client-side only admin checks
    const hasClientOnlyAdminCheck = dashboardSource.includes('if (!adminMode)') &&
                                   !dashboardSource.includes('verifyAdminToken') &&
                                   !dashboardSource.includes('serverSideAdminCheck');
    
    expect(hasClientOnlyAdminCheck).toBe(false);
  });

  test('Security Bug 12-16: Should implement proper admin authorization for sensitive actions', () => {
    // BROKEN: Admin actions without server-side validation
    const hasInsecureAdminActions = dashboardSource.includes('performAdminAction') &&
                                   dashboardSource.includes('view_salary') &&
                                   dashboardSource.includes('view_ssn') &&
                                   !dashboardSource.includes('serverSideValidation');
    
    expect(hasInsecureAdminActions).toBe(false);
  });
});

describe('🐌 PERFORMANCE ISSUES - Consolidated Dashboard', () => {
  const dashboardSource = readDashboardSource();

  test('Performance Bug 1: Should fix useEffect dependency array', () => {
    // BROKEN: useEffect without dependency array
    const hasMissingDeps = dashboardSource.includes('useEffect(() => {') &&
                          dashboardSource.includes('setLoading(true)') &&
                          dashboardSource.includes('});') &&
                          !dashboardSource.includes('}, [');
    
    expect(hasMissingDeps).toBe(false);
  });

  test('Performance Bug 2: Should use React.memo() to prevent unnecessary re-renders', () => {
    // BROKEN: No React.memo wrapper for dashboard component
    const lacksReactMemo = !dashboardSource.includes('React.memo(') &&
                          !dashboardSource.includes('memo(') &&
                          dashboardSource.includes('export default function DashboardPage');
    
    expect(lacksReactMemo).toBe(false);
  });

  test('Performance Bug 3: Should use useMemo() for expensive filtering calculations', () => {
    // BROKEN: filteredUsers calculated on every render
    const hasExpensiveFiltering = dashboardSource.includes('const filteredUsers = users.filter') &&
                                 !dashboardSource.includes('useMemo');
    
    expect(hasExpensiveFiltering).toBe(false);
  });

  test('Performance Bug 4: Should optimize case-insensitive search operations', () => {
    // BROKEN: Multiple toLowerCase() calls without optimization
    const hasIneffientSearch = dashboardSource.includes('user.name.toLowerCase().includes(searchTerm.toLowerCase())') &&
                              !dashboardSource.includes('useMemo');
    
    expect(hasIneffientSearch).toBe(false);
  });

  test('Performance Bug 5: Should use useMemo() for expensive sorting', () => {
    // BROKEN: sortedUsers calculated on every render
    const hasExpensiveSorting = dashboardSource.includes('const sortedUsers = [...filteredUsers].sort') &&
                               !dashboardSource.includes('useMemo');
    
    expect(hasExpensiveSorting).toBe(false);
  });

  test('Performance Bug 6: Should memoize complex department statistics calculation', () => {
    // BROKEN: departmentStats calculated on every render
    const hasUnmemoizedStats = dashboardSource.includes('const departmentStats = {}') &&
                              dashboardSource.includes('users.forEach(user =>') &&
                              !dashboardSource.includes('useMemo');
    
    expect(hasUnmemoizedStats).toBe(false);
  });

  test('Performance Bug 7: Should use useCallback() for event handlers', () => {
    // BROKEN: handleSearch, handleUserSwitch created on every render
    const lacksCallbackOptimization = (dashboardSource.includes('const handleSearch = useCallback') ||
                                      dashboardSource.includes('const handleUserSwitch = useCallback')) &&
                                     dashboardSource.includes('useCallback') ? false : true;
    
    expect(lacksCallbackOptimization).toBe(false);
  });

  test('Performance Bug 8: Should implement virtualization for large lists', () => {
    // BROKEN: Large list without virtualization
    const lacksVirtualization = dashboardSource.includes('.map((user, index)') &&
                               !dashboardSource.includes('virtualiz') &&
                               !dashboardSource.includes('windowing');
    
    expect(lacksVirtualization).toBe(false);
  });

  test('Performance Bug 9: Should use stable keys for list items', () => {
    // BROKEN: Array index as key
    const usesIndexAsKey = dashboardSource.includes('key={index}') &&
                          dashboardSource.includes('.map((user, index)');
    
    expect(usesIndexAsKey).toBe(false);
  });

  test('Performance Bug 10: Should avoid recalculating stats on every render', () => {
    // BROKEN: Stats calculation in render without memoization
    const hasUnoptimizedStatsRender = dashboardSource.includes('Department Stats (Recalculated on every render)') &&
                                     !dashboardSource.includes('useMemo');
    
    expect(hasUnoptimizedStatsRender).toBe(false);
  });
});

describe('📊 INTEGRATION TESTS - Complete Workshop Verification', () => {
  test('All critical security vulnerabilities should be resolved', () => {
    const dashboardSource = readDashboardSource();
    
    // Count critical security patterns that should be removed
    const criticalVulnerabilities = [
      // Moment.js vulnerability
      dashboardSource.includes('import moment from \'moment\''),
      // Hardcoded sensitive data
      dashboardSource.includes('USERS_DATABASE') && dashboardSource.includes('ssn: "123-45-6789"'),
      // API keys exposed
      dashboardSource.includes('API_KEYS') && dashboardSource.includes('DATABASE_ADMIN'),
      // URL parameter manipulation
      dashboardSource.includes('setSelectedUserId(parseInt(userIdParam))'),
      // SQL injection patterns
      dashboardSource.includes('SELECT * FROM users WHERE name LIKE \'%${term}%\'')
    ];
    
    const remainingVulnerabilities = criticalVulnerabilities.filter(v => v).length;
    expect(remainingVulnerabilities).toBe(0);
  });

  test('All major performance issues should be optimized', () => {
    const dashboardSource = readDashboardSource();
    
    // Count major performance patterns that should be fixed
    const performanceIssues = [
      // Missing React.memo
      !dashboardSource.includes('memo(') && dashboardSource.includes('export default function'),
      // Missing useMemo for expensive calculations
      dashboardSource.includes('const filteredUsers = users.filter') && !dashboardSource.includes('useMemo'),
      // Missing dependency arrays
      dashboardSource.includes('useEffect(() => {') && dashboardSource.includes('});') && !dashboardSource.includes('}, ['),
      // Index as key
      dashboardSource.includes('key={index}'),
      // Unoptimized stats calculation
      dashboardSource.includes('const departmentStats = {}') && !dashboardSource.includes('useMemo')
    ];
    
    const remainingIssues = performanceIssues.filter(issue => issue).length;
    expect(remainingIssues).toBe(0);
  });

  test('Workshop completion status', () => {
    const dashboardSource = readDashboardSource();
    
    // Security fixes - core vulnerabilities resolved
    const securityFixed = !dashboardSource.includes('import moment from \'moment\'') &&
                         (!dashboardSource.includes('USERS_DATABASE') || dashboardSource.includes('secureAPI')) &&
                         (!dashboardSource.includes('setSelectedUserId(parseInt(userIdParam))') || dashboardSource.includes('authorize'));
    
    // Performance fixes - major optimizations implemented
    const performanceFixed = dashboardSource.includes('memo(') ||
                            dashboardSource.includes('useMemo') ||
                            !dashboardSource.includes('const filteredUsers = users.filter');
    
    const workshopCompleted = securityFixed && performanceFixed;
    
    if (workshopCompleted) {
      console.log('🎉 Congratulations! Workshop bugs have been successfully fixed!');
    } else {
      console.log('💡 Keep working on the remaining bugs. Use npm test to track progress.');
    }
    
    // This test will pass when enough bugs are fixed
    expect(workshopCompleted).toBe(true);
  });
});

// Export test utilities
export const runWorkshopVerification = () => {
  const dashboardSource = readDashboardSource();
  
  const securityIssues = [
    dashboardSource.includes('import moment from \'moment\''),
    dashboardSource.includes('USERS_DATABASE'),
    dashboardSource.includes('API_KEYS'),
    dashboardSource.includes('setSelectedUserId(parseInt(userIdParam))'),
    dashboardSource.includes('SELECT * FROM users WHERE name LIKE \'%${term}%\'')
  ].filter(issue => issue).length;
  
  const performanceIssues = [
    !dashboardSource.includes('memo('),
    dashboardSource.includes('const filteredUsers = users.filter') && !dashboardSource.includes('useMemo'),
    dashboardSource.includes('key={index}'),
    dashboardSource.includes('useEffect(() => {') && !dashboardSource.includes('}, [')
  ].filter(issue => issue).length;
  
  return {
    totalSecurityIssues: securityIssues,
    totalPerformanceIssues: performanceIssues,
    allFixed: securityIssues === 0 && performanceIssues === 0,
    location: '/dashboard (single file)'
  };
};