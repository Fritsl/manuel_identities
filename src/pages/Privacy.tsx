import React from 'react';
import { Shield, Lock, Eye, Database, Cookie, Mail } from 'lucide-react';

const sections = [
  {
    icon: Shield,
    title: 'Information We Collect',
    content: [
      'Personal information (name, email, phone number)',
      'Professional information (work history, education, skills)',
      'Profile preferences and job search criteria',
      'Usage data and interaction with our services',
      'Device and browser information'
    ]
  },
  {
    icon: Lock,
    title: 'How We Protect Your Data',
    content: [
      'Industry-standard encryption for all data transmission',
      'Regular security audits and penetration testing',
      'Strict access controls and authentication measures',
      'Secure data storage with regular backups',
      'Employee training on data protection'
    ]
  },
  {
    icon: Eye,
    title: 'How We Use Your Information',
    content: [
      'Matching you with relevant job opportunities',
      'Personalizing your job search experience',
      'Improving our AI matching algorithms',
      'Communicating updates and recommendations',
      'Analyzing service performance and usage patterns'
    ]
  },
  {
    icon: Database,
    title: 'Data Retention',
    content: [
      'Active account data retained until account deletion',
      'Inactive accounts archived after 24 months',
      'Usage logs retained for 12 months',
      'Backup data retained for 30 days',
      'Option to request complete data deletion'
    ]
  },
  {
    icon: Cookie,
    title: 'Cookies & Tracking',
    content: [
      'Essential cookies for site functionality',
      'Analytics cookies to improve our service',
      'Preference cookies to remember your settings',
      'Third-party cookies for enhanced features',
      'Option to manage cookie preferences'
    ]
  },
  {
    icon: Mail,
    title: 'Contact & Rights',
    content: [
      'Right to access your personal data',
      'Right to correct inaccurate information',
      'Right to delete your account and data',
      'Right to export your data',
      'Contact our privacy team at privacy@jobfantastic.com'
    ]
  }
];

export function Privacy() {
  const lastUpdated = '2024-03-15';

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
          <p className="text-muted">
            Last updated: {new Date(lastUpdated).toLocaleDateString()}
          </p>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            We take your privacy seriously. This policy explains how we collect, use, and protect your personal information.
          </p>
        </div>

        {/* Introduction */}
        <div className="prose prose-gray max-w-none">
          <p>
            JobFantastic ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
          </p>
          <p>
            By using JobFantastic, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.
          </p>
        </div>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    {section.title}
                  </h2>
                  <ul className="space-y-2">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-muted">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="text-center space-y-4 pt-8">
          <h2 className="text-2xl font-semibold text-foreground">
            Questions About Our Privacy Policy?
          </h2>
          <p className="text-muted">
            If you have any questions or concerns about our Privacy Policy, please contact our privacy team.
          </p>
          <a
            href="mailto:privacy@jobfantastic.com"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/90"
          >
            privacy@jobfantastic.com
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}