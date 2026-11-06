import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'auto',
  showSubtitle = true,
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
  };

  const titleSizes = {
    sm: 'text-sm font-black tracking-tight leading-none',
    md: 'text-base sm:text-xl font-black tracking-tight leading-none',
    lg: 'text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-none',
  };

  const subSizes = {
    sm: 'text-[9px] font-bold tracking-wider uppercase',
    md: 'text-[10px] sm:text-xs font-bold tracking-wider uppercase',
    lg: 'text-xs sm:text-sm font-bold tracking-wider uppercase',
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Official Company Logo Image uploaded by user */}
      <div
        className={`${iconSizes[size]} shrink-0 relative rounded-2xl overflow-hidden bg-[#000a30] p-0.5 shadow-md flex items-center justify-center border border-sky-400/30 group-hover:scale-105 transition-transform duration-200`}
      >
        <img
          src="/assets/aistudio/image_dab9c635.png"
          alt="Color Center Automotriz Logo Oficial"
          className="w-full h-full object-contain rounded-xl"
        />
      </div>

      {/* Brand Typographic Identity */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-headline ${titleSizes[size]} ${
              variant === 'light'
                ? 'text-white'
                : variant === 'dark'
                ? 'text-[#00236f]'
                : 'text-[#00236f] dark:text-white'
            }`}
          >
            COLOR CENTER
          </span>
          <span className="h-2 w-2 rounded-full bg-[#006398] dark:bg-sky-400 shrink-0"></span>
          <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[9px] font-black uppercase tracking-wider">
            AUTO
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1 mt-0.5 truncate">
            <span
              className={`font-body ${subSizes[size]} ${
                variant === 'light'
                  ? 'text-sky-200'
                  : variant === 'dark'
                  ? 'text-[#006398]'
                  : 'text-[#006398] dark:text-sky-400'
              } truncate`}
            >
              Pintura Automotriz • Sherwin-Williams
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
