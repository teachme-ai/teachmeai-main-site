import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium tracking-wider">
              [ TEACHMEAI ]
            </div>
            <nav className="hidden md:flex items-center space-x-8 text-sm">
              <Link href="/app" className="hover:text-gray-300 transition-colors">ASSESSMENT</Link>
              <a href="/admin" className="hover:text-gray-300 transition-colors">ADMIN</a>
              <a href="https://topmate.io/khalidirfan" target="_blank" className="hover:text-gray-300 transition-colors">CONTACT</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-120px)]">
          
          {/* Large Hero Card */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5 row-span-2">
            <div className="h-full bg-[#111] border border-white/[0.06] rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  AI LEARNING
                  <br />
                  <span className="text-gray-500">ASSESSMENT</span>
                </h1>
                <p className="text-gray-400 text-lg mb-8 max-w-md">
                  Personalized IMPACT analysis powered by advanced AI technology.
                </p>
                <Link
                  href="/app"
                  className="inline-block px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  START ASSESSMENT
                </Link>
              </div>
            </div>
          </div>

          {/* Services Card */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <div className="h-full bg-[#111] border border-white/[0.06] rounded-3xl p-8 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">
                  IMPACT
                  <br />FRAMEWORK
                  <br />AI ANALYSIS
                  <br />PERSONALIZATION
                </h2>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="col-span-6 md:col-span-3 lg:col-span-3">
            <div className="h-full bg-[#111] border border-white/[0.06] rounded-3xl p-6 flex flex-col justify-center">
              <div className="text-4xl font-bold mb-2">6</div>
              <div className="text-sm text-gray-400">ASSESSMENT STEPS</div>
            </div>
          </div>

          {/* AI Card */}
          <div className="col-span-6 md:col-span-3">
            <div className="h-full bg-[#111] border border-white/[0.06] rounded-3xl p-6 flex flex-col justify-center items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <div className="text-sm font-medium">AI POWERED</div>
            </div>
          </div>

          {/* Assessment Card */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <div className="h-full bg-[#111] border border-white/[0.06] rounded-3xl p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🧠</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">COMPREHENSIVE</h3>
                <p className="text-gray-400 text-sm">Complete learning profile analysis</p>
              </div>
            </div>
          </div>

          {/* Templates Card */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <div className="h-full bg-[#111] border border-white/[0.06] rounded-3xl p-8 flex items-center justify-center">
              <h2 className="text-4xl font-bold">ROADMAPS</h2>
            </div>
          </div>

          {/* Contact Card */}
          <div className="col-span-6 md:col-span-3">
            <div className="h-full bg-[#111] border border-white/[0.06] rounded-3xl p-6 flex items-center justify-center">
              <h3 className="text-xl font-bold">CONTACT.</h3>
            </div>
          </div>

          {/* Consultation Card */}
          <div className="col-span-6 md:col-span-3">
            <div className="h-full bg-[#111] border border-white/[0.06] rounded-3xl p-6 flex flex-col justify-center items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <a 
                href="https://topmate.io/khalidirfan" 
                target="_blank"
                className="text-sm font-medium hover:text-gray-300 transition-colors"
              >
                BOOK SESSION
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}