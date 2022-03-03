import type { Meta, Story } from '@storybook/react'

import { color, componentSize, edges, gap } from '../index'

import { Pagination } from '../../dist'
import type { PaginationProps } from '../../dist'

export default {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    color,
    count: { control: 'number' },
    edges,
    gap,
    page: { control: 'number' },
    size: componentSize,
    variant: {
      control: 'select',
      options: ['ghost', 'outline'],
    },
    onChange: { action: 'onChange' },
    icons: { control: false },
  },
} as Meta

const Template: Story<PaginationProps> = (args) => <Pagination {...args} />
Template.args = {
  ...Pagination.defaultProps,
  count: 10,
}

export const Default: Story<PaginationProps> = Template.bind({})
Default.args = Template.args

export const Neutral: Story<PaginationProps> = Template.bind({})
Neutral.storyName = 'Neutral (Color)'
Neutral.args = {
  ...Template.args,
  color: 'neutral',
}

export const Danger: Story<PaginationProps> = Template.bind({})
Danger.storyName = 'Danger (Color)'
Danger.args = {
  ...Template.args,
  color: 'danger',
}

export const FirstAndLast: Story<PaginationProps> = Template.bind({})
FirstAndLast.storyName = 'First & Last (Controls)'
FirstAndLast.args = {
  ...Template.args,
  controls: { first: true, previous: true, next: true, last: true },
}

export const None: Story<PaginationProps> = Template.bind({})
None.storyName = 'None (Controls)'
None.args = {
  ...Template.args,
  controls: { first: false, previous: false, next: false, last: false },
}

export const Circular: Story<PaginationProps> = Template.bind({})
Circular.storyName = 'Circular (Edges)'
Circular.args = {
  ...Template.args,
  edges: 'circular',
}

export const Rounded: Story<PaginationProps> = Template.bind({})
Rounded.storyName = 'Rounded (Edges)'
Rounded.args = {
  ...Template.args,
  edges: 'rounded',
}

export const Squared: Story<PaginationProps> = Template.bind({})
Squared.storyName = 'Squared (Edges)'
Squared.args = {
  ...Template.args,
  edges: 'squared',
}

export const Small: Story<PaginationProps> = Template.bind({})
Small.storyName = 'Small (Size)'
Small.args = {
  ...Template.args,
  size: 'sm',
}

export const Medium: Story<PaginationProps> = Template.bind({})
Medium.storyName = 'Medium (Size)'
Medium.args = {
  ...Template.args,
  size: 'md',
}

export const Large: Story<PaginationProps> = Template.bind({})
Large.storyName = 'Large (Size)'
Large.args = {
  ...Template.args,
  count: 100,
  size: 'lg',
}

export const Ghost: Story<PaginationProps> = Template.bind({})
Ghost.storyName = 'Ghost (Variant)'
Ghost.args = {
  ...Template.args,
  variant: 'ghost',
}

export const Outline: Story<PaginationProps> = Template.bind({})
Outline.storyName = 'Outline (Variant)'
Outline.args = {
  ...Template.args,
  variant: 'outline',
}
