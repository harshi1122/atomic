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

import { Button, FieldError, Form, Input, Flex } from '../../dist'
import type { FieldErrorProps } from '../../dist'

export default {
  title: 'Components/Forms/Fields',
  component: FieldError,
  decorators: [
    (Fn) => (
      <Form>
        <Flex gap={6}>
          <Flex gap={2}>
            <Input
              name="username"
              placeholder="Username"
              validation={{ required: true }}
            />
            <Fn />
          </Flex>
          <Flex align="flex-end">
            <Button type="submit">Submit</Button>
          </Flex>
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

const Template: Story<FieldErrorProps> = (args) => <FieldError {...args} />
Template.args = {
  ...FieldError.defaultProps,
  name: 'username',
}

export const FieldErr: Story<FieldErrorProps> = Template.bind({})
FieldErr.storyName = 'Error'
FieldErr.args = Template.args
