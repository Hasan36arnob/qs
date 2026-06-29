import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-4 py-16 text-center',
        className,
      )}
    >
      {Icon && (
        <Icon className="mb-4 h-12 w-12 text-cream-400" strokeWidth={1} />
      )}
      <h3 className="font-serif text-xl text-charcoal-800">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-charcoal-500">{description}</p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 border border-charcoal-800 px-6 py-2.5 text-sm font-medium tracking-wide text-charcoal-800 transition-colors hover:bg-charcoal-800 hover:text-cream-100"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
