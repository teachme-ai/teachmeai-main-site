import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            TeachMeAI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Personalized AI-powered learning pathways for career professionals. 
            Get tailored IMPACT analysis and actionable learning roadmaps.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/app" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Start Your Learning Journey
            </Link>
            <a 
              href="https://topmate.io/khalidirfan" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-8 rounded-lg border border-gray-300 transition-colors"
            >
              Book a Session
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold mb-3">IMPACT Analysis</h3>
            <p className="text-gray-600">
              Get personalized learning analysis using our proven IMPACT framework: 
              Identify, Motivate, Plan, Act, Check, Transform.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-3">Tailored Roadmaps</h3>
            <p className="text-gray-600">
              Receive customized learning pathways based on your goals, 
              learning style, and current skill level.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-3">AI-Powered Insights</h3>
            <p className="text-gray-600">
              Leverage Google Gemini AI for intelligent analysis and 
              actionable recommendations for your learning journey.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-white rounded-xl p-8 shadow-sm max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-gray-600 mb-6">
              Take our comprehensive intake assessment and get your personalized IMPACT analysis in minutes.
            </p>
            <Link 
              href="/app" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors inline-block"
            >
              Start Assessment →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}