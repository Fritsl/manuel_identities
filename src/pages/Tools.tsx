import React from 'react';
import { FileText, Linkedin } from 'lucide-react';
import { LinkedInPostGenerator } from '../components/tools/LinkedInPostGenerator';
import { CoverLetterGenerator } from '../components/tools/CoverLetterGenerator';
import { ProgressBar } from '../components/ProgressBar';
import { useProfile } from '../contexts/ProfileContext';

interface Tool {
  name: string;
  description: string;
  icon: React.ReactNode;
  component?: React.ReactNode;
}

const tools: Tool[] = [
  {
    name: 'Cover Letter Generator',
    description: 'Create personalized cover letters and profile introductions based on your preferences.',
    icon: <FileText className="w-8 h-8 text-primary" />,
    component: <CoverLetterGenerator />
  },
  {
    name: 'LinkedIn Post Generator',
    description: 'Create engaging LinkedIn posts based on your profile and industry trends.',
    icon: <Linkedin className="w-8 h-8 text-primary" />,
    component: <LinkedInPostGenerator />
  }
];

export function Tools() {
  const { progress, matchQuality } = useProfile();

  return (
    <div className="flex-1 flex justify-center bg-background">
      <div className="w-full max-w-7xl p-4 md:p-8 space-y-6">
        <ProgressBar progress={progress} matchQuality={matchQuality} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <div key={tool.name}>
              {tool.component ? (
                tool.component
              ) : (
                <div className="bg-card rounded-lg border border-border p-6 hover:border-primary/30 transition-colors group">
                  <div className="space-y-4">
                    <div className="p-3 bg-primary/5 rounded-lg w-fit group-hover:bg-primary/10 transition-colors">
                      {tool.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-muted">{tool.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}