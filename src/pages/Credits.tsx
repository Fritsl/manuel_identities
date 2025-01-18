import React from 'react';
import { Coins, Zap, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';
import { useProfile } from '../contexts/ProfileContext';

const tiers = [
  {
    name: 'Starter',
    price: 29,
    credits: 500,
    features: [
      'Basic AI assistance',
      'Cover letter generation',
      'LinkedIn post creation',
      'Email support'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: 79,
    credits: 2000,
    features: [
      'Advanced AI assistance',
      'Priority support',
      'Custom templates',
      'Analytics dashboard',
      'Team collaboration'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 199,
    credits: 5000,
    features: [
      'Unlimited AI assistance',
      'Dedicated account manager',
      'Custom integrations',
      'API access',
      'Advanced analytics',
      'White-label options'
    ],
    popular: false
  }
];

export function Credits() {
  const { progress, matchQuality } = useProfile();
  const currentCredits = 150;
  const subscriptionEnd = new Date('2024-04-15');

  return (
    <div className="flex-1 flex justify-center bg-background">
      <div className="w-full max-w-7xl p-4 md:p-8 space-y-8">
        <ProgressBar progress={progress} matchQuality={matchQuality} />

        {/* Current Credits Status */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-lg border border-primary/20 p-6 md:p-8">
          <div className="absolute top-0 right-0 p-8">
            <Coins className="w-48 h-48 text-primary/10" />
          </div>
          
          <div className="relative space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Your Credits</h1>
            
            <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-6">
              <div>
                <div className="text-4xl md:text-6xl font-bold text-primary">
                  {currentCredits}
                </div>
                <div className="text-sm text-muted">credits remaining</div>
              </div>
              
              <div className="text-sm text-muted">
                Subscription renews on {subscriptionEnd.toLocaleDateString()}
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-primary" />
                <span>1 credit per AI request</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span>Unused credits roll over</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Premium features included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Tiers */}
        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">
            Subscription Plans
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-card rounded-lg border ${
                  tier.popular ? 'border-primary' : 'border-border'
                } p-6 space-y-6`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {tier.name}
                  </h3>
                  <div className="flex items-end gap-2">
                    <div className="text-3xl font-bold text-foreground">
                      ${tier.price}
                    </div>
                    <div className="text-sm text-muted mb-1">/month</div>
                  </div>
                  <div className="text-sm text-primary font-medium">
                    {tier.credits.toLocaleString()} credits included
                  </div>
                </div>

                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-2 px-4 rounded-lg transition-colors ${
                    tier.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-card text-foreground border border-border hover:border-primary'
                  }`}
                >
                  Subscribe Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}