import type { Meta, StoryObj } from '@storybook/react';
import LoadingPage from '../components/loading/LoadingPage.tsx';

const meta = {
  title: 'LoadingPage',
  component: LoadingPage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select' },
    size: { control: 'radio' },
  },
} satisfies Meta<typeof LoadingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spinner: Story = {
  args: {
    type: 'loading-spinner',
    size: 'loading-lg',
  },
};

export const Dots: Story = {
  args: {
    type: 'loading-dots',
    size: 'loading-lg',
  },
};

export const Ring: Story = {
  args: {
    type: 'loading-ring',
    size: 'loading-lg',
  },
};

export const Ball: Story = {
  args: {
    type: 'loading-ball',
    size: 'loading-lg',
  },
};

export const Infinit: Story = {
  args: {
    type: 'loading-infinity',
    size: 'loading-lg',
  },
};
