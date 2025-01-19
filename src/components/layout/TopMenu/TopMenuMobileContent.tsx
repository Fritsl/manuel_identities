import React from 'react';
import { Location } from 'react-router-dom';
import { TopMenuNavLink } from './TopMenuNavLink';
import { Users, Coins, LogOut } from 'lucide-react';

interface TopMenuMobileContentProps {
  location: Location;
  onSignOut: () => void;
  onNavigate: (path: string) => void;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export function TopMenuMobileContent({
  location,
  onSignOut,
  onNavigate,
  setIsMobileMenuOpen
}: TopMenuMobileContentProps) {
  const isProfilePage = location.pathname === '/';
  const isJobSearchPage = location.pathname === '/jobs';
  const isCompanySearchPage = location.pathname === '/companies';
  const isToolsPage = location.pathname === '/tools';

  return (
    <div className="md:hidden border-t border-border bg-card">
      <div className="px-4 py-3 space-y-2">
        <TopMenuNavLink to="/" icon="UserCircle" isActive={isProfilePage}>Profile</TopMenuNavLink>
        <TopMenuNavLink to="/jobs" icon="Briefcase" isActive={isJobSearchPage}>Job Search</TopMenuNavLink>
        <TopMenuNavLink to="/companies" icon="Building" isActive={isCompanySearchPage}>Company Search</TopMenuNavLink>
        <TopMenuNavLink to="/tools" icon="Wrench" isActive={isToolsPage}>Tools</TopMenuNavLink>
        
        <div className="pt-2 mt-2 border-t border-border">
          <button
            onClick={() => {
              onNavigate('/profiles');
              setIsMobileMenuOpen(false);
            }}
            className="w-full px-3 py-2 text-left flex items-center gap-2 text-foreground hover:bg-secondary hover:text-secondary-foreground rounded-md"
          >
            <Users className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">Profiles</span>
          </button>
          <button
            onClick={() => {
              onNavigate('/credits');
              setIsMobileMenuOpen(false);
            }}
            className="w-full px-3 py-2 text-left flex items-center gap-2 text-foreground hover:bg-secondary hover:text-secondary-foreground rounded-md"
          >
            <Coins className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">150 Credits</span>
          </button>
          <button
            onClick={onSignOut}
            className="w-full px-3 py-2 text-left flex items-center gap-2 text-foreground hover:bg-secondary hover:text-secondary-foreground rounded-md"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}