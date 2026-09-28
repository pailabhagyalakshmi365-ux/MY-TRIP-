import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { IMAGE_ASSETS } from '../utils/images';

interface ResilientImageProps {
  imageKey: 'hero' | 'south_kerala' | 'rajasthan' | 'kashmir' | 'goa';
  alt: string;
  className?: string;
  cropPosition?: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  imageKey,
  alt,
  className = 'w-full h-full object-cover',
  cropPosition = 'object-center',
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);
  const src = IMAGE_ASSETS[imageKey] || IMAGE_ASSETS.hero;

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#292524] via-[#44403C] to-[#78350F] text-[#FAF8F5] p-6 text-center ${className}`}
      >
        <MapPin className="w-8 h-8 text-[#F59E0B] mb-2 opacity-90" />
        <span className="font-display text-lg font-semibold tracking-wide">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`${className} ${cropPosition}`}
    />
  );
};
