'use client';

import TaskManager from '../components/TaskManager';

export default function TasksPage() {
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
              Component Hierarchy Challenge
            </h1>
          </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-red-800 font-bold text-lg mb-3">🐛 Bug Alert: Component Hierarchy Issue</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-red-700">Problem:</h4>
              <p className="text-red-600 text-sm">
                When you click "Complete" on a task, the wrong task gets marked as complete! 
                The action affects a different task than the one you clicked on.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-red-700">How to Reproduce:</h4>
              <ol className="text-red-600 text-sm list-decimal list-inside space-y-1">
                <li>Look at the first task: "Complete project proposal" (Task ID 1)</li>
                <li>Click the "Complete" button on this first task</li>
                <li>Notice that the SECOND task "Review code changes" gets marked as complete instead!</li>
                <li>Try clicking "Complete" on other tasks - same wrong behavior</li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium text-red-700">Expected vs Actual:</h4>
              <ul className="text-red-600 text-sm list-disc list-inside space-y-1">
                <li><strong>Expected:</strong> Clicking "Complete" on Task 1 should complete Task 1</li>
                <li><strong>Actual:</strong> Clicking "Complete" on Task 1 completes Task 2 instead</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h3 className="text-yellow-800 font-bold text-lg mb-3">🎯 Challenge: Component Hierarchy Detective Work</h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <h4 className="font-bold text-red-800 mb-2">Traditional Debugging:</h4>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• Open multiple component files manually</li>
                <li>• Trace prop passing through component tree</li>
                <li>• Add console.logs in each component</li>
                <li>• Follow data flow through 5+ components</li>
                <li>• Check each event handler individually</li>
              </ul>
              <p className="text-red-600 text-xs mt-2 font-medium">⏱️ Typical time: 15-25 minutes</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded p-4">
              <h4 className="font-bold text-green-800 mb-2">Gemini CLI Approach:</h4>
              <div className="bg-gray-900 text-green-400 text-xs p-2 rounded font-mono space-y-1">
                <div># Describe the problem</div>
                <div>gemini "When I click Complete on Task 1, Task 2 gets completed instead. Use serena to find the task completion logic."</div>
                <div className="mt-1"># Find component relationships</div>
                <div>gemini "Use serena to show me how task actions are handled across the component hierarchy."</div>
                <div className="mt-1"># Trace event handlers</div>
                <div>gemini "Use serena to find where onToggleComplete is defined and how taskId is passed through components."</div>
              </div>
              <p className="text-green-600 text-xs mt-2 font-medium">⏱️ Expected time: 3-5 minutes</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <h4 className="font-medium text-blue-800 mb-2">💡 Smart Prompting for Component Issues:</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-blue-700">🎯 Start with User Behavior:</h5>
                <p className="text-blue-600 text-sm">"Clicking Complete on Task X affects Task Y instead" - describe the wrong behavior</p>
              </div>
              <div>
                <h5 className="font-medium text-blue-700">🔍 Let Serena Map Components:</h5>
                <p className="text-blue-600 text-sm">Ask Serena to find how data flows between task-related components</p>
              </div>
              <div>
                <h5 className="font-medium text-blue-700">📋 Focus on Event Handling:</h5>
                <p className="text-blue-600 text-sm">"Find where click events are handled" helps narrow the search</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded p-4 mt-4">
            <h4 className="font-medium text-purple-800 mb-2">🎯 Why This Bug is Perfect for Serena:</h4>
            <ul className="text-purple-700 text-sm space-y-1">
              <li>• <strong>Multi-file issue:</strong> Bug spans across 5 different component files</li>
              <li>• <strong>Component relationships:</strong> Need to understand parent-child data flow</li>
              <li>• <strong>Prop drilling:</strong> Data passes through multiple component layers</li>
              <li>• <strong>Event handling:</strong> Need to trace onClick handlers through the hierarchy</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded p-4 mt-4">
            <h4 className="font-medium text-green-800 mb-2">🚀 Gemini's Superpowers Here:</h4>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• <strong>find_symbol:</strong> Instantly locate functions across multiple files</li>
              <li>• <strong>find_referencing_symbols:</strong> See how components reference each other</li>
              <li>• <strong>get_symbols_overview:</strong> Understand component structure quickly</li>
              <li>• <strong>search_for_pattern:</strong> Find all event handlers and prop usage</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <TaskManager />
        </div>

        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2">🧪 Component Architecture Overview:</h4>
          <div className="bg-gray-100 p-3 rounded text-sm font-mono text-gray-700">
            <div>TaskManager.tsx (state management)</div>
            <div className="ml-4">↓ props: tasks, onToggleComplete, onDelete</div>
            <div className="ml-2">TaskList.tsx (filtering & sorting)</div>
            <div className="ml-6">↓ props: task, onToggleComplete, onDelete</div>
            <div className="ml-4">TaskItem.tsx (individual task display)</div>
            <div className="ml-8">↓ props: taskId, onToggleComplete</div>
            <div className="ml-6">TaskActions.tsx ⚠️ (BUG IS HERE!)</div>
            <div className="ml-8">↓ also renders:</div>
            <div className="ml-6">TaskStatus.tsx (status display)</div>
          </div>
          <p className="text-gray-600 text-xs mt-2">
            <strong>The bug:</strong> TaskActions.tsx incorrectly modifies the taskId before calling onToggleComplete!
          </p>
        </div>
        </div>
      </main>
    </div>
  );
}