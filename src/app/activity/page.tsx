'use client';

import { useState } from 'react';
import ActivityFeed from '../components/ActivityFeed';

export default function ActivityPage() {
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(undefined);

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
              Activity Feed Challenge
            </h1>
          </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Filter by User (Optional):</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedUserId(undefined)}
              className={`px-4 py-2 rounded-md ${
                selectedUserId === undefined
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Users
            </button>
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
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-red-800 font-bold text-lg mb-3">🐛 Bug Alert: Cross-File Import Issue</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-red-700">Problem:</h4>
              <p className="text-red-600 text-sm">
                The activity timestamps are showing incorrectly! All relative times show "Unknown time" 
                and the date formatting looks wrong.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-red-700">Expected:</h4>
              <ul className="text-red-600 text-sm list-disc list-inside">
                <li>Relative times like "Today", "Yesterday", "2 days ago"</li>
                <li>Properly formatted dates like "January 15, 2024, 10:30 AM"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-700">Actual:</h4>
              <ul className="text-red-600 text-sm list-disc list-inside">
                <li>All relative times show "Unknown time"</li>
                <li>Dates show inconsistent formatting</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <ActivityFeed userId={selectedUserId} />
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-yellow-800 font-bold text-lg mb-3">🎯 Challenge: Cross-File Detective Work</h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <h4 className="font-bold text-red-800 mb-2">Traditional Approach:</h4>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• Manually trace import statements</li>
                <li>• Search for all date-related files</li>
                <li>• Compare multiple utility files</li>
                <li>• Test different import paths</li>
              </ul>
              <p className="text-red-600 text-xs mt-2 font-medium">⏱️ Typical time: 8-12 minutes</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded p-4">
              <h4 className="font-bold text-green-800 mb-2">Gemini CLI Approach:</h4>
              <div className="bg-gray-900 text-green-400 text-xs p-2 rounded font-mono space-y-1">
                <div># Describe the symptoms</div>
                <div>gemini "Activity timestamps show 'Unknown time' and wrong date format. Use serena to find the date formatting code."</div>
                <div className="mt-1"># Let Serena investigate imports</div>
                <div>gemini "The date functions aren't working. Use serena to trace where date utilities are imported from."</div>
                <div className="mt-1"># Compare different implementations</div>
                <div>gemini "Use serena to find all date formatting functions in the project and compare their implementations."</div>
              </div>
              <p className="text-green-600 text-xs mt-2 font-medium">⏱️ Expected time: 2-3 minutes</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <h4 className="font-medium text-blue-800 mb-2">💡 Smart Prompting for Cross-File Issues:</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-blue-700">🎯 Start with Symptoms:</h5>
                <p className="text-blue-600 text-sm">"All timestamps show 'Unknown time'" - describe what you see</p>
              </div>
              <div>
                <h5 className="font-medium text-blue-700">🔍 Let Serena Trace Dependencies:</h5>
                <p className="text-blue-600 text-sm">Ask Serena to find imports and compare implementations across files</p>
              </div>
              <div>
                <h5 className="font-medium text-blue-700">📋 Be Specific About Function Behavior:</h5>
                <p className="text-blue-600 text-sm">"Date functions return wrong format" helps Serena focus the search</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded p-4 mt-4">
            <h4 className="font-medium text-purple-800 mb-2">🚀 Gemini's Superpowers for This Bug:</h4>
            <ul className="text-purple-700 text-sm space-y-1">
              <li>• <strong>find_symbol:</strong> Instantly locate function definitions across files</li>
              <li>• <strong>find_referencing_symbols:</strong> See where functions are imported and used</li>
              <li>• <strong>search_for_pattern:</strong> Find all files matching naming patterns</li>
              <li>• <strong>get_symbols_overview:</strong> Compare exports between similar files</li>
            </ul>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}