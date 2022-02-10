import type { Meta, Story } from '@storybook/react'

// import { color } from '../index'

import { Card } from '../../dist'
import type { CardProps } from '../../dist'

export default {
  title: 'Components/Card',
  component: Card,
} as Meta

const Template: Story<CardProps> = (args) => <Card {...args} />
Template.args = Card.defaultProps

export const Default: Story<CardProps> = Template.bind({})
Default.args = {
  ...Template.args,
}
