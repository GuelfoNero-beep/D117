
import React from 'react';

const SquareCompassIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3h18v18H3z" />
    <path d="M12 3v9" />
    <path d="M12 12l-4 4" />
    <path d="M12 12l4 4" />
  </svg>
);

export default SquareCompassIcon;
