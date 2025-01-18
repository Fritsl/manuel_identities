import React from 'react';
import { Link } from 'react-router-dom';
import { Wand2, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <Wand2 className="h-6 w-6 text-foreground" />
              <span className="ml-2 text-lg font-bold text-foreground">JOBFANTASTIC</span>
            </Link>
            <p className="text-sm text-muted">
              Empowering your career journey with AI-driven job matching and professional tools.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-sm text-muted hover:text-primary">
                  Job Search
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-sm text-muted hover:text-primary">
                  Company Search
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-sm text-muted hover:text-primary">
                  Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted">
            © {currentYear} Frits Lyneborg. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/how-it-works" className="text-sm text-muted hover:text-primary">
              How does it work?
            </Link>
            <Link to="/support" className="text-sm text-muted hover:text-primary">
              Support
            </Link>
            <Link to="/contact" className="text-sm text-muted hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}