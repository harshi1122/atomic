import type { Meta, Story } from '@storybook/react'

import { Breadcrumbs, Link, Text } from '../../dist'
import type { BreadcrumbsProps } from '../../dist'

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
} as Meta

const Template: Story<BreadcrumbsProps> = (args) => <Breadcrumbs {...args} />
Template.args = Breadcrumbs.defaultProps

export const Default: Story<BreadcrumbsProps> = Template.bind({})
Default.args = {
  ...Template.args,
  children: [
    <Link key="home" to="/home">
      Dashboard
    </Link>,
    <Link key="order" to="/orders">
      Orders
    </Link>,
    <Text key="order-details">PO-158392.000</Text>,
  ],
}
