import type { Meta, StoryObj } from '@storybook/react';

import AppBackground from '@/core/components/layout/AppBackground';
import { AppLoader } from '@/core/components/layout/AppLoader';

const meta = {
  component: AppLoader,
  decorators: [
    (Story) => (
      <div className="h-100">
        <AppBackground />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
