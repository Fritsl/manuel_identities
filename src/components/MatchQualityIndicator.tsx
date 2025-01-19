import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MatchQualityIndicatorProps {
  matchQuality: number;
  remainingPages: number;
}

export function MatchQualityIndicator({ matchQuality, remainingPages }: MatchQualityIndicatorProps) {
  // If match quality is 100%, don't render anything
  if (matchQuality === 100) {
    return null;
  }

  const [animatedValue, setAnimatedValue] = useState(matchQuality);
  const navigate = useNavigate();
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  
  useEffect(() => {
    const startValue = animatedValue;
    const endValue = matchQuality;
    const duration = 1000;
    const startTime = performance.now();

    const animateValue = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);
      const currentValue = startValue + (endValue - startValue) * easedProgress;
      setAnimatedValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animateValue);
      }
    };

    requestAnimationFrame(animateValue);
  }, [matchQuality]);

  const matchedStroke = (circumference * animatedValue) / 100;
  const unmatchedStroke = circumference - matchedStroke;

  const handleSearchClick = () => {
    if (animatedValue >= 60) {
      navigate('/jobs');
    }
  };

  return (
    <div className="bg-card rounded-lg p-4 md:p-6">
      <div className="flex flex-col items-start space-y-6">
        <div className="flex items-center space-x-1 pl-2">
          <Zap className="w-6 h-6 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Match Quality</h3>
        </div>
        
        <div className="relative w-[100px] h-[100px] self-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="20"
              className="text-secondary"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="20"
              strokeDasharray={`${matchedStroke} ${unmatchedStroke}`}
              className="text-primary transition-all duration-1000 ease-out"
            />
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">
              {Math.round(animatedValue)}%
            </span>
          </div>
        </div>
        
        <button
          onClick={handleSearchClick}
          className={`w-full px-6 py-3 rounded-lg text-center
            ${animatedValue < 60
              ? 'bg-secondary text-secondary-foreground cursor-not-allowed'
              : 'bg-primary text-primary-foreground hover:bg-primary'}`}
          disabled={animatedValue < 60}
        >
          {animatedValue < 60
            ? 'Complete at least 60% of your profile for magic'
            : 'Find Matching Jobs'}
        </button>
      </div>
    </div>
  );
}