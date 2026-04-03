/**
 * TopicSuggestion - Section prompting visitors to suggest a topic.
 *
 * Displays a heading, descriptive text, and a styled placeholder area where
 * a Google Form iframe will eventually be embedded. Uses the MessageSquare
 * icon for visual context.
 *
 * Used by: HomePage.
 */
import { MessageSquare } from 'lucide-react';
import { cn } from '@/utils/cn';

export default function TopicSuggestion() {
  return (
    <section>
      {/* Section header */}
      <div className="mb-4 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
        <h2 className="text-xl font-bold text-primary-800 dark:text-dark-text sm:text-2xl">
          Suggest a Topic
        </h2>
      </div>

      {/* Description */}
      <p className="mb-6 text-sm leading-relaxed text-primary-600 dark:text-dark-muted sm:text-base">
        Have a topic you&apos;d like us to cover? We&apos;d love to hear from you!
      </p>

      {/* Google Form placeholder */}
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center',
          'border-primary-200 bg-primary-50',
          'dark:border-dark-border dark:bg-dark-surface',
          'sm:p-12'
        )}
      >
        <MessageSquare className="h-10 w-10 text-primary-300 dark:text-dark-muted" />
        <p className="text-sm text-primary-500 dark:text-dark-muted">
          (Google Form will be embedded here)
        </p>
      </div>
    </section>
  );
}
