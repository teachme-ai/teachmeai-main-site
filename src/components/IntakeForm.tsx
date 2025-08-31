'use client'

import { useState } from 'react'
import { IntakeResponse } from '@/types'

export default function IntakeForm() {
  const [currentStep, setCurrentStep] = useState(1)
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
        timestamp: new Date().toISOString(),
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
      <div className="card text-center">
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
    <div className="card">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        {/* Validation Status */}
        {Object.keys(validationErrors).length > 0 && (
          <div className="mt-2 text-sm text-red-600 flex items-center">
            <span className="mr-1">⚠️</span>
            Please fix validation errors before proceeding
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

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        {currentStep < totalSteps ? (
          <button
            onClick={nextStep}
            className="btn-primary flex items-center"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn-primary flex items-center disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Intake'}
            →
          </button>
        )}
      </div>
    </div>
  )
}

// Step Components
function Step1({ responses, onInputChange }: { responses: Partial<IntakeResponse>, onInputChange: (field: keyof IntakeResponse, value: any) => void }) {
  return (
    <div>
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center mr-4 shadow-lg">
          <span className="text-2xl">🧠</span>
        </div>
        <h2 className="text-3xl font-bold text-white drop-shadow-lg">Learner Profile & Self-Regulation</h2>
      </div>
      
      <div className="space-y-6">
        {/* Role Selection Question */}
        <div>
          <label className="block text-xl font-bold text-white mb-4 drop-shadow-lg">
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
                <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                  responses.currentRoles?.includes(role)
                    ? 'bg-gradient-to-r from-purple-500/70 to-pink-500/70 border-purple-300 shadow-lg transform scale-105'
                    : 'bg-white/40 border-white/50 hover:bg-white/60 hover:border-white/70 hover:shadow-md'
                }`}>
                  <span className="text-gray-900 font-bold text-lg">{role}</span>
                  {responses.currentRoles?.includes(role) && (
                    <span className="float-right text-green-600 font-bold text-xl">✓</span>
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

function Step2({ responses, onInputChange }: { responses: Partial<IntakeResponse>, onInputChange: (field: keyof IntakeResponse, value: any) => void }) {
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

function Step3({ responses, onInputChange }: { responses: Partial<IntakeResponse>, onInputChange: (field: keyof IntakeResponse, value: any) => void }) {
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
          <label className="form-label">
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
  validationErrors: {[key: string]: string}
}) {
  return (
    <div>
      <div className="flex items-center mb-6">
        <span className="text-2xl mr-3">👤</span>
        <h2 className="text-2xl font-bold text-gray-900">Learner Type & Preferences</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="form-label">
            Which best describes you? <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {[
              { value: 'theorist', label: 'Theorist/Assimilator (concepts first)' },
              { value: 'activist', label: 'Activist/Accommodator (dive into action)' },
              { value: 'reflector', label: 'Reflector/Diverger (observe + reflect)' },
              { value: 'pragmatist', label: 'Pragmatist/Converger (problem-first, practical)' }
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="learnerType"
                  value={option.value}
                  checked={responses.learnerType === option.value}
                  onChange={(e) => onInputChange('learnerType', e.target.value)}
                  className="mr-3 text-primary-600 focus:ring-primary-500"
                />
                {option.label}
              </label>
            ))}
          </div>
          {validationErrors.learnerType && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <span className="mr-1">⚠️</span>
              {validationErrors.learnerType}
            </p>
          )}
        </div>
        
        <div>
          <label className="form-label">VARK Learning Preferences (rate 1-5 each)</label>
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

function Step5({ responses, onInputChange }: { responses: Partial<IntakeResponse>, onInputChange: (field: keyof IntakeResponse, value: any) => void }) {
  return (
    <div>
      <div className="flex items-center mb-6">
        <span className="text-2xl mr-3">🏆</span>
        <h2 className="text-2xl font-bold text-gray-900">Gains & Outcomes</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="form-label">
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
          <label className="form-label">
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

function Step6({ responses, onInputChange }: { responses: Partial<IntakeResponse>, onInputChange: (field: keyof IntakeResponse, value: any) => void }) {
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
    <div className={`p-6 rounded-xl border backdrop-blur-sm hover:bg-white/10 transition-all duration-300 ${
      error ? 'bg-red-500/10 border-red-400/50' : 'bg-white/5 border-white/10'
    }`}>
      <label className="block text-lg font-bold text-white mb-4 drop-shadow-lg">{label}</label>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-white w-8 font-bold drop-shadow-sm">1</span>
        <div className="flex-1 relative">
          <input
            type="range"
            min="1"
            max="5"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider-modern"
            style={{
              background: `linear-gradient(to right, rgb(168 85 247) 0%, rgb(236 72 153) ${((value - 1) / 4) * 100}%, rgba(255,255,255,0.2) ${((value - 1) / 4) * 100}%, rgba(255,255,255,0.2) 100%)`
            }}
          />
        </div>
        <span className="text-sm text-white w-8 font-bold drop-shadow-sm">5</span>
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-lg font-bold text-white">{value}</span>
        </div>
      </div>
      <div className="flex justify-between text-sm text-white font-medium mt-3 drop-shadow-sm">
        <span>Strongly Disagree</span>
        <span>Strongly Agree</span>
      </div>
      {error && (
        <div className="mt-3 p-2 bg-red-500/20 border border-red-400/30 rounded-lg">
          <p className="text-red-100 text-sm flex items-center font-medium">
            <span className="mr-2">⚠️</span>
            {error}
          </p>
        </div>
      )}
    </div>
  )
}
