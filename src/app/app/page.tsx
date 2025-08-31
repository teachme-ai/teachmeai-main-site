import IntakeForm from '@/components/IntakeForm'

export default function IntakeAppPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              TeachMeAI Learning Assessment
            </h1>
            <p className="text-gray-600">
              Complete this assessment to receive your personalized IMPACT learning analysis
            </p>
          </div>
          
          <IntakeForm />
        </div>
      </div>
    </div>
  )
}