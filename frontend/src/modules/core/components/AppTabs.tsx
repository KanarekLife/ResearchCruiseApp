import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import { AppButton } from '@/core/components/AppButton';
import { cn } from '@/core/lib/utils';

type Props = {
  children: React.ReactNode;
  tabNames: string[];
};
export function AppTabs({ children, tabNames }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  if (!Array.isArray(children)) {
    throw new Error('Children must be an array of elements');
  }

  if (tabNames.length !== children.length) {
    throw new Error('The number of tab names must match the number of tab children');
  }

  return (
    <div>
      <div className="flex text-center gap-8">
        {tabNames.map((tabName, index) => (
          <AppButton
            className={cn(
              index === activeTab ? 'bg-primary text-white font-bold' : 'bg-gray-200 hover:bg-primary-200',
              'w-full rounded-full transition'
            )}
            variant="plain"
            onClick={() => setActiveTab(index)}
            key={tabName}
          >
            {tabName}
          </AppButton>
        ))}
      </div>
      {children.map((child, index) => (
        // eslint-disable-next-line @eslint-react/no-array-index-key
        <AnimatePresence key={index}>
          {activeTab === index && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {child}
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}
