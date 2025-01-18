import React, { useState } from 'react';
import { Send, Loader2, Copy, CheckCircle } from 'lucide-react';

interface PostTemplate {
  title: string;
  template: string;
}

const postTemplates: PostTemplate[] = [
  {
    title: 'Career Achievement',
    template: "Excited to share that I've [achievement]! This milestone [impact]. Grateful for [acknowledgment]. #CareerGrowth #Professional"
  },
  {
    title: 'Industry Insight',
    template: "Here's what I've learned about [topic]: [3 key points]. What's your experience with this? #TechInsights #Innovation"
  },
  {
    title: 'Project Launch',
    template: "Thrilled to announce the launch of [project]! [Key feature] will help [target audience] to [benefit]. Learn more: [link] #Launch #Tech"
  }
];

const hotTopics = [
  '#ArtificialIntelligence',
  '#CloudComputing',
  '#DevOps',
  '#CyberSecurity',
  '#RemoteWork',
  '#TechInnovation'
];

export function LinkedInPostGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<PostTemplate | null>(null);
  const [generatedPost, setGeneratedPost] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = async () => {
    if (!selectedTemplate) return;
    
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Example generated post based on template
    const posts = {
      'Career Achievement': `Excited to share that I've just completed a major cloud migration project! This milestone helped our company reduce infrastructure costs by 40% while improving system reliability. Grateful for my amazing team who made this possible. #CloudComputing #TechSuccess #Innovation`,
      'Industry Insight': `Here's what I've learned about modern web development in 2024:

1. Component-driven architecture is becoming the standard
2. Edge computing is revolutionizing app performance
3. AI-assisted development is boosting productivity

What trends are you seeing in your work? Let's discuss! #WebDev #TechTrends #Innovation`,
      'Project Launch': `Thrilled to announce the launch of our new microservices platform! Our innovative scaling solution will help enterprise clients handle 10x more traffic with 40% less latency. 

Check out the case study: [link]

#Microservices #CloudNative #TechInnovation`
    };

    setGeneratedPost(posts[selectedTemplate.title as keyof typeof posts]);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPost);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">LinkedIn Post Generator</h2>
          <p className="text-muted">
            Generate engaging LinkedIn posts based on your profile and current industry trends.
          </p>
        </div>

        {/* Template Selection */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-foreground">
            Choose a template
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {postTemplates.map((template) => (
              <button
                key={template.title}
                onClick={() => setSelectedTemplate(template)}
                className={`p-4 rounded-lg border-2 text-left transition-colors
                  ${selectedTemplate?.title === template.title
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/30 hover:bg-primary/5'}`}
              >
                <h3 className="font-medium text-foreground">{template.title}</h3>
                <p className="text-sm text-muted mt-1">
                  {template.template.substring(0, 50)}...
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Hot Topics */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Trending Topics in Your Field</h3>
          <div className="flex flex-wrap gap-2">
            {hotTopics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1 bg-primary/5 text-foreground rounded-full text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={!selectedTemplate || isGenerating}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 
              ${!selectedTemplate || isGenerating
                ? 'bg-muted/20 text-muted cursor-not-allowed'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            Generate Post
          </button>
        </div>

        {/* Generated Content */}
        {generatedPost && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-foreground">Generated Post</h3>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/90"
              >
                {isCopied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy to clipboard
                  </>
                )}
              </button>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 whitespace-pre-wrap font-medium text-foreground">
              {generatedPost}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}