import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate?: string; // ISO date string
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate = '2026-12-27T11:00:00+05:30', // Sunday Dec 27, 2026 11:00 AM IST
}) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
        {units.map((unit, idx) => (
          <div
            key={idx}
            className="relative flex flex-col items-center justify-center p-3 sm:p-5 rounded-xl dark-gold-glass border border-[#D4AF37]/40 shadow-xl overflow-hidden group hover:border-[#D4AF37] transition-colors duration-300"
          >
            {/* Subtle corner filigree accents */}
            <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#D4AF37]/60 pointer-events-none" />
            <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#D4AF37]/60 pointer-events-none" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-[#D4AF37]/60 pointer-events-none" />
            <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#D4AF37]/60 pointer-events-none" />

            {/* Glowing top line */}
            <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

            <span className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FDFBF7] tabular-nums drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
              {String(unit.value).padStart(2, '0')}
            </span>

            <span className="font-sans-body uppercase text-[10px] sm:text-xs tracking-[0.2em] text-[#D4AF37] font-semibold mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
