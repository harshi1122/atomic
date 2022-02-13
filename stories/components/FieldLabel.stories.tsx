import type { Meta, Story } from '@storybook/react'

import {
  family,
  letterSpacing,
  lineHeight,
  transform,
  typeSize,
  weight,
  wrap,
} from '../index'

import { FieldLabel, Form, Input, Flex } from '../../dist'
import type { FieldLabelProps } from '../../dist'

export default {
  title: 'Components/Forms/Fields',
  component: FieldLabel,
  decorators: [
    (Fn) => (
      <Form>
        <Flex gap={2}>
          <Fn />
          <Input name="username" placeholder="Username" />
        </Flex>
      </Form>
    ),
  ],
  argTypes: {
    family,
    letterSpacing,
    lineHeight,
    size: typeSize,
    transform,
    weight,
    wrap,
  },
} as Meta

const Template: Story<FieldLabelProps> = (args) => <FieldLabel {...args} />
Template.args = {
  ...FieldLabel.defaultProps,
  children: 'Username',
  name: 'username',
}

export const Label: Story<FieldLabelProps> = Template.bind({})
Label.args = Template.args
