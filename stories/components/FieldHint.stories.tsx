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

import { FieldHint, FieldLabel, Form, Input, Flex } from '../../dist'
import type { FieldHintProps } from '../../dist'

export default {
  title: 'Components/Forms/Fields',
  component: FieldHint,
  argTypes: {
    family,
    letterSpacing,
    lineHeight,
    size: typeSize,
    transform,
    weight,
    wrap,
    hideError: { control: 'boolean' },
  },
  decorators: [
    (Fn) => (
      <Form>
        <Flex gap={2}>
          <FieldLabel name="username">Username</FieldLabel>
          <Input name="username" placeholder="Username" />
          <Fn />
        </Flex>
      </Form>
    ),
  ],
} as Meta

const Template: Story<FieldHintProps> = (args) => <FieldHint {...args} />
Template.args = {
  ...FieldHint.defaultProps,
  children: 'Your username will be used in all your posts and messages.',
  name: 'username',
}

export const Hint: Story<FieldHintProps> = Template.bind({})
Hint.args = Template.args
