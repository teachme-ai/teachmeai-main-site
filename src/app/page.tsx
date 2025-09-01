import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold">TeachMeAI</h1>
                <p className="text-sm text-slate-400">AI-Powered Learning Platform</p>
              </div>
            </div>
            <Link
              href="/app"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              Start Assessment
            </Link>
          </div>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 h-[800px]">
          
          {/* Hero Card - Large */}
          <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-4">Personalized Learning with AI</h2>
            <p className="text-blue-100 text-lg mb-6">Complete our IMPACT assessment and receive a customized learning roadmap powered by AI.</p>
            <Link
              href="/app"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors w-fit"
            >
              Start Assessment →
            </Link>
          </div>

          {/* Stats Card */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="text-3xl font-bold text-green-400 mb-2">6</div>
            <div className="text-slate-300">Assessment Steps</div>
            <div className="text-sm text-slate-500 mt-2">Comprehensive evaluation</div>
          </div>

          {/* Feature Card */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="text-2xl mb-3">🧠</div>
            <div className="font-semibold mb-2">IMPACT Framework</div>
            <div className="text-sm text-slate-400">Proven methodology for learning analysis</div>
          </div>

          {/* Consultation Card */}
          <div className="md:col-span-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6">
            <div className="text-2xl mb-3">💬</div>
            <div className="font-semibold text-lg mb-2">1:1 Consultation</div>
            <div className="text-emerald-100 mb-4">Book a personalized session with our learning experts</div>
            <a
              href="https://topmate.io/khalidirfan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-white text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
            >
              Book Now →
            </a>
          </div>

          {/* AI Feature */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="text-2xl mb-3">🤖</div>
            <div className="font-semibold mb-2">AI Analysis</div>
            <div className="text-sm text-slate-400">Powered by Google Gemini Pro</div>
          </div>

          {/* Personalization */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="text-2xl mb-3">🎯</div>
            <div className="font-semibold mb-2">Personalized</div>
            <div className="text-sm text-slate-400">Tailored to your learning style</div>
          </div>

          {/* Process Card - Wide */}
          <div className="md:col-span-2 lg:col-span-4 bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="font-semibold text-lg mb-4">How It Works</div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="text-sm font-medium">Complete Assessment</div>
                <div className="text-xs text-slate-400 mt-1">6-step evaluation</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="text-sm font-medium">AI Analysis</div>
                <div className="text-xs text-slate-400 mt-1">IMPACT framework</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="text-sm font-medium">Get Roadmap</div>
                <div className="text-xs text-slate-400 mt-1">Personalized plan</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}