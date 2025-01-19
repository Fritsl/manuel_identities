import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { PartyPopper, Briefcase, Building2, Wrench, ArrowRight, Trophy } from 'lucide-react';

export function ProfileComplete() {
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const features = [
    {
      icon: Briefcase,
      title: 'Job Search',
      description: 'Find your perfect job match with our AI-powered search',
      onClick: () => navigate('/jobs')
    },
    {
      icon: Building2,
      title: 'Company Search',
      description: 'Discover companies that align with your values and goals',
      onClick: () => navigate('/companies')
    },
    {
      icon: Wrench,
      title: 'Tools',
      description: 'Access professional tools to enhance your job search',
      onClick: () => navigate('/tools')
    }
  ];

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center p-4">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={200}
        gravity={0.2}
      />
      
      <div className="max-w-3xl w-full space-y-8 text-center">
        {/* Celebration Header */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-4 rounded-full">
              <Trophy className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            Congratulations! 🎉
          </h1>
          <p className="text-xl text-muted">
            Your profile is now complete and you've unlocked all features
          </p>
        </div>

        {/* Unlocked Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={feature.onClick}
              className="group bg-card p-6 rounded-lg border border-border hover:border-primary/30 transition-all space-y-4"
            >
              <div className="flex justify-center">
                <div className="p-3 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted">
                  {feature.description}
                </p>
              </div>
              <div className="pt-2 flex justify-center">
                <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>

        {/* Update Notice */}
        <div className="pt-8">
          <p className="text-muted">
            You can always return to your profile to make updates or changes
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-primary hover:text-primary/90 font-medium inline-flex items-center gap-2"
          >
            Update Profile
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}