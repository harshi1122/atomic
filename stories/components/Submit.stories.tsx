import type { Meta, Story } from '@storybook/react'

import { color, radius } from '../index'

import { Form, Submit } from '../../dist'
import type { SubmitProps } from '../../dist'

export default {
  title: 'Components/Forms/Submit',
  component: Submit,
  argTypes: {
    color,
    radius,
    rounded: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['fill', 'ghost', 'outline'],
    },
  },
  decorators: [
    (Fn) => (
      <Form>
        <Fn />
      </Form>
    ),
  ],
} as Meta

const Template: Story<SubmitProps> = (args) => <Submit {...args} />
Template.args = Submit.defaultProps

export const Default: Story<SubmitProps> = Template.bind({})
Default.args = {
  ...Template.args,
  children: 'Submit',
}
