import React from 'react';

interface OrnateDividerProps {
  className?: string;
  variant?: 'gold' | 'emerald';
}

export const OrnateDivider: React.FC<OrnateDividerProps> = ({
  className = '',
  variant = 'gold',
}) => {
  const isEmerald = variant === 'emerald';
  const color = isEmerald ? '#0A3C2F' : '#D4AF37';

  return (
    <div className={`flex items-center justify-center gap-3 py-4 select-none ${className}`}>
      <div 
        className="h-[1px] w-12 sm:w-20 md:w-28 opacity-60"
        style={{
          background: isEmerald 
            ? 'linear-gradient(to right, transparent, #0A3C2F)' 
            : 'linear-gradient(to right, transparent, #D4AF37)'
        }}
      />
      
      {/* Ornate Islamic 8-Pointed Star Rosette */}
      <svg 
        width="28" 
        height="28" 
        viewBox="0 0 24 24" 
        fill="none" 
        className="opacity-90 transition-transform duration-500 hover:rotate-45"
      >
        <path
          d="M12 2L14.5 7L20 7.5L16 11.5L17.5 17L12 14.5L6.5 17L8 11.5L4 7.5L9.5 7L12 2Z"
          fill={color}
          fillOpacity="0.2"
          stroke={color}
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2.5" fill={color} />
      </svg>

      <div 
        className="h-[1px] w-12 sm:w-20 md:w-28 opacity-60"
        style={{
          background: isEmerald 
            ? 'linear-gradient(to left, transparent, #0A3C2F)' 
            : 'linear-gradient(to left, transparent, #D4AF37)'
        }}
      />
    </div>
  );
};
