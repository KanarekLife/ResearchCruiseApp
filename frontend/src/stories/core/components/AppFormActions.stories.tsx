import type { Meta, StoryObj } from '@storybook/react';

import { AppButton } from '@/core/components/AppButton';

import { AppFormActions } from '../../../modules/core/components/AppFormActions';

const meta = {
  component: AppFormActions,
  args: {
    children: (
      <>
        <AppButton variant="primaryOutline">Form</AppButton>
        <AppButton variant="primary">Actions</AppButton>
      </>
    ),
  },
} satisfies Meta<typeof AppFormActions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
