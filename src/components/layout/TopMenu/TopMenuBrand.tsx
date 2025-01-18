import React from 'react';
import { Link } from 'react-router-dom';
import { Wand2 } from 'lucide-react';

export function TopMenuBrand() {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center">
        <Wand2 className="h-8 w-8 text-foreground magic-wand" />
        <span className="ml-2 text-xl font-bold text-foreground">JOBFANTASTIC</span>
      </Link>
    </div>
  );
}