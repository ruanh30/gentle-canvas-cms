import React from 'react';
import { cn } from '@/lib/utils';

type SectionSize = 'sm' | 'md' | 'lg';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  size?: SectionSize;
  align?: 'left' | 'center';
  accent?: boolean;
  className?: string;
}

const titleSizeMap: Record<SectionSize, string> = {
  sm: 'text-lg md:text-xl',
  md: 'text-2xl md:text-3xl',
  lg: 'text-3xl md:text-4xl',
};

const mbMap: Record<SectionSize, string> = {
  sm: 'mb-6',
  md: 'mb-8',
  lg: 'mb-10',
};

export function SectionHeader({
  title,
  subtitle,
  size = 'md',
  align = 'center',
  accent = true,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        mbMap[size],
        className,
      )}
    >
      <h2
        className={cn(
          'font-display font-bold tracking-tight leading-tight',
          titleSizeMap[size],
        )}
      >
        {title}
      </h2>
      {accent && (
        <div
          className="h-[3px] rounded-full bg-primary/60"
          style={{ width: size === 'lg' ? 48 : size === 'md' ? 36 : 28 }}
        />
      )}
      {subtitle && (
        <p className="text-sm md:text-base text-muted-foreground max-w-md font-body mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}
