import React from 'react';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { ResumeEntry } from '../../types/resume';

interface ResumeTimelineEntryIconProps {
  type: ResumeEntry['type'];
}

export function ResumeTimelineEntryIcon({ type }: ResumeTimelineEntryIconProps) {
  const getIcon = () => {
    switch (type) {
      case 'Work':
        return <Briefcase className="w-5 h-5" />;
      case 'Education':
        return <GraduationCap className="w-5 h-5" />;
      case 'Other':
        return <Award className="w-5 h-5" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'Work':
        return 'bg-blue-100 text-blue-600';
      case 'Education':
        return 'bg-green-100 text-green-600';
      case 'Other':
        return 'bg-purple-100 text-purple-600';
    }
  };

  return (
    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getBackgroundColor()}`}>
      {getIcon()}
    </div>
  );
}