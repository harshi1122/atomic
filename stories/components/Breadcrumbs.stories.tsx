import { LocationProvider } from '@redwoodjs/router'
import type { Meta, Story } from '@storybook/react'

// import { color } from '../index'

import { Breadcrumbs, Link, Text } from '../../dist'
import type { BreadcrumbsProps, LinkProps } from '../../dist'

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  decorators: [
    (Fn) => (
      <LocationProvider location={{ pathname: 'orange/julius' }}>
        <Fn />
      </LocationProvider>
    ),
  ],
} as Meta

const Template: Story<BreadcrumbsProps> = (args) => <Breadcrumbs {...args} />
Template.args = Breadcrumbs.defaultProps

// @ts-expect-error provided in story
const LinkArgs: LinkProps = { color: 'neutral', underline: 'none' }

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
