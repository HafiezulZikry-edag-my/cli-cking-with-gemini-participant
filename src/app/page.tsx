import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="text-center space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">🔍 Security Investigation Workshop</h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
              Master systematic security investigation using gemini-cli with sequential-thinking and context7 MCP tools. 
              Transform chaotic incident response into confident, methodical analysis.
            </p>
          </div>

          {/* Main Security Investigation Challenge */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-600 dark:to-orange-600 rounded-xl p-8 text-white max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <span className="text-4xl">🚨</span>
              <div className="text-center">
                <h3 className="text-2xl font-bold">SECURITY INVESTIGATION CHALLENGE</h3>
                <p className="text-red-100">Multi-Layer Vulnerabilities • Real Enterprise Security Incident</p>
              </div>
              <span className="text-4xl">🔍</span>
            </div>
            
            <div className="bg-red-600/30 rounded-lg p-4 mb-6">
              <h4 className="font-bold mb-2">🎭 The Security Incident:</h4>
              <p className="text-red-100 text-sm">
                Critical production security breach: users accessing others' PII data, SQL injection vulnerabilities, 
                CVE exposures, and authorization bypass. Multiple attack vectors require systematic investigation.
              </p>
            </div>

            <div className="bg-red-600/20 rounded-lg p-4 mb-6">
              <h4 className="font-bold mb-2">🔧 Investigation Tools:</h4>
              <div className="text-red-100 text-sm space-y-1">
                <div><strong>Sequential Thinking:</strong> Break down complex security issues systematically</div>
                <div><strong>Context7:</strong> Research CVE databases and security best practices</div>
                <div><strong>Combined Approach:</strong> Comprehensive security analysis and remediation planning</div>
              </div>
            </div>

            <div className="flex justify-center">
              <a
                href="/dashboard"
                className="inline-flex items-center space-x-2 bg-white text-red-600 px-8 py-4 rounded-lg font-bold hover:bg-red-50 transition-colors shadow-lg text-lg"
              >
                <span>🚀</span>
                <span>Start Security Investigation</span>
              </a>
            </div>
          </div>
          
          {/* Investigation Methodology */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-4">🎯 Investigation Methodology</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Phase 1: Sequential Analysis</h4>
                <p className="text-blue-600 dark:text-blue-400">Use systematic thinking to break down the security incident into investigable components</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Phase 2: Research & Validation</h4>
                <p className="text-blue-600 dark:text-blue-400">Leverage context7 for authoritative CVE data and security best practices</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Phase 3: Strategic Planning</h4>
                <p className="text-blue-600 dark:text-blue-400">Combine insights for comprehensive security remediation approach</p>
              </div>
            </div>
          </div>

          {/* What You'll Master */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">💡 What You'll Master</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center text-green-700 dark:text-green-300">
                  <span className="mr-2">✅</span>
                  <span>Systematic security incident analysis</span>
                </div>
                <div className="flex items-center text-green-700 dark:text-green-300">
                  <span className="mr-2">✅</span>
                  <span>CVE research and vulnerability assessment</span>
                </div>
                <div className="flex items-center text-green-700 dark:text-green-300">
                  <span className="mr-2">✅</span>
                  <span>Multi-layer attack vector identification</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-green-700 dark:text-green-300">
                  <span className="mr-2">✅</span>
                  <span>Authorization and access control analysis</span>
                </div>
                <div className="flex items-center text-green-700 dark:text-green-300">
                  <span className="mr-2">✅</span>
                  <span>Security remediation planning</span>
                </div>
                <div className="flex items-center text-green-700 dark:text-green-300">
                  <span className="mr-2">✅</span>
                  <span>gemini-cli investigation methodology</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row justify-center">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gradient-to-r from-red-500 to-orange-500 text-white gap-2 hover:from-red-600 hover:to-orange-600 font-bold text-lg h-14 px-8 shadow-lg"
            href="/dashboard"
          >
            🔍 Start Security Investigation
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <span className="text-sm text-gray-600 dark:text-gray-400">Development Workshop</span>
      </footer>
    </div>
  );
}
