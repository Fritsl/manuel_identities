import React, { useState } from 'react';
import { CompleteButton } from '../CompleteButton';
import { environmentDescriptions } from '../../data/environmentLookup';
import { useProfile } from '../../contexts/ProfileContext';

interface EnvironmentFormData {
  workplaceSocialization: number;
  workPaceStructure: number;
  learningDevelopment: number;
  autonomySupport: number;
  compensationIncentives: number;
  workLifeIntegration: number;
  culturalEngagement: number;
  qualificationsCredentials: number;
  adaptabilityChange: number;
}

interface EnvironmentFormProps {
  data: EnvironmentFormData;
  onChange: (data: EnvironmentFormData) => void;
  onComplete: () => void;
  isCompleted?: boolean;
}

export function EnvironmentForm({ data, onChange, onComplete, isCompleted }: EnvironmentFormProps) {
  const { handleComplete } = useProfile();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await handleComplete('environment', onComplete);
    } catch (error) {
      console.error('Error saving environment preferences:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderSlider = (
    title: string,
    field: keyof EnvironmentFormData,
    leftLabel: string,
    rightLabel: string
  ) => (
    <div className="bg-card p-6 rounded-lg border border-border space-y-4">
      <h3 className="font-medium text-foreground">{title}</h3>
      <div className="bg-secondary p-3 rounded-lg">
        <p className="text-sm text-white">
          {environmentDescriptions[field][data[field] as 1 | 2 | 3 | 4 | 5]}
        </p>
      </div>
      <div className="space-y-3">
        <style>
          {`
            input[type="range"] {
              -webkit-appearance: none;
              appearance: none;
              background: transparent;
              cursor: pointer;
            }

            input[type="range"]::-webkit-slider-runnable-track {
              background: hsl(199 91% 48%);
              height: 8px;
              border-radius: 4px;
            }

            input[type="range"]::-moz-range-track {
              background: hsl(199 91% 48%);
              height: 8px;
              border-radius: 4px;
            }

            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              margin-top: -4px;
              background-color: hsl(15 100% 60%);
              height: 16px;
              width: 16px;
              border-radius: 50%;
              border: 2px solid white;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            input[type="range"]::-moz-range-thumb {
              border: none;
              background-color: hsl(15 100% 60%);
              height: 16px;
              width: 16px;
              border-radius: 50%;
              border: 2px solid white;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            input[type="range"]:focus {
              outline: none;
            }

            input[type="range"]:focus::-webkit-slider-thumb {
              box-shadow: 0 0 0 2px hsl(15 100% 60% / 0.2);
            }

            input[type="range"]:focus::-moz-range-thumb {
              box-shadow: 0 0 0 2px hsl(15 100% 60% / 0.2);
            }
          `}
        </style>
        <input
          type="range"
          min="1"
          max="5"
          value={data[field]}
          onChange={(e) => onChange({ ...data, [field]: parseInt(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted">
          <span className="max-w-[120px] text-left">{leftLabel}</span>
          <span className="max-w-[120px] text-right">{rightLabel}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {renderSlider(
          "Workplace Socialization",
          "workplaceSocialization",
          "Independent work with minimal team interaction",
          "Strong community with frequent social events"
        )}
        
        {renderSlider(
          "Work Pace & Structure",
          "workPaceStructure",
          "Steady and predictable workflow",
          "Dynamic and adaptive environment"
        )}
        
        {renderSlider(
          "Learning & Development Focus",
          "learningDevelopment",
          "Stable skill set with minimal upskilling",
          "Continuous learning and training"
        )}
        
        {renderSlider(
          "Autonomy & Support",
          "autonomySupport",
          "High independence in decision-making",
          "Structured mentorship and guidance"
        )}
        
        {renderSlider(
          "Compensation & Incentives",
          "compensationIncentives",
          "Fixed, predictable salary",
          "Performance-based rewards"
        )}
        
        {renderSlider(
          "Work-Life Integration",
          "workLifeIntegration",
          "Clear separation between work and personal life",
          "Flexible integration of work and life"
        )}
        
        {renderSlider(
          "Cultural Engagement",
          "culturalEngagement",
          "Task-focused with minimal cultural involvement",
          "Rich cultural environment with active participation"
        )}
        
        {renderSlider(
          "Qualifications & Credentials",
          "qualificationsCredentials",
          "Experience-based practical skills",
          "Formal degrees and certifications"
        )}
        
        {renderSlider(
          "Adaptability to Change",
          "adaptabilityChange",
          "Established routines and stability",
          "Rapid adaptation and innovation"
        )}
      </div>

      <div className="flex justify-end">
        <CompleteButton
          onComplete={handleSave}
          isCompleted={isCompleted}
          isDisabled={isSaving}
        />
      </div>
    </div>
  );
}