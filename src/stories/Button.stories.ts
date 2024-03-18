import type { Meta, StoryObj } from '@storybook/react';
import Button from '../components/button/Button.tsx';

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select' },
    status: { control: 'radio', options: ['success', 'loading', 'error'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    color: 'btn-primary',
    status: 'success',
    outline: false,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    color: 'btn-secondary',
    status: 'success',
    outline: false,
  },
};

export const Accent: Story = {
  args: {
    children: 'Accent Button',
    color: 'btn-accent',
    status: 'success',
    outline: false,
  },
};

export const Neutral: Story = {
  args: {
    children: 'Neutral Button',
    color: 'btn-neutral',
    status: 'success',
    outline: false,
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    color: 'btn-ghost',
    status: 'success',
    outline: false,
  },
};
