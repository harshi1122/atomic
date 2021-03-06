import type { Meta, Story } from '@storybook/react'

import { color, edges, variant } from '../index'

import { Badge } from '../../dist'
import type { BadgeProps } from '../../dist'

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: { color, edges, variant },
} as Meta

const Template: Story<BadgeProps> = (args) => <Badge {...args} />
Template.args = Badge.defaultProps

export const Default: Story<BadgeProps> = Template.bind({})
Default.args = {
  ...Template.args,
  children: 'Badge',
}

export const Icon: Story<BadgeProps> = Template.bind({})
Icon.args = {
  ...Template.args,
  children: (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        height="16"
        width="16"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span>Badge</span>
    </>
  ),
  variant: 'ghost',
}

export const Primary: Story<BadgeProps> = Template.bind({})
Primary.storyName = 'Primary (Color)'
Primary.args = {
  ...Template.args,
  children: 'Badge',
  color: 'primary',
}

export const Circular: Story<BadgeProps> = Template.bind({})
Circular.storyName = 'Circular (Edges)'
Circular.args = {
  ...Template.args,
  children: 'Badge',
  edges: 'circular',
}

export const Rounded: Story<BadgeProps> = Template.bind({})
Rounded.storyName = 'Rounded (Edges)'
Rounded.args = {
  ...Template.args,
  children: 'Badge',
}

export const Squared: Story<BadgeProps> = Template.bind({})
Squared.storyName = 'Squared (Edges)'
Squared.args = {
  ...Template.args,
  children: 'Badge',
  edges: 'squared',
}

export const Fill: Story<BadgeProps> = Template.bind({})
Fill.storyName = 'Fill (Variant)'
Fill.args = {
  ...Template.args,
  children: 'Badge',
}

export const Outline: Story<BadgeProps> = Template.bind({})
Outline.storyName = 'Outline (Variant)'
Outline.args = {
  ...Template.args,
  children: 'Badge',
  variant: 'outline',
}

export const Ghost: Story<BadgeProps> = Template.bind({})
Ghost.storyName = 'Ghost (Variant)'
Ghost.args = {
  ...Template.args,
  children: 'Badge',
  variant: 'ghost',
}
