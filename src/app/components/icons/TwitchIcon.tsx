import React from 'react';

interface IconProps {
  className?: string;
}

const TwitchIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.571 4.714h1.715v5.143h-1.715zM16.571 4.714h1.715v5.143h-1.715zM2.857 0l-2.857 2.857v18.285h5.714v2.857h2.857l2.857-2.857h4.286l5.714-5.714v-15.428h-18.571zM20.571 14.571l-3.428 3.428h-5.714l-2.857 2.857v-2.857h-4.571v-14.286h16.571v10.857z" />
    </svg>
  );
};

export default TwitchIcon;