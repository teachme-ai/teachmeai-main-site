import IntakeForm from '@/components/IntakeForm'

export default function IntakeAppPage() {
  return (
    <div className="min-h-screen bg-slate-800">
      {/* Professional header */}
      <div className="bg-slate-900 border-b border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">TeachMeAI</h1>
                <p className="text-sm text-slate-300">Professional Learning Assessment</p>
              </div>
            </div>
            <div className="text-sm text-slate-400">
              Powered by AI-driven IMPACT methodology
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Professional introduction */}
        <div className="text-center mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-xl mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Professional Learning Assessment
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6">
              Complete our comprehensive assessment to receive a personalized learning roadmap based on proven IMPACT methodology and learning science.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>6-Step Assessment</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>AI-Powered Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Personalized Roadmap</span>
              </div>
            </div>
          </div>
        </div>
        
        <IntakeForm />
      </div>
    </div>
  )
}