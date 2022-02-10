import type { Meta, Story } from '@storybook/react'

import { color } from '../index'

import { Badge } from '../../dist'
import type { BadgeProps } from '../../dist'

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    color,
    variant: {
      control: 'select',
      options: ['fill', 'ghost', 'outline'],
    },
  },
} as Meta

const Template: Story<BadgeProps> = (args) => <Badge {...args} />
Template.args = Badge.defaultProps

export const Primary: Story<BadgeProps> = Template.bind({})
Primary.args = {
  ...Template.args,
  children: 'Badge',
  color: 'primary',
}

export const Fill: Story<BadgeProps> = Template.bind({})
Fill.args = {
  ...Template.args,
  children: 'Badge',
}

export const Outline: Story<BadgeProps> = Template.bind({})
Outline.args = {
  ...Template.args,
  children: 'Badge',
  variant: 'outline',
}

export const Ghost: Story<BadgeProps> = Template.bind({})
Ghost.args = {
  ...Template.args,
  children: 'Badge',
  variant: 'ghost',
}
