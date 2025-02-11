import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { AppFileList } from '@/core/components/inputs/parts/AppFileList';

const meta = {
  component: AppFileList,
  args: {
    files: [],
    onRemove: fn(),
  },
} satisfies Meta<typeof AppFileList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
