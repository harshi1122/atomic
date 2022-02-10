import type { Meta, Story } from '@storybook/react'

import {
  family,
  letterSpacing,
  lineHeight,
  transform,
  typeSize,
  weight,
} from '../index'

import { FieldLabel, Form, Input, Layout } from '../../dist'
import type { FieldLabelProps } from '../../dist'

export default {
  title: 'Components/Forms/Fields',
  component: FieldLabel,
  decorators: [
    (Fn) => (
      <Form>
        <Layout gap={2}>
          <Fn />
          <Input name="username" placeholder="Username" />
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

const Template: Story<FieldLabelProps> = (args) => <FieldLabel {...args} />
Template.args = {
  ...FieldLabel.defaultProps,
  children: 'Username',
  name: 'username',
}

export const Label: Story<FieldLabelProps> = Template.bind({})
Label.args = Template.args
