import { ReactNode } from "react";

interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const Section = ({
  title,
  description,
  children,
  className = "",
}: SectionProps) => {
  return (
    <div
      className={`bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border animate-fade-in ${className}`}
    >
      <div className="p-6">
        <h2 className="text-2xl font-display font-semibold text-gray-900 dark:text-dark-text mb-2">
          {title}
        </h2>
        {description && (
          <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
        )}
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};
