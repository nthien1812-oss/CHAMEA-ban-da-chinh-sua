import React from 'react';

interface ChameaLogoProps {
  variant?: 'full' | 'compact' | 'header' | 'monogram';
  theme?: 'light' | 'dark'; // 'light': on light bg (#3C2535); 'dark': on plum bg (#FEFBFD)
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ChameaLogo: React.FC<ChameaLogoProps> = ({
  variant = 'header',
  theme = 'light',
  className = '',
  size = 'md',
}) => {
  const isDark = theme === 'dark';
  const plumOrWhite = isDark ? '#FEFBFD' : '#3C2535';
  const champagne = '#AB8A6B';

  const monogramDimensions = {
    sm: { width: 36, height: 36 },
    md: { width: 50, height: 50 },
    lg: { width: 72, height: 72 },
    xl: { width: 100, height: 100 },
  }[size];

  // Authentic CHAMÉA Monogram with rounded, feminine, circular calligraphic C
  const MonogramElement = (
    <svg
      width={monogramDimensions.width}
      height={monogramDimensions.height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-label="CHAMÉA Monogram"
    >
      {/* 1. Outer Left Champagne Ribbon Loop (#AB8A6B) */}
      <path
        d="M 24 38 C 14 50 6 64 6 73 C 6 83 14 88 24 84 C 26 83 27 80 27 80"
        stroke={champagne}
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />

      {/* 2. Champagne Ribbon Crossing through Crescent Body (#AB8A6B) */}
      <path
        d="M 25 81 L 39 65"
        stroke={champagne}
        strokeWidth="3.8"
        strokeLinecap="round"
      />

      {/* 3. Rounded Calligraphic C Spine & Outer Shape (#3C2535 / #FEFBFD) */}
      <path
        d="M 74 27 C 67 15 54 11 40 14 C 23 18 15 36 15 54 C 15 75 27 94 50 97 C 68 99 80 88 83 74 C 84 70 80 67 77 69 C 73 78 64 87 51 87 C 35 87 28 73 28 54 C 28 36 37 21 52 18 C 63 15 71 20 73 26 C 74 27 75 28 74 27 Z"
        fill={plumOrWhite}
      />

      {/* 4. Inner Arched Wave traversing to Upper Right (#3C2535 / #FEFBFD) */}
      <path
        d="M 39 65 C 48 55 58 45 66 43 C 71 42 73 46 74 50 C 73 50 71 46 66 47 C 58 48 48 57 39 65 Z"
        fill={plumOrWhite}
      />

      {/* 5. 4-Point Star in Right Opening (#AB8A6B) */}
      <path
        d="M 69 52 Q 69.8 61.5 76 62 Q 69.8 62.5 69 72 Q 68.2 62.5 62 62 Q 68.2 61.5 69 52 Z"
        fill={champagne}
      />
    </svg>
  );

  if (variant === 'monogram') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {MonogramElement}
      </div>
    );
  }

  // Header variant: Clean horizontal brand lockup
  if (variant === 'header') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        {MonogramElement}
        <div className="flex flex-col">
          <span
            className="uppercase font-bold text-xl sm:text-2xl leading-none"
            style={{
              color: plumOrWhite,
              fontFamily: "'Playfair Display', 'Noto Serif', Georgia, serif",
              letterSpacing: '0.25em',
            }}
          >
            CHAMÉA
          </span>
          <span
            className="mt-1 text-[8.5px] sm:text-[9.5px] font-sans font-medium tracking-[0.22em] uppercase leading-none"
            style={{ color: isDark ? '#D9C8BA' : '#6A5665' }}
          >
            CHẠM ĐÚNG NGƯỜI <span className="text-[#AB8A6B]">•</span> TRAO ĐÚNG QUÀ
          </span>
        </div>
      </div>
    );
  }

  // Compact variant: Monogram + Wordmark
  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
        {MonogramElement}
        <span
          className="uppercase font-bold text-lg sm:text-xl"
          style={{
            color: plumOrWhite,
            fontFamily: "'Playfair Display', 'Noto Serif', Georgia, serif",
            letterSpacing: '0.25em',
          }}
        >
          CHAMÉA
        </span>
      </div>
    );
  }

  // Full variant: Vertical stacked original lockup
  return (
    <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
      {MonogramElement}
      <span
        className="uppercase font-bold text-2xl sm:text-3xl mt-2 leading-tight"
        style={{
          color: plumOrWhite,
          fontFamily: "'Playfair Display', 'Noto Serif', Georgia, serif",
          letterSpacing: '0.25em',
        }}
      >
        CHAMÉA
      </span>
      <span
        className="mt-1.5 text-[9.5px] sm:text-[11px] font-sans font-medium tracking-[0.28em] uppercase"
        style={{ color: isDark ? '#D9C8BA' : '#6A5665' }}
      >
        CHẠM ĐÚNG NGƯỜI <span className="text-[#AB8A6B] mx-1">•</span> TRAO ĐÚNG QUÀ
      </span>
    </div>
  );
};
