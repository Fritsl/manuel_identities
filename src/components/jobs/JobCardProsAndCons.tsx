import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface JobCardProsAndConsProps {
  pros: string[];
  cons: string[];
}

export function JobCardProsAndCons({ pros, cons }: JobCardProsAndConsProps) {
  return (
    <div className="mt-6 grid md:grid-cols-2 gap-4 md:gap-6">
      <div className="space-y-3">
        <div className="flex items-center gap-2.5 text-[#EF4444]">
          <ThumbsDown className="w-5 h-5" />
          <h3 className="text-base font-bold">Con's</h3>
        </div>
        <ul className="space-y-2">
          {cons.map((con, index) => (
            <li key={index} className="text-sm font-medium text-foreground">
              • {con}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2.5 text-[#22C55E]">
          <ThumbsUp className="w-5 h-5" />
          <h3 className="text-base font-bold">Pro's</h3>
        </div>
        <ul className="space-y-2">
          {pros.map((pro, index) => (
            <li key={index} className="text-sm font-medium text-foreground">
              • {pro}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}