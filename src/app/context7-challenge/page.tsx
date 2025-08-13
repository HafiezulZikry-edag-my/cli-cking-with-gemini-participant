'use client';

export default function Context7ChallengePage() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">🔗 Context7 Library Crisis Challenge</h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
              Master Context7 through hands-on exercises with real compilation errors and performance issues. 
              Learn to research, migrate, and optimize using authoritative documentation and best practices.
            </p>
          </div>

          {/* Context7 Challenge */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 rounded-xl p-8 text-white max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <span className="text-4xl">🔗</span>
              <div className="text-center">
                <h3 className="text-2xl font-bold">CONTEXT7 MASTERY CHALLENGE</h3>
                <p className="text-blue-100">Library Migration • Performance Optimization • Real Errors</p>
              </div>
              <span className="text-4xl">📚</span>
            </div>
            
            <div className="bg-blue-600/30 rounded-lg p-4 mb-6">
              <h4 className="font-bold mb-2">🚨 The Emergency:</h4>
              <p className="text-blue-100 text-sm">
                Critical security scan reveals deprecated libraries with vulnerabilities: react-moment, 
                react-router v5, styled-components v4. Plus performance issues causing UI lag. Immediate action required!
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <a
                href="/context7-exercises"
                className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg"
              >
                <span>🛠️</span>
                <span>Start Exercises</span>
              </a>
              <a
                href="/performance-demo"
                className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-3 rounded-lg font-medium hover:bg-blue-200 transition-colors"
              >
                <span>🚀</span>
                <span>Performance Demo</span>
              </a>
            </div>
          </div>

          {/* Challenge Details */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h4 className="font-bold text-red-800 dark:text-red-400 mb-3 flex items-center">
                <span className="mr-2">📚</span>
                Traditional Research Struggle
              </h4>
              <ul className="text-red-700 dark:text-red-300 text-sm space-y-1">
                <li>• Hunt through multiple documentation sites</li>
                <li>• Navigate confusing version differences</li>
                <li>• Piece together migration strategies</li>
                <li>• Uncertainty about compatibility</li>
                <li>• Outdated examples and conflicting advice</li>
              </ul>
              <p className="text-red-600 dark:text-red-400 text-xs mt-3 font-medium">⏱️ Time: 20-30 minutes</p>
              <p className="text-red-600 dark:text-red-400 text-xs">😫 Confidence: LOW</p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <h4 className="font-bold text-green-800 dark:text-green-400 mb-3 flex items-center">
                <span className="mr-2">🔗</span>
                Context7: Authoritative & Fast
              </h4>
              <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
                <li>• Access official, up-to-date documentation</li>
                <li>• Get version-specific migration guides</li>
                <li>• Compare libraries systematically</li>
                <li>• Verify compatibility confidently</li>
                <li>• Learn best practices from source</li>
              </ul>
              <p className="text-green-600 dark:text-green-400 text-xs mt-3 font-medium">⏱️ Time: 10-15 minutes</p>
              <p className="text-green-600 dark:text-green-400 text-xs">😎 Experience: AUTHORITATIVE</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row justify-center">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white gap-2 hover:from-blue-600 hover:to-cyan-600 font-bold text-lg h-14 px-8 shadow-lg"
            href="/context7-exercises"
          >
            🛠️ Start Exercises
          </a>
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-cyan-600 text-white gap-2 hover:bg-cyan-700 font-medium text-base h-12 px-6"
            href="/performance-demo"
          >
            🚀 Performance Demo
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="/dashboard"
          >
            🚨 Try Dashboard Challenge
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="/"
          >
            ← Back to Home
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <span className="text-sm text-gray-600">Context7 Library Crisis Challenge</span>
      </footer>
    </div>
  );
}