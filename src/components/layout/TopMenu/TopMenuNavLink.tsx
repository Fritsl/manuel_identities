import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Briefcase, UserCircle, Wrench } from 'lucide-react';

interface TopMenuNavLinkProps {
  to: string;
  icon: 'Building' | 'Briefcase' | 'UserCircle' | 'Wrench';
  children: React.ReactNode;
  isActive: boolean;
}

export function TopMenuNavLink({ to, icon, children, isActive }: TopMenuNavLinkProps) {
  const Icon = {
    Building,
    Briefcase,
    UserCircle,
    Wrench
  }[icon];

  return (
    <Link
      to={to}
      className={`h-10 px-3 rounded-md flex items-center gap-1.5 transition-all active:scale-95 w-full whitespace-nowrap
        ${isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-foreground hover:bg-secondary hover:text-secondary-foreground'}`}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="text-sm font-medium">{children}</span>
    </Link>
  );
}