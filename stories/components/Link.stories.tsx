import type { Meta, Story } from '@storybook/react'

import {
  color,
  family,
  letterSpacing,
  lineHeight,
  transform,
  typeSize,
  weight,
  wrap,
} from '../index'

import { Link, Text } from '../../dist'
import type { LinkProps } from '../../dist'

export default {
  title: 'Components/Link',
  component: Link,
  decorators: [
    (Fn) => (
      <Text>
        Notice the <Fn /> I put in the middle of this sentance.
      </Text>
    ),
  ],
  argTypes: {
    color,
    family,
    letterSpacing,
    lineHeight,
    size: typeSize,
    transform,
    weight,
    wrap,
    to: { control: 'text' },
    underline: {
      control: 'select',
      options: ['always', 'hover', 'none'],
    },
  },
} as Meta

const Template: Story<LinkProps> = (args) => <Link {...args} />
Template.args = Link.defaultProps

export const Default: Story<LinkProps> = Template.bind({})
Default.args = {
  ...Template.args,
  children: 'Home Page',
  to: '/home',
}

export const External: Story<LinkProps> = Template.bind({})
External.args = {
  ...Template.args,
  children: 'RedwoodJS Documentation',
  target: '_blank',
  to: 'https://redwoodjs.com/docs/introduction',
}

export const UnderlineAlways: Story<LinkProps> = Template.bind({})
UnderlineAlways.storyName = 'Underline (Always)'
UnderlineAlways.args = {
  ...Template.args,
  children: 'Home Page',
  to: '/home',
  underline: 'always',
}

export const UnderlineHover: Story<LinkProps> = Template.bind({})
UnderlineHover.storyName = 'Underline (Hover)'
UnderlineHover.args = {
  ...Template.args,
  children: 'Home Page',
  to: '/home',
  underline: 'hover',
}

export const UnderlineNone: Story<LinkProps> = Template.bind({})
UnderlineNone.storyName = 'Underline (None)'
UnderlineNone.args = {
  ...Template.args,
  children: 'Home Page',
  to: '/home',
  underline: 'none',
}
