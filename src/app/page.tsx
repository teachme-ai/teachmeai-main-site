import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-white/[0.01] rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Minimal Header */}
      <header className="relative z-10 backdrop-blur-md bg-black/80 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">T</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">TeachMeAI</h1>
                <p className="text-sm text-gray-400">AI-Powered Learning Platform</p>
              </div>
            </div>
            <Link
              href="/app"
              className="px-6 py-2.5 bg-white text-black hover:bg-gray-100 rounded-lg font-medium transition-all duration-200 text-sm"
            >
              Start Assessment
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-white leading-[0.9] tracking-tight">
            Transform Your
            <br />
            <span className="text-gray-400">Learning Journey</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Get personalized AI-powered learning pathways with our comprehensive IMPACT assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/app"
              className="group px-8 py-4 bg-white text-black hover:bg-gray-100 rounded-lg font-medium transition-all duration-200"
            >
              Start Free Assessment
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
            <a
              href="https://topmate.io/khalidirfan"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/20 hover:border-white/40 rounded-lg font-medium transition-all duration-200"
            >
              Book Consultation
            </a>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-24">
          
          {/* IMPACT Framework Card */}
          <div className="md:col-span-2 lg:col-span-3 group">
            <div className="h-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.05] transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-xl">🧠</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-white">IMPACT Framework</h3>
                  <p className="text-gray-500 text-sm">Proven Learning Methodology</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm">
                Our comprehensive assessment uses the IMPACT framework: Identify, Motivate, Plan, Act, Check, Transform. 
                Get scientifically-backed insights into your learning style.
              </p>
            </div>
          </div>

          {/* Stats Card */}
          <div className="group">
            <div className="h-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.05] transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">6</div>
              <div className="text-white font-medium mb-1 text-sm">Assessment Steps</div>
              <div className="text-xs text-gray-500">Comprehensive evaluation</div>
            </div>
          </div>

          {/* AI Analysis Card */}
          <div className="group">
            <div className="h-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.05] transition-all duration-300">
              <div className="text-2xl mb-4">🤖</div>
              <div className="font-medium text-white mb-2 text-sm">AI Analysis</div>
              <div className="text-xs text-gray-500">Google Gemini Pro</div>
            </div>
          </div>

          {/* Personalization Card */}
          <div className="group">
            <div className="h-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.05] transition-all duration-300">
              <div className="text-2xl mb-4">🎯</div>
              <div className="font-medium text-white mb-2 text-sm">Personalized</div>
              <div className="text-xs text-gray-500">Tailored approach</div>
            </div>
          </div>

          {/* Process Flow Card */}
          <div className="md:col-span-4 lg:col-span-6 group">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.05] transition-all duration-300">
              <h3 className="text-xl font-semibold mb-8 text-center text-white">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-semibold">1</span>
                  </div>
                  <h4 className="font-medium text-white mb-2 text-sm">Complete Assessment</h4>
                  <p className="text-gray-500 text-xs">6-step evaluation of your learning profile</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-semibold">2</span>
                  </div>
                  <h4 className="font-medium text-white mb-2 text-sm">AI Analysis</h4>
                  <p className="text-gray-500 text-xs">AI processes using IMPACT framework</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-semibold">3</span>
                  </div>
                  <h4 className="font-medium text-white mb-2 text-sm">Get Roadmap</h4>
                  <p className="text-gray-500 text-xs">Personalized learning plan</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Join professionals who have transformed their learning journey with our AI-powered assessment.
            </p>
            <Link
              href="/app"
              className="inline-flex items-center px-8 py-4 bg-white text-black hover:bg-gray-100 rounded-lg font-medium transition-all duration-200"
            >
              Start Your Assessment Now
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}