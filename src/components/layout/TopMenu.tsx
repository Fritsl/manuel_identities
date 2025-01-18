import React from 'react';
import { TopMenuBrand } from './TopMenu/TopMenuBrand';
import { TopMenuDesktopNav } from './TopMenu/TopMenuDesktopNav';
import { TopMenuMobileNav } from './TopMenu/TopMenuMobileNav';
import { useTopMenu } from '../../hooks/useTopMenu';

export function TopMenu() {
  const {
    location,
    isDropdownOpen,
    isMobileMenuOpen,
    dropdownRef,
    handleSignOut,
    handleNavigate,
    setIsDropdownOpen,
    setIsMobileMenuOpen
  } = useTopMenu();

  return (
    <div className="bg-card border-b border-border fixed top-0 left-0 right-0 z-[100]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <TopMenuBrand />

          <TopMenuDesktopNav
            location={location}
            isDropdownOpen={isDropdownOpen}
            dropdownRef={dropdownRef}
            onSignOut={handleSignOut}
            onNavigate={handleNavigate}
            setIsDropdownOpen={setIsDropdownOpen}
          />

          <TopMenuMobileNav
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>
      </div>

      {isMobileMenuOpen && (
        <TopMenuMobileContent
          location={location}
          onSignOut={handleSignOut}
          onNavigate={handleNavigate}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      )}
    </div>
  );
}