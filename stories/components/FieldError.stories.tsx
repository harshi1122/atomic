import type { Meta, Story } from '@storybook/react'

import {
  family,
  letterSpacing,
  lineHeight,
  transform,
  typeSize,
  weight,
} from '../index'

import { Button, FieldError, Form, Input, Layout } from '../../dist'
import type { FieldErrorProps } from '../../dist'

export default {
  title: 'Components/Forms/Fields',
  component: FieldError,
  decorators: [
    (Fn) => (
      <Form>
        <Layout gap={2}>
          <Input
            name="username"
            placeholder="Username"
            validation={{ required: true }}
          />
          <Fn />
        </Layout>
        <Layout align="flex-end">
          <Button type="submit">Submit</Button>
        </Layout>
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
    wrap: { control: 'boolean' },
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
