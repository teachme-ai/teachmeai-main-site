'use client'

import { useState, useEffect } from 'react'
import { track } from '@vercel/analytics'
import { IntakeResponse } from '@/types'

export default function IntakeForm() {
  const [currentStep, setCurrentStep] = useState(1)
  
  // Track page view on component mount
  useEffect(() => {
    track('Assessment Started')
  }, [])
  const [responses, setResponses] = useState<Partial<IntakeResponse>>({
    currentRoles: [],
    varkPreferences: {
      visual: 3,
      audio: 3,
      readingWriting: 3,
      kinesthetic: 3
    }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({})

  const totalSteps = 6

  const handleInputChange = (field: keyof IntakeResponse, value: any) => {
    setResponses(prev => ({ ...prev, [field]: value }))
    // Clear validation error when user makes a selection
    if (field === 'learnerType') {
      setValidationErrors(prev => ({ ...prev, learnerType: '' }))
    }
  }

  const handleVarkChange = (type: keyof IntakeResponse['varkPreferences'], value: number) => {
    setResponses(prev => ({
      ...prev,
      varkPreferences: {
        ...prev.varkPreferences!,
        [type]: value
      }
    }))
  }

  const validateStep = (step: number): boolean => {
    const errors: {[key: string]: string} = {}
    
    if (step === 1) {
      if (!responses.goalSettingConfidence) errors.goalSettingConfidence = 'Please rate your goal setting confidence'
      if (!responses.newApproachesFrequency) errors.newApproachesFrequency = 'Please rate how often you try new approaches'
      if (!responses.reflectionFrequency) errors.reflectionFrequency = 'Please rate your reflection frequency'
      if (!responses.aiToolsConfidence) errors.aiToolsConfidence = 'Please rate your AI tools confidence'
      if (!responses.resilienceLevel) errors.resilienceLevel = 'Please rate your resilience level'
    }
    
    if (step === 2) {
      if (!responses.clearCareerVision) errors.clearCareerVision = 'Please rate your career vision clarity'
      if (!responses.successDescription) errors.successDescription = 'Please rate your success description clarity'
      if (!responses.learningForChallenge) errors.learningForChallenge = 'Please rate your learning for challenge'
      if (!responses.outcomeDrivenLearning) errors.outcomeDrivenLearning = 'Please rate your outcome-driven learning'
    }
    
    if (step === 3) {
      if (!responses.timeBarrier) errors.timeBarrier = 'Please rate your time barrier level'
    }
    
    if (step === 4) {
      if (!responses.learnerType) errors.learnerType = 'Please select a learner type to continue'
      if (!responses.skillStage) errors.skillStage = 'Please rate your skill stage'
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return false
    } else {
      setValidationErrors({})
      return true
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      if (validateStep(currentStep)) {
        // Track step progression
        track('Step Completed', {
          step: currentStep,
          stepName: ['Profile', 'Goals', 'Challenges', 'Preferences', 'Outcomes', 'Review'][currentStep - 1]
        })
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setValidationErrors({}); // Clear errors when going back
    }
  }

  const handleSubmit = async () => {
    // Final validation before submission
    if (!validateStep(1) || !validateStep(2) || !validateStep(3) || !validateStep(4)) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const completeResponses: IntakeResponse = {
        ...responses,
        timestamp: new Date(new Date().getTime() + (5.5 * 60 * 60 * 1000)).toISOString(),
        sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      } as IntakeResponse

      const response = await fetch('/api/submit-intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeResponses),
      })

      if (response.ok) {
        // Track successful assessment completion
        track('Assessment Completed', {
          learnerType: responses.learnerType || 'unknown',
          skillStage: responses.skillStage || 0,
          currentRoles: responses.currentRoles?.join(',') || 'none'
        })
        setIsComplete(true)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Submission failed')
      }
    } catch (error) {
      console.error('Error submitting intake:', error)
      alert(`There was an error submitting your responses: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isComplete) {
    return (
      <div className="backdrop-blur-md bg-gray-900/80 rounded-3xl p-8 border border-gray-600/30 shadow-2xl text-center">
        <div className="text-green-600 mb-4">
          <span className="text-4xl">🎉</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Thank You!
        </h2>
        <p className="text-gray-600 mb-6">
          Your responses have been recorded successfully. You&apos;ll receive a tailored roadmap shortly.
        </p>
        <button
          onClick={() => {
            setIsComplete(false)
            setCurrentStep(1)
            setResponses({
              currentRoles: [],
              varkPreferences: {
                visual: 3,
                audio: 3,
                readingWriting: 3,
                kinesthetic: 3
              }
            })
            setValidationErrors({})
          }}
          className="btn-primary"
        >
          Start New Intake
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
      {/* Professional Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Step {currentStep} of {totalSteps}
            </h2>
            <p className="text-sm text-gray-500">Complete all sections for your personalized analysis</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </div>
            <div className="text-xs text-gray-500">Assessment Progress</div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        {/* Professional Step indicators */}
        <div className="flex justify-between mt-4">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                  i + 1 <= currentStep
                    ? 'bg-blue-600 text-white'
                    : i + 1 === currentStep + 1
                    ? 'bg-blue-100 text-blue-600 border-2 border-blue-600'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i + 1 < currentStep ? '✓' : i + 1}
              </div>
              <div className="text-xs text-gray-500 mt-1 text-center">
                {['Profile', 'Goals', 'Challenges', 'Preferences', 'Outcomes', 'Review'][i]}
              </div>
            </div>
          ))}
        </div>
        {/* Professional Validation Status */}
        {Object.keys(validationErrors).length > 0 && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center text-sm text-red-800">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Please complete all required fields before proceeding
            </div>
          </div>
        )}
      </div>

      {/* Form Steps */}
      {currentStep === 1 && (
        <Step1
          responses={responses}
          onInputChange={handleInputChange}
          validationErrors={validationErrors}
        />
      )}
      
      {currentStep === 2 && (
        <Step2
          responses={responses}
          onInputChange={handleInputChange}
          validationErrors={validationErrors}
        />
      )}
      
      {currentStep === 3 && (
        <Step3
          responses={responses}
          onInputChange={handleInputChange}
          validationErrors={validationErrors}
        />
      )}
      
      {currentStep === 4 && (
        <Step4
          responses={responses}
          onInputChange={handleInputChange}
          onVarkChange={handleVarkChange}
          validationErrors={validationErrors}
        />
      )}
      
      {currentStep === 5 && (
        <Step5
          responses={responses}
          onInputChange={handleInputChange}
          validationErrors={validationErrors}
        />
      )}
      
      {currentStep === 6 && (
        <Step6
          responses={responses}
          onInputChange={handleInputChange}
          validationErrors={validationErrors}
        />
      )}

      {/* Professional Navigation */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        
        {currentStep < totalSteps ? (
          <button
            onClick={nextStep}
            className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Continue
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Submit Assessment
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

// Step Components
function Step1({ responses, onInputChange, validationErrors = {} }: { responses: Partial<IntakeResponse>, onInputChange: (field: keyof IntakeResponse, value: any) => void, validationErrors?: {[key: string]: string} }) {
  return (
    <div>
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
          <span className="text-2xl">🧠</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Learner Profile & Self-Regulation</h2>
      </div>
      
      <div className="space-y-6">
        {/* Role Selection Question */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            Which of these sounds like your current role?
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              'BFSI',
              'Manufacturing', 
              'Sales & Marketing',
              'IT Consultancy'
            ].map((role) => (
              <label key={role} className="group">
                <input
                  type="checkbox"
                  checked={responses.currentRoles?.includes(role) || false}
                  onChange={(e) => {
                    const currentRoles = responses.currentRoles || []
                    if (e.target.checked) {
                      onInputChange('currentRoles', [...currentRoles, role])
                    } else {
                      onInputChange('currentRoles', currentRoles.filter(r => r !== role))
                    }
                  }}
                  className="sr-only"
                />
                <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  responses.currentRoles?.includes(role)
                    ? 'bg-blue-50 border-blue-300 shadow-md'
                    : 'bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm'
                }`}>
                  <span className={`font-bold text-lg ${
                    responses.currentRoles?.includes(role) ? 'text-blue-700' : 'text-gray-800'
                  }`}>{role}</span>
                  {responses.currentRoles?.includes(role) && (
                    <span className="float-right text-blue-600 font-bold text-xl">✓</span>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>
        
        <QuestionSlider
          label="How confident are you at setting your own learning goals and adjusting if stuck?"
          value={responses.goalSettingConfidence || 3}
          onChange={(value) => onInputChange('goalSettingConfidence', value)}
        />
        
        <QuestionSlider
          label="When faced with a learning challenge, how often do you try new approaches?"
          value={responses.newApproachesFrequency || 3}
          onChange={(value) => onInputChange('newApproachesFrequency', value)}
        />
        
        <QuestionSlider
          label="I reflect regularly on what I'm learning and how to improve."
          value={responses.reflectionFrequency || 3}
          onChange={(value) => onInputChange('reflectionFrequency', value)}
        />
        
        <QuestionSlider
          label="I feel confident using new AI/software tools for work."
          value={responses.aiToolsConfidence || 3}
          onChange={(value) => onInputChange('aiToolsConfidence', value)}
        />
        
        <QuestionSlider
          label="When progress stalls, I bounce back with renewed energy."
          value={responses.resilienceLevel || 3}
          onChange={(value) => onInputChange('resilienceLevel', value)}
        />
      </div>
    </div>
  )
}

function Step2({ responses, onInputChange, validationErrors = {} }: { responses: Partial<IntakeResponse>, onInputChange: (field: keyof IntakeResponse, value: any) => void, validationErrors?: {[key: string]: string} }) {
  return (
    <div>
      <div className="flex items-center mb-6">
        <span className="text-2xl mr-3">🎯</span>
        <h2 className="text-2xl font-bold text-gray-900">Aspirations & Motivation</h2>
      </div>
      
      <div className="space-y-6">
        <QuestionSlider
          label="I have a clear idea of where I want to go in my learning/career."
          value={responses.clearCareerVision || 3}
          onChange={(value) => onInputChange('clearCareerVision', value)}
        />
        
        <QuestionSlider
          label="I can describe what success looks like for me 1 year from now."
          value={responses.successDescription || 3}
          onChange={(value) => onInputChange('successDescription', value)}
        />
        
        <QuestionSlider
          label="I&apos;d engage in learning because it&apos;s challenging and interesting."
          value={responses.learningForChallenge || 3}
          onChange={(value) => onInputChange('learningForChallenge', value)}
        />
        
        <QuestionSlider
          label="My learning is driven by outcomes (promotion, income, recognition)."
          value={responses.outcomeDrivenLearning || 3}
          onChange={(value) => onInputChange('outcomeDrivenLearning', value)}
        />
      </div>
    </div>
  )
}

function Step3({ responses, onInputChange, validationErrors = {} }: { responses: Partial<IntakeResponse>, onInputChange: (field: keyof IntakeResponse, value: any) => void, validationErrors?: {[key: string]: string} }) {
  return (
    <div>
      <div className="flex items-center mb-6">
        <span className="text-2xl mr-3">⏰</span>
        <h2 className="text-2xl font-bold text-gray-900">Pain Points & Challenges</h2>
      </div>
      
      <div className="space-y-6">
        <QuestionSlider
          label="Finding consistent time to learn is a barrier for me."
          value={responses.timeBarrier || 3}
          onChange={(value) => onInputChange('timeBarrier', value)}
        />
        
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            What&apos;s most stressful or frustrating about learning new tools right now?
          </label>
          <textarea
            className="form-input h-24 resize-none"
            placeholder="Describe your current challenges..."
            value={responses.currentFrustrations || ''}
            onChange={(e) => onInputChange('currentFrustrations', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

function Step4({ 
  responses, 
  onInputChange, 
  onVarkChange,
  validationErrors 
}: { 
  responses: Partial<IntakeResponse>, 
  onInputChange: (field: keyof IntakeResponse, value: any) => void,
  onVarkChange: (type: keyof IntakeResponse['varkPreferences'], value: number) => void,
  validationErrors?: {[key: string]: string}
}) {
  return (
    <div>
      <div className="flex items-center mb-6">
        <span className="text-2xl mr-3">👤</span>
        <h2 className="text-2xl font-bold text-gray-900">Learner Type & Preferences</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            Which best describes you? <span className="text-red-600">*</span>
          </label>
          <div className="space-y-3">
            {[
              { value: 'theorist', label: 'Theorist/Assimilator (concepts first)' },
              { value: 'activist', label: 'Activist/Accommodator (dive into action)' },
              { value: 'reflector', label: 'Reflector/Diverger (observe + reflect)' },
              { value: 'pragmatist', label: 'Pragmatist/Converger (problem-first, practical)' }
            ].map((option) => (
              <label key={option.value} className="flex items-center text-gray-900 font-medium">
                <input
                  type="radio"
                  name="learnerType"
                  value={option.value}
                  checked={responses.learnerType === option.value}
                  onChange={(e) => onInputChange('learnerType', e.target.value)}
                  className="mr-3 text-purple-500 focus:ring-purple-400"
                />
                {option.label}
              </label>
            ))}
          </div>
          {validationErrors?.learnerType && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <span className="mr-1">⚠️</span>
              {validationErrors.learnerType}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">VARK Learning Preferences (rate 1-5 each)</label>
          <div className="space-y-4">
            <QuestionSlider
              label="Visual"
              value={responses.varkPreferences?.visual || 3}
              onChange={(value) => onVarkChange('visual', value)}
            />
            <QuestionSlider
              label="Audio"
              value={responses.varkPreferences?.audio || 3}
              onChange={(value) => onVarkChange('audio', value)}
            />
            <QuestionSlider
              label="Reading-Writing"
              value={responses.varkPreferences?.readingWriting || 3}
              onChange={(value) => onVarkChange('readingWriting', value)}
            />
            <QuestionSlider
              label="Kinesthetic"
              value={responses.varkPreferences?.kinesthetic || 3}
              onChange={(value) => onVarkChange('kinesthetic', value)}
            />
          </div>
        </div>
        
        <QuestionSlider
          label="Skill Stage (Dreyfus): Novice → Expert"
          value={responses.skillStage || 3}
          onChange={(value) => onInputChange('skillStage', value)}
        />
      </div>
    </div>
  )
}

function Step5({ responses, onInputChange, validationErrors = {} }: { responses: Partial<IntakeResponse>, onInputChange: (field: keyof IntakeResponse, value: any) => void, validationErrors?: {[key: string]: string} }) {
  return (
    <div>
      <div className="flex items-center mb-6">
        <span className="text-2xl mr-3">🏆</span>
        <h2 className="text-2xl font-bold text-gray-900">Gains & Outcomes</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            What concrete benefits will make this journey worthwhile?
          </label>
          <textarea
            className="form-input h-24 resize-none"
            placeholder="Describe the benefits you're seeking..."
            value={responses.concreteBenefits || ''}
            onChange={(e) => onInputChange('concreteBenefits', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            Where do you want to apply these skills in the short term?
          </label>
          <textarea
            className="form-input h-24 resize-none"
            placeholder="Describe your short-term application goals..."
            value={responses.shortTermApplication || ''}
            onChange={(e) => onInputChange('shortTermApplication', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

function Step6({ responses, onInputChange, validationErrors = {} }: { responses: Partial<IntakeResponse>, onInputChange: (field: keyof IntakeResponse, value: any) => void, validationErrors?: {[key: string]: string} }) {
  return (
    <div>
      <div className="flex items-center mb-6">
        <span className="text-2xl mr-3">🧠</span>
        <h2 className="text-2xl font-bold text-gray-900">Review & Submit</h2>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-600 mb-6">
          Please review your responses before submitting. You can go back to any previous step to make changes.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Summary of Your Responses:</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Goal Setting Confidence: {responses.goalSettingConfidence || 'Not answered'}/5</p>
            <p>• Learning Approach Frequency: {responses.newApproachesFrequency || 'Not answered'}/5</p>
            <p>• Reflection Frequency: {responses.reflectionFrequency || 'Not answered'}/5</p>
            <p>• AI Tools Confidence: {responses.aiToolsConfidence || 'Not answered'}/5</p>
            <p>• Resilience Level: {responses.resilienceLevel || 'Not answered'}/5</p>
            <p>• Learner Type: {responses.learnerType ? (
              <span className="text-green-600 font-medium">{responses.learnerType}</span>
            ) : (
              <span className="text-red-500 font-medium">Not selected - Required!</span>
            )}</p>
            <p>• Skill Stage: {responses.skillStage || 'Not answered'}/5</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Reusable Components
function QuestionSlider({ label, value, onChange, error }: { label: string, value: number, onChange: (value: number) => void, error?: string }) {
  return (
    <div className={`p-6 rounded-xl border transition-all duration-300 ${
      error ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200 hover:bg-gray-50'
    }`}>
      <label className="block text-lg font-semibold text-gray-900 mb-4">{label}</label>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700 w-8 font-semibold">1</span>
        <div className="flex-1 relative">
          <input
            type="range"
            min="1"
            max="5"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider-modern"
            style={{
              background: `linear-gradient(to right, rgb(37 99 235) 0%, rgb(59 130 246) ${((value - 1) / 4) * 100}%, rgb(229 231 235) ${((value - 1) / 4) * 100}%, rgb(229 231 235) 100%)`
            }}
          />
        </div>
        <span className="text-sm text-gray-700 w-8 font-semibold">5</span>
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-lg font-bold text-white">{value}</span>
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-600 font-medium mt-3">
        <span>Strongly Disagree</span>
        <span>Strongly Agree</span>
      </div>
      {error && (
        <div className="mt-3 p-2 bg-red-500/20 border border-red-400/30 rounded-lg">
          <p className="text-red-700 text-sm flex items-center font-medium">
            <span className="mr-2">⚠️</span>
            {error}
          </p>
        </div>
      )}
    </div>
  )
}
