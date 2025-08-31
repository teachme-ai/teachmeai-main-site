import IntakeForm from '@/components/IntakeForm'

export default function IntakeAppPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header with glassmorphism */}
          <div className="text-center mb-12">
            <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">🧠</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                TeachMeAI Assessment
              </h1>
              <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
                Discover your personalized learning pathway with our AI-powered IMPACT analysis
              </p>
              <div className="flex items-center justify-center mt-6 space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-200"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-delay-400"></div>
              </div>
            </div>
          </div>
          
          <IntakeForm />
        </div>
      </div>
    </div>
  )
}