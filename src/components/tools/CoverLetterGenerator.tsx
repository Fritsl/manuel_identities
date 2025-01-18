import React, { useState } from 'react';
import { Send, Loader2, Copy, CheckCircle, Sliders } from 'lucide-react';

interface ToneOption {
  value: 'formal' | 'semi-formal' | 'casual';
  label: string;
  description: string;
}

interface LengthOption {
  value: 'brief' | 'standard' | 'detailed';
  label: string;
  description: string;
}

const toneOptions: ToneOption[] = [
  {
    value: 'formal',
    label: 'Formal',
    description: 'Professional and traditional, suitable for corporate environments'
  },
  {
    value: 'semi-formal',
    label: 'Semi-Formal',
    description: 'Professional yet approachable, good for most situations'
  },
  {
    value: 'casual',
    label: 'Casual',
    description: 'Friendly and conversational, ideal for startups and creative fields'
  }
];

const lengthOptions: LengthOption[] = [
  {
    value: 'brief',
    label: 'Brief',
    description: '150-200 words, perfect for quick introductions'
  },
  {
    value: 'standard',
    label: 'Standard',
    description: '250-300 words, ideal for most situations'
  },
  {
    value: 'detailed',
    label: 'Detailed',
    description: '400-500 words, comprehensive background and achievements'
  }
];

export function CoverLetterGenerator() {
  const [tone, setTone] = useState<ToneOption['value']>('semi-formal');
  const [length, setLength] = useState<LengthOption['value']>('standard');
  const [generatedText, setGeneratedText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Example generated text based on tone and length
    const texts = {
      formal: {
        brief: `I am a seasoned software developer with over 8 years of experience in full-stack development. My expertise lies in building scalable web applications using modern technologies such as React, Node.js, and cloud platforms. Throughout my career, I have consistently delivered high-impact solutions that drive business growth and improve user experience.`,
        standard: `I am writing to express my keen interest in contributing my expertise to your organization. As a seasoned software developer with over 8 years of experience in full-stack development, I have consistently delivered scalable solutions that drive business growth and enhance user experience.

My technical proficiency spans modern web technologies, including React, Node.js, and various cloud platforms. I have successfully led multiple projects from conception to deployment, demonstrating strong problem-solving abilities and attention to detail.

I am particularly drawn to your company's innovative approach to technology solutions and would welcome the opportunity to contribute to your team's continued success.`,
        detailed: `I am writing to express my keen interest in contributing my expertise to your organization. As a seasoned software developer with over 8 years of experience in full-stack development, I have consistently delivered scalable solutions that drive business growth and enhance user experience.

My technical proficiency spans modern web technologies, including React, Node.js, and various cloud platforms. I have successfully led multiple projects from conception to deployment, demonstrating strong problem-solving abilities and attention to detail.

In my current role at TechCorp Solutions, I spearheaded the development of a cloud-native microservices platform that reduced system latency by 40% and improved user satisfaction scores by 25%. I also mentored junior developers and established best practices that increased team productivity by 30%.

I am particularly drawn to your company's innovative approach to technology solutions and would welcome the opportunity to contribute to your team's continued success. My experience in optimizing development workflows and implementing efficient architectures aligns perfectly with your organization's goals.

I am excited about the possibility of bringing my technical expertise and leadership experience to your team and would appreciate the opportunity to discuss how I can contribute to your organization's success.`
      },
      'semi-formal': {
        brief: `Hey there! I'm a passionate software developer with 8+ years of experience building awesome web applications. I love working with React, Node.js, and cloud technologies to create solutions that make a real difference. I'm always excited to take on new challenges and collaborate with talented teams.`,
        standard: `Hi! I'm excited to introduce myself as a passionate software developer with over 8 years of experience in creating impactful web applications. I specialize in modern technologies like React and Node.js, and I love solving complex problems with elegant solutions.

Throughout my career, I've had the opportunity to work on diverse projects that have sharpened my technical skills and taught me the importance of collaboration. I'm particularly proud of leading teams and mentoring junior developers while maintaining a hands-on approach to coding.

I'm really impressed by your company's work and would love to be part of your innovative team!`,
        detailed: `Hi! I'm excited to introduce myself as a passionate software developer with over 8 years of experience in creating impactful web applications. I specialize in modern technologies like React and Node.js, and I love solving complex problems with elegant solutions.

Throughout my career, I've had the opportunity to work on diverse projects that have sharpened my technical skills and taught me the importance of collaboration. At TechCorp Solutions, I led the development of a game-changing microservices platform that made our systems 40% faster and got great feedback from users.

I'm really proud of my work in mentoring other developers and creating better ways of working together. It's amazing to see how small improvements in how we work can make such a big difference in what we achieve as a team.

I've been following your company's journey and I'm genuinely excited about the innovative work you're doing. I'd love to bring my experience and enthusiasm to your team and help create amazing solutions together.

What really draws me to your company is how you're pushing the boundaries of what's possible in tech. I'd be thrilled to contribute my skills and learn from your talented team. Let's create something awesome together!`
      },
      casual: {
        brief: `👋 Tech enthusiast here! I love building cool stuff with React and Node.js, and I've been doing it for 8+ years now. I'm all about creating awesome user experiences and working with great people. Always up for learning new things and sharing what I know!`,
        standard: `👋 Hey there! Super excited to connect! I'm a tech enthusiast who's been building cool stuff on the web for over 8 years now. React and Node.js are my jam, and I absolutely love creating things that make people's lives easier.

🚀 I've worked on some pretty exciting projects, from building speedy web apps to setting up cloud systems that handle tons of users. But what really gets me going is working with awesome people and learning new things every day.

✨ I've checked out what you're doing and I'm totally impressed! Would love to bring my energy and experience to your team!`,
        detailed: `👋 Hey there! Super excited to connect! I'm a tech enthusiast who's been building cool stuff on the web for over 8 years now. React and Node.js are my jam, and I absolutely love creating things that make people's lives easier.

🚀 I've worked on some pretty exciting projects, from building speedy web apps to setting up cloud systems that handle tons of users. At my current gig with TechCorp Solutions, I got to lead this awesome project where we made everything 40% faster - our users loved it!

💡 One thing that really drives me is helping other developers level up their skills. There's nothing better than seeing someone nail a concept you helped them understand. Plus, I'm always learning new things myself - tech never stands still, right?

✨ I've been following what you're doing and I'm totally impressed! Your approach to innovation is exactly what I'm looking for. I'd love to bring my experience and enthusiasm to your team and help create some amazing things together.

🤝 I'm really excited about the possibility of joining forces with your crew. Let's chat about how we can create awesome stuff together! Always up for a good tech conversation! 😊`
      }
    };

    setGeneratedText(texts[tone][length]);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">Cover Letter & Profile Generator</h2>
          <p className="text-muted">
            Generate a personalized cover letter or profile introduction based on your preferences.
          </p>
        </div>

        {/* Settings */}
        <div className="space-y-6">
          {/* Tone Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Select Tone
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {toneOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTone(option.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-colors
                    ${tone === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/30 hover:bg-primary/5'}`}
                >
                  <h3 className="font-medium text-foreground">{option.label}</h3>
                  <p className="text-sm text-muted mt-1">{option.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Length Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Select Length
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {lengthOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setLength(option.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-colors
                    ${length === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/30 hover:bg-primary/5'}`}
                >
                  <h3 className="font-medium text-foreground">{option.label}</h3>
                  <p className="text-sm text-muted mt-1">{option.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 
              ${isGenerating
                ? 'bg-muted/20 text-muted cursor-not-allowed'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            Generate Text
          </button>
        </div>

        {/* Generated Content */}
        {generatedText && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-foreground">Generated Text</h3>
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
            <div className="bg-primary/5 rounded-lg p-4 whitespace-pre-wrap text-foreground">
              {generatedText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}