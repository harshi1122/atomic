import type { Meta, Story } from '@storybook/react'

// import { color } from '../index'

import { Divider, Layout, Paper } from '../../dist'
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
  <Layout gap={8}>
    <Paper color="neutral.5" height="50px" width="100%" />
    <Divider {...args} />
    <Paper color="neutral.5" height="50px" width="100%" />
  </Layout>
)
Template.args = Divider.defaultProps

export const Default: Story<DividerProps> = Template.bind({})
Default.args = {
  ...Template.args,
}

export const Vertical: Story<DividerProps> = (args) => (
  <Layout gap={8} row>
    <Paper color="neutral.5" height="50px" width="100%" />
    <Divider {...args} />
    <Paper color="neutral.5" height="50px" width="100%" />
  </Layout>
)
Vertical.args = {
  ...Template.args,
  variant: 'vertical',
}
