import type { Meta, Story } from '@storybook/react'

// import { color } from '../index'

import { Divider, Flex, Paper } from '../../dist'
import type { DividerProps } from '../../dist'

export default {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    variant: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
} as Meta

const Template: Story<DividerProps> = (args) => (
  <Flex gap={8}>
    <Paper color="neutral.5" height="50px" width="100%" />
    <Divider {...args} />
    <Paper color="neutral.5" height="50px" width="100%" />
  </Flex>
)
Template.args = Divider.defaultProps

export const Default: Story<DividerProps> = Template.bind({})
Default.args = {
  ...Template.args,
}

export const Vertical: Story<DividerProps> = (args) => (
  <Flex gap={8} row>
    <Paper color="neutral.5" height="50px" width="100%" />
    <Divider {...args} />
    <Paper color="neutral.5" height="50px" width="100%" />
  </Flex>
)
Vertical.args = {
  ...Template.args,
  variant: 'vertical',
}
