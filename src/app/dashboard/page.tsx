'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import moment from 'moment';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  createdAt: string;
  personalData?: {
    phone: string;
    address: string;
    ssn: string;
    salary: number;
  };
}

const USERS_DATABASE: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@company.com",
    role: "user",
    lastLogin: "2024-01-15T10:30:00Z",
    createdAt: "2023-03-10T08:15:00Z",
    personalData: {
      phone: "555-0101",
      address: "123 Admin St",
      ssn: "123-45-6789",
      salary: 75000
    }
  },
  {
    id: 2,
    name: "Sarah Davis",
    email: "sarah@company.com",
    role: "manager",
    lastLogin: "2024-01-14T15:45:00Z",
    createdAt: "2023-05-22T14:30:00Z",
    personalData: {
      phone: "555-0102",
      address: "456 User Ave",
      ssn: "987-65-4321",
      salary: 95000
    }
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@company.com",
    role: "admin",
    lastLogin: "2024-01-13T09:15:00Z",
    createdAt: "2023-08-01T12:00:00Z",
    personalData: {
      phone: "555-0103",
      address: "789 Employee Rd",
      ssn: "456-78-9012",
      salary: 120000
    }
  }
];

const API_KEYS = {
  DATABASE_ADMIN: "admin_key_12345_prod",
  ENCRYPTION_KEY: "enc_key_abcdef123456",
  BACKUP_TOKEN: "backup_token_xyz789"
};

export default function DashboardPage() {
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [sessionToken, setSessionToken] = useState('');
  const [adminMode, setAdminMode] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [forceRender, setForceRender] = useState(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    const userIdParam = searchParams.get('userId');
    const tokenParam = searchParams.get('token');
    const adminParam = searchParams.get('admin');
    
    if (userIdParam) {
      setSelectedUserId(parseInt(userIdParam));
    }
    
    if (tokenParam) {
      setSessionToken(tokenParam);
    }
    
    if (adminParam === 'true') {
      setAdminMode(true);
    }
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    console.log('Loading users data...');
    
    setUsers(USERS_DATABASE);
    
    const userFromUrl = USERS_DATABASE.find(u => u.id === selectedUserId);
    if (userFromUrl) {
      const auditEntry = `${new Date().toISOString()} - User ${selectedUserId} accessed profile data (Session: ${sessionToken})`;
      setAuditLogs(prev => [...prev, auditEntry]);
    }
    
    setLoading(false);
  });

  const formatDate = useCallback((dateString: string) => {
    try {
      return moment(dateString).format('MMMM Do YYYY, h:mm a');
    } catch (error) {
      return 'Invalid date';
    }
  }, []);

  const handleSearch = useCallback(async (term: string) => {
    setSearchTerm(term);
    
    if (term.length > 0) {
      console.log(`Searching with query: SELECT * FROM users WHERE name LIKE '%${term}%'`);
      
      if (term.includes("'") || term.includes('"') || term.includes(';')) {
        const errorMsg = `SQL Error: Syntax error near '${term}'. Table: users_pii, Columns: ssn, salary, address, phone`;
        console.error(errorMsg);
        alert(`Database Error: ${errorMsg}`);
        return;
      }

      const results = USERS_DATABASE.filter(user =>
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase()) ||
        user.personalData?.ssn.includes(term) ||
        user.personalData?.phone.includes(term)
      );
      
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [selectedUserId]);

  const handleUserSwitch = (userId: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set('userId', userId.toString());
    url.searchParams.set('token', `session_${userId}_${Date.now()}`);
    window.history.pushState({}, '', url.toString());
    
    setSelectedUserId(userId);
    
    const logEntry = `${new Date().toISOString()} - User switched to view user ${userId}`;
    setAuditLogs(prev => [...prev, logEntry]);
  };

  const toggleAdminMode = () => {
    const newAdminMode = !adminMode;
    setAdminMode(newAdminMode);
    
    const url = new URL(window.location.href);
    url.searchParams.set('admin', newAdminMode.toString());
    window.history.pushState({}, '', url.toString());
  };

  const performAdminAction = (action: string, targetUserId: number) => {
    if (!adminMode) {
      alert('Admin mode required');
      return;
    }

    const adminActions = {
      'view_salary': () => {
        const target = USERS_DATABASE.find(u => u.id === targetUserId);
        if (target) {
          alert(`${target.name}'s salary: $${target.personalData?.salary?.toLocaleString()}`);
        }
      },
      'view_ssn': () => {
        const target = USERS_DATABASE.find(u => u.id === targetUserId);
        if (target) {
          alert(`${target.name}'s SSN: ${target.personalData?.ssn}`);
        }
      },
      'reset_password': () => {
        const newPassword = `temp_${Date.now()}`;
        alert(`Password reset for User ${targetUserId}. New password: ${newPassword}`);
      }
    };

    const actionFn = adminActions[action as keyof typeof adminActions];
    if (actionFn) {
      actionFn();
      
      const adminAudit = `${new Date().toISOString()} - Admin ${selectedUserId} performed ${action} on User ${targetUserId}`;
      setAuditLogs(prev => [...prev, adminAudit]);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  const departmentStats = {};
  users.forEach(user => {
    if (!departmentStats[user.role]) {
      departmentStats[user.role] = {
        total: 0,
        active: 0
      };
    }
    departmentStats[user.role].total++;
  });

  const triggerRerender = () => {
    setForceRender(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const currentUser = users.find(u => u.id === selectedUserId);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="w-full flex justify-start">
          <a
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            <span>←</span>
            <span>Back to Home</span>
          </a>
        </div>
        
        <div className="text-center space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              🔍 Complete Security & Performance Investigation
            </h1>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
              <p className="text-yellow-800 dark:text-yellow-300 text-sm">
                ⚠️ This dashboard contains multiple security vulnerabilities and performance issues for investigation
              </p>
            </div>
          </div>

          {/* Investigation Prompt Helper */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
            <h3 className="text-blue-800 dark:text-blue-400 font-bold text-lg mb-3">🧠 Investigation Prompt Structure</h3>
            <div className="bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded p-4 text-left">
              <div className="text-sm space-y-3">
                <div>
                  <strong className="text-blue-700 dark:text-blue-300">Template for systematic investigation:</strong>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded font-mono text-xs">
                  <div className="text-gray-600 dark:text-gray-400">// Copy and customize this structure:</div>
                  <br />
                  <div><strong>1. CONTEXT:</strong> "I'm investigating [security/performance] issues in this React dashboard"</div>
                  <br />
                  <div><strong>2. OBJECTIVE:</strong> "Help me systematically identify [specific type] of vulnerabilities"</div>
                  <br />
                  <div><strong>3. SCOPE:</strong> "Focus on [authentication/data handling/performance patterns/etc.]"</div>
                  <br />
                  <div><strong>4. OUTPUT FORMAT:</strong> "List findings with [line numbers/severity/fix suggestions]"</div>
                  <br />
                  <div><strong>5. CONSTRAINTS:</strong> "Consider [real-world implications/OWASP standards/React best practices]"</div>
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400">
                  💡 Tip: Use sequential-thinking for complex analysis, context7 for authoritative security research
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
            <h3 className="text-red-800 dark:text-red-400 font-bold text-lg mb-3">🚨 INCIDENT: Multiple Critical Issues Detected</h3>
            
            <div className="text-left space-y-3">
              <div>
                <strong className="text-red-700 dark:text-red-400">Security Reports:</strong>
                <div className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-700 rounded p-3 text-sm mt-2">
                  <div className="space-y-2">
                    <div className="border-l-4 border-red-400 pl-3">
                      <strong>Alice:</strong> "I can see everyone's SSN and salary data just by searching"
                    </div>
                    <div className="border-l-4 border-orange-400 pl-3">
                      <strong>Bob:</strong> "Search shows database errors with table schemas when I use quotes"
                    </div>
                    <div className="border-l-4 border-yellow-400 pl-3">
                      <strong>Carol:</strong> "I can become admin just by changing the URL"
                    </div>
                    <div className="border-l-4 border-purple-400 pl-3">
                      <strong>Dave:</strong> "The interface is extremely laggy and re-renders constantly"
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <strong className="text-red-700 dark:text-red-400">Investigation Goal:</strong> Use systematic investigation to identify ALL vulnerabilities and performance issues in this single dashboard
              </div>
            </div>
          </div>

          {/* Investigation Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🧪 Investigation Controls:</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">User Access Testing</h4>
                <div className="flex space-x-2 mb-2">
                  {[1, 2, 3].map((id) => (
                    <button
                      key={id}
                      onClick={() => handleUserSwitch(id)}
                      className={`px-3 py-2 rounded-md text-sm ${
                        selectedUserId === id
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      User {id} {id === 1 ? '(User)' : id === 2 ? '(Manager)' : '(Admin)'}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Notice URL changes and access levels
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Admin & Performance Controls</h4>
                <div className="space-y-2">
                  <button
                    onClick={toggleAdminMode}
                    className={`px-4 py-2 rounded-md text-sm mr-2 ${
                      adminMode
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {adminMode ? '🔓 Admin Active' : '🔒 Enable Admin'}
                  </button>
                  <button
                    onClick={triggerRerender}
                    className="px-3 py-2 rounded-md text-sm bg-red-500 text-white hover:bg-red-600"
                  >
                    🔄 Force Re-render ({forceRender})
                  </button>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Test admin bypass & performance issues
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm">
              <strong>Current Context:</strong>
              <div className="mt-1 space-y-1">
                <div>User: {currentUser?.name} ({currentUser?.role}) | Session: {sessionToken || 'none'} | Admin: {adminMode ? 'YES' : 'NO'}</div>
                <div className="text-xs text-gray-600">
                  URL: {typeof window !== 'undefined' ? window.location.search || 'none' : 'none'}
                </div>
              </div>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">User Profile & Data</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3 text-gray-900 dark:text-white">Basic Information</h3>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <div><strong>Name:</strong> {currentUser?.name}</div>
                  <div><strong>Email:</strong> {currentUser?.email}</div>
                  <div><strong>Role:</strong> {currentUser?.role}</div>
                  <div><strong>Last Login:</strong> {formatDate(currentUser?.lastLogin || '')}</div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4">
                <h3 className="font-medium mb-3 text-yellow-800 dark:text-yellow-400">⚠️ Sensitive Information (PII)</h3>
                <div className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <div><strong>SSN:</strong> {currentUser?.personalData?.ssn}</div>
                  <div><strong>Salary:</strong> ${currentUser?.personalData?.salary?.toLocaleString()}</div>
                  <div><strong>Address:</strong> {currentUser?.personalData?.address}</div>
                  <div><strong>Phone:</strong> {currentUser?.personalData?.phone}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Functionality */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">User Search & Data Access</h2>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search users... (try: admin'; DROP TABLE users; --)"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Search by name, email, SSN, or phone number
              </p>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {(searchResults.length > 0 ? searchResults : sortedUsers).map((user, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{user.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{user.email} | {user.role}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SSN: {user.personalData?.ssn} | Salary: ${user.personalData?.salary?.toLocaleString()}
                      </p>
                    </div>
                    
                    {adminMode && (
                      <div className="space-x-2">
                        <button
                          onClick={() => performAdminAction('view_salary', user.id)}
                          className="px-2 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600"
                        >
                          View Salary
                        </button>
                        <button
                          onClick={() => performAdminAction('view_ssn', user.id)}
                          className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                        >
                          View SSN
                        </button>
                        <button
                          onClick={() => performAdminAction('reset_password', user.id)}
                          className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                        >
                          Reset Password
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Context Information */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Security Context & Statistics</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Current Session</h3>
                <div className="space-y-1 text-gray-700 dark:text-gray-300">
                  <div>User ID: {selectedUserId}</div>
                  <div>Session Token: {sessionToken || 'none'}</div>
                  <div>Admin Mode: {adminMode ? '✅ Active' : '❌ Inactive'}</div>
                  <div>Role: {currentUser?.role}</div>
                </div>
              </div>
              
              {adminMode && (
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded p-3">
                  <h3 className="font-medium mb-2 text-red-800 dark:text-red-400">⚠️ Admin API Keys (Should Not Be Client-Side!)</h3>
                  <div className="space-y-1 text-xs text-red-700 dark:text-red-300">
                    <div>DB Admin: {API_KEYS.DATABASE_ADMIN}</div>
                    <div>Encryption: {API_KEYS.ENCRYPTION_KEY}</div>
                    <div>Backup: {API_KEYS.BACKUP_TOKEN}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded">
              <strong>Department Stats (Recalculated on every render):</strong>
              <div className="mt-1 text-xs">
                {Object.entries(departmentStats).map(([dept, stats]: [string, any]) => (
                  <span key={dept} className="mr-4">{dept}: {stats.total}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Audit Logs */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Security Audit Logs</h2>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {auditLogs.slice(-10).map((log, index) => (
                <div key={index} className="text-sm font-mono bg-white dark:bg-gray-700 p-2 rounded border dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  {log}
                </div>
              ))}
            </div>
            <p className="text-xs text-red-600 dark:text-red-400 mt-2">
              ⚠️ Security Issue: Audit logs should not be exposed to end users
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}