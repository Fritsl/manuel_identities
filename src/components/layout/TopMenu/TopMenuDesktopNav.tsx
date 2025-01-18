import React from 'react';
import { Location } from 'react-router-dom';
import { TopMenuNavLink } from './TopMenuNavLink';
import { TopMenuAccountDropdown } from './TopMenuAccountDropdown';

interface TopMenuDesktopNavProps {
  location: Location;
  isDropdownOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
  onSignOut: () => void;
  onNavigate: (path: string) => void;
  setIsDropdownOpen: (isOpen: boolean) => void;
}

export function TopMenuDesktopNav({
  location,
  isDropdownOpen,
  dropdownRef,
  onSignOut,
  onNavigate,
  setIsDropdownOpen
}: TopMenuDesktopNavProps) {
  const isProfilePage = location.pathname === '/';
  const isJobSearchPage = location.pathname === '/jobs';
  const isCompanySearchPage = location.pathname === '/companies';
  const isToolsPage = location.pathname === '/tools';

  return (
    <div className="hidden md:flex items-center gap-2">
      <TopMenuNavLink to="/" icon="UserCircle" isActive={isProfilePage}>Profile</TopMenuNavLink>
      <TopMenuNavLink to="/jobs" icon="Briefcase" isActive={isJobSearchPage}>Job Search</TopMenuNavLink>
      <TopMenuNavLink to="/companies" icon="Building" isActive={isCompanySearchPage}>Company Search</TopMenuNavLink>
      <TopMenuNavLink to="/tools" icon="Wrench" isActive={isToolsPage}>Tools</TopMenuNavLink>

      <TopMenuAccountDropdown
        isOpen={isDropdownOpen}
        dropdownRef={dropdownRef}
        onSignOut={onSignOut}
        onNavigate={onNavigate}
        setIsOpen={setIsDropdownOpen}
      />
    </div>
  );
}