import React from 'react';
import { Sparkles, Target, Briefcase, Building2, Wrench, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Sparkles,
    title: 'Create Your Profile',
    description: 'Fill out your profile with your experience, preferences, and career goals. Our AI analyzes your inputs to understand your unique needs.'
  },
  {
    icon: Target,
    title: 'Get Matched',
    description: 'Our advanced matching algorithm finds the best jobs and companies that align with your profile, skills, and career aspirations.'
  },
  {
    icon: Briefcase,
    title: 'Explore Jobs',
    description: 'Browse through personalized job recommendations, complete with detailed insights about why each position might be a good fit for you.'
  },
  {
    icon: Building2,
    title: 'Research Companies',
    description: 'Discover companies that match your values and work style, with in-depth analysis of company culture and environment.'
  },
  {
    icon: Wrench,
    title: 'Use Professional Tools',
    description: 'Access AI-powered tools to create cover letters, optimize your LinkedIn presence, and enhance your job search.'
  }
];

export function HowItWorks() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">How JobFantastic Works</h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Your AI-powered career companion that helps you find the perfect job match
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start gap-6 bg-card p-6 rounded-lg border border-border"
            >
              <div className="md:w-16 flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex-grow space-y-2">
                <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="text-muted">{step.description}</p>
              </div>
              <div className="hidden md:block">
                <ArrowRight className="w-6 h-6 text-primary" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center space-y-6 pt-8">
          <h2 className="text-2xl font-semibold text-foreground">
            Ready to find your perfect job?
          </h2>
          <button
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}