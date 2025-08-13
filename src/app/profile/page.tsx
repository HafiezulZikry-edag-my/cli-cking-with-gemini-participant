'use client';

import { useState } from 'react';
import UserProfile from '../components/UserProfile';

export default function ProfilePage() {
  const [selectedUserId, setSelectedUserId] = useState(1);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* Back Button */}
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
              User Profile Demo
            </h1>
          </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Select User ID to View:</h2>
          <div className="flex space-x-4">
            {[1, 2, 3].map((id) => (
              <button
                key={id}
                onClick={() => setSelectedUserId(id)}
                className={`px-4 py-2 rounded-md ${
                  selectedUserId === id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                User {id}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Current selection: User ID {selectedUserId}
          </p>
          
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3">
            <h3 className="text-blue-800 font-medium text-sm">Expected User Mapping:</h3>
            <ul className="text-blue-700 text-xs mt-1 space-y-1">
              <li><strong>User ID 1</strong> → Should show <strong>John Doe</strong> (john@example.com)</li>
              <li><strong>User ID 2</strong> → Should show <strong>Jane Smith</strong> (jane@example.com)</li>
              <li><strong>User ID 3</strong> → Should show <strong>Bob Wilson</strong> (bob@example.com)</li>
            </ul>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="text-red-800 font-medium">🐛 Bug Alert!</h3>
          <p className="text-red-700 text-sm mt-1">
            There's a bug in this profile component. Users are reporting that when they select 
            their profile, they see someone else's information! Can you find and fix the issue?
          </p>
          <p className="text-red-600 text-xs mt-2">
            <strong>Expected:</strong> Selecting "User 1" should show John Doe's profile<br/>
            <strong>Actual:</strong> Selecting "User 1" shows Jane Smith's profile instead
          </p>
        </div>

        <UserProfile userId={selectedUserId} />
        
        <div className="mt-8 space-y-6">
          {/* Challenge Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-yellow-800 font-bold text-lg mb-3">🎯 Your Challenge</h3>
            <p className="text-yellow-700 mb-4">
              You're a developer who just received a critical bug report: <em>"Users are seeing the wrong profile information!"</em>
            </p>
            
            <div className="bg-white rounded p-4 border border-yellow-300 mb-4">
              <h4 className="font-medium text-yellow-800 mb-2">🎯 Your Mission:</h4>
              <p className="text-yellow-700 text-sm">
                Find and fix this bug using <strong>two different approaches</strong>, then compare the time and experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 border border-red-200 rounded p-4">
                <h4 className="font-bold text-red-800 mb-2">Method 1: Traditional Debugging</h4>
                <p className="text-red-700 text-sm mb-2"><strong>Tools allowed:</strong></p>
                <ul className="text-red-700 text-xs list-disc list-inside space-y-1">
                  <li>Manual file browsing in VS Code</li>
                  <li>Ctrl+F search within files</li>
                  <li>Console.log statements</li>
                  <li>Browser DevTools</li>
                  <li>Reading code line by line</li>
                </ul>
                <p className="text-red-600 text-xs mt-2 font-medium">⏱️ Start your timer!</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded p-4">
                <h4 className="font-bold text-green-800 mb-2">Method 2: Gemini CLI</h4>
                <p className="text-green-700 text-sm mb-2"><strong>Smart Prompting Approach:</strong></p>
                <div className="bg-gray-900 text-green-400 text-xs p-2 rounded font-mono space-y-1">
                  <div># Start with the problem description</div>
                  <div>gemini "I'm seeing wrong user profiles. When I select User 1, I get Jane Smith instead of John Doe. Use serena to help me find the bug."</div>
                  <div className="mt-2"># Or be more specific about the pattern</div>
                  <div>gemini "Users report seeing wrong profile data - each user ID shows the next user's info. Use serena to find where user data is fetched."</div>
                  <div className="mt-2"># Let Serena guide the investigation</div>
                  <div>gemini "Use serena to search for functions that fetch user data by ID and show me their implementation"</div>
                </div>
                <p className="text-green-600 text-xs mt-2 font-medium">⏱️ Time this approach too!</p>
              </div>
            </div>
          </div>

          {/* Hints Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-blue-800 font-medium mb-2">💡 Prompting Tips for Serena</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-blue-700">🎯 Describe the Problem:</h4>
                <p className="text-blue-600 text-sm">Start with what you observe: "Users see wrong profile data", "User 1 shows User 2's info"</p>
              </div>
              <div>
                <h4 className="font-medium text-blue-700">🔍 Let Serena Investigate:</h4>
                <p className="text-blue-600 text-sm">Ask Serena to find relevant code: "find user data fetching", "search for userId usage"</p>
              </div>
              <div>
                <h4 className="font-medium text-blue-700">📋 Be Specific About Symptoms:</h4>
                <p className="text-blue-600 text-sm">Include what's expected vs actual: "should show John Doe but shows Jane Smith"</p>
              </div>
            </div>
          </div>

          {/* Results Comparison */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="text-purple-800 font-medium mb-2">📊 Compare Your Results</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-purple-700 mb-1">Traditional Debugging:</h4>
                <p className="text-purple-600 text-sm">Time taken: _____ minutes</p>
                <p className="text-purple-600 text-sm">Frustration level: 😤 😡 😭</p>
              </div>
              <div>
                <h4 className="font-medium text-purple-700 mb-1">Serena MCP:</h4>
                <p className="text-purple-600 text-sm">Time taken: _____ minutes</p>
                <p className="text-purple-600 text-sm">Experience: 😊 🚀 🎉</p>
              </div>
            </div>
            <p className="text-purple-600 text-xs mt-2">
              <strong>Expected difference:</strong> Gemini CLI typically 3-5x faster with higher confidence!
            </p>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}