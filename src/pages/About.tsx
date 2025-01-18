import React from 'react';
import { Users, Target, Shield, Sparkles, Award, Heart } from 'lucide-react';

const values = [
  {
    icon: Users,
    title: 'People First',
    description: 'We believe in putting people at the center of everything we do, creating technology that serves human needs and aspirations.'
  },
  {
    icon: Target,
    title: 'Precision Matching',
    description: 'Our AI-driven approach ensures precise matches between candidates and opportunities, going beyond traditional job matching.'
  },
  {
    icon: Shield,
    title: 'Trust & Privacy',
    description: 'We maintain the highest standards of data protection and transparency, ensuring your information is always secure and respected.'
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    description: "We continuously push the boundaries of what's possible in career development and job searching through cutting-edge technology."
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in every aspect of our service, from user experience to the accuracy of our matching algorithms.'
  },
  {
    icon: Heart,
    title: 'Empowerment',
    description: "We're committed to empowering individuals to take control of their career journey and achieve their professional goals."
  }
];

const stats = [
  { value: '2M+', label: 'Active Users' },
  { value: '150K+', label: 'Companies' },
  { value: '95%', label: 'Match Accuracy' },
  { value: '89%', label: 'User Satisfaction' }
];

const team = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-founder',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    name: 'Aisha Patel',
    role: 'Head of AI',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    name: 'David Kim',
    role: 'Head of Product',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200'
  }
];

export function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-primary/5 py-24">
        <div className="absolute inset-0 bg-grid-primary/5" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Transforming How People Find Their Dream Jobs
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            We're on a mission to revolutionize the job search experience through AI-powered matching and personalized career guidance.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted max-w-2xl mx-auto">
              These core values guide everything we do, from product development to customer service.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Team</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Meet the passionate individuals behind JobFantastic who are dedicated to transforming the way people find their dream jobs.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-background"
                  />
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Join Us in Shaping the Future of Work
          </h2>
          <p className="text-muted mb-8">
            Whether you're looking for your next career move or want to be part of our journey, we'd love to connect with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Get Started
            </button>
            <button
              onClick={() => window.location.href = '/contact'}
              className="px-6 py-3 bg-card text-foreground border border-border rounded-lg hover:bg-muted/10"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}