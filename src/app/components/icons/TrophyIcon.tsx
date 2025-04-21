import React from 'react';

interface IconProps {
  className?: string;
}

const TrophyIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5 3a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 012 2v2a2 2 0 01-1.998 2c.329.581.5 1.246.5 1.936C15.502 15.123 13.825 17 11.718 17H8.282C6.175 17 4.498 15.123 4.498 13.064c0-.69.171-1.355.5-1.936A2 2 0 013 9V7a2 2 0 012-2V3zm4 7V5h2v5a1 1 0 11-2 0zm5-5h-4v5a3 3 0 106 0V5z" clipRule="evenodd" />
    </svg>
  );
};

export default TrophyIcon;