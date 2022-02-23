import type { Meta, Story } from '@storybook/react'

import { color, componentSize, edges, variant } from '../index'

import { Card, Flex, Pagination } from '../../dist'
import type { PaginationProps } from '../../dist'

export default {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    color,
    edges,
    size: componentSize,
    variant,
    length: { control: 'number' },
    onPageChange: { action: 'onPageChange' },
  },
} as Meta

const Template: Story<PaginationProps> = (args) => <Pagination {...args} />
Template.args = {
  ...Pagination.defaultProps,
  length: 10,
}

export const Block: Story<PaginationProps> = Template.bind({})
Block.args = {
  ...Template.args,
  variant: 'block',
}

export const Ghost: Story<PaginationProps> = (args) => (
  <Card>
    <Flex align="center" p={4}>
      <Template {...args} />
    </Flex>
  </Card>
)
Ghost.args = {
  ...Template.args,
  variant: 'ghost',
}
