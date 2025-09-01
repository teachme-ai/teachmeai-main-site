import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Glassmorphism Header */}
      <header className="relative z-10 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">TeachMeAI</h1>
                <p className="text-sm text-slate-300">AI-Powered Learning Platform</p>
              </div>
            </div>
            <Link
              href="/app"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Assessment
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
            Transform Your
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Learning Journey</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Get personalized AI-powered learning pathways with our comprehensive IMPACT assessment. 
            Unlock your potential with data-driven insights and actionable roadmaps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/app"
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
            >
              Start Free Assessment
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            <a
              href="https://topmate.io/khalidirfan"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Book Consultation
            </a>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-20">
          
          {/* IMPACT Framework Card */}
          <div className="md:col-span-2 lg:col-span-3 group">
            <div className="h-full backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-2xl">🧠</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">IMPACT Framework</h3>
                  <p className="text-slate-400">Proven Learning Methodology</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Our comprehensive assessment uses the IMPACT framework: Identify, Motivate, Plan, Act, Check, Transform. 
                Get scientifically-backed insights into your learning style and preferences.
              </p>
            </div>
          </div>

          {/* Stats Card */}
          <div className="group">
            <div className="h-full backdrop-blur-md bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-400/30 rounded-3xl p-6 hover:bg-green-500/25 transition-all duration-500 transform hover:scale-105">
              <div className="text-4xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">6</div>
              <div className="text-white font-semibold mb-1">Assessment Steps</div>
              <div className="text-sm text-green-200">Comprehensive evaluation process</div>
            </div>
          </div>

          {/* AI Analysis Card */}
          <div className="group">
            <div className="h-full backdrop-blur-md bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-400/30 rounded-3xl p-6 hover:bg-purple-500/25 transition-all duration-500 transform hover:scale-105">
              <div className="text-3xl mb-4 group-hover:animate-bounce">🤖</div>
              <div className="font-bold text-lg mb-2">AI Analysis</div>
              <div className="text-sm text-purple-200">Powered by Google Gemini Pro</div>
            </div>
          </div>

          {/* Personalization Card */}
          <div className="group">
            <div className="h-full backdrop-blur-md bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-400/30 rounded-3xl p-6 hover:bg-blue-500/25 transition-all duration-500 transform hover:scale-105">
              <div className="text-3xl mb-4 group-hover:rotate-12 transition-transform duration-300">🎯</div>
              <div className="font-bold text-lg mb-2">Personalized</div>
              <div className="text-sm text-blue-200">Tailored to your unique style</div>
            </div>
          </div>

          {/* Process Flow Card */}
          <div className="md:col-span-4 lg:col-span-6 group">
            <div className="backdrop-blur-md bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500">
              <h3 className="text-2xl font-bold mb-8 text-center">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center group/item">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2">Complete Assessment</h4>
                  <p className="text-slate-400">6-step comprehensive evaluation of your learning profile and goals</p>
                </div>
                <div className="text-center group/item">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2">AI Analysis</h4>
                  <p className="text-slate-400">Advanced AI processes your responses using IMPACT framework</p>
                </div>
                <div className="text-center group/item">
                  <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2">Get Roadmap</h4>
                  <p className="text-slate-400">Receive personalized learning plan with actionable next steps</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="backdrop-blur-md bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-3xl p-12 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ready to Unlock Your Learning Potential?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their learning journey with our AI-powered assessment.
            </p>
            <Link
              href="/app"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
            >
              Start Your Assessment Now
              <span className="ml-3 text-2xl">✨</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}