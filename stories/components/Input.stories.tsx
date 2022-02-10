import { Form } from '@redwoodjs/forms'
import type { Meta, Story } from '@storybook/react'

// import { color } from '../index'

import { Input } from '../../dist'
import type { InputProps } from '../../dist'

export default {
  title: 'Components/Forms/Input',
  component: Input,
  decorators: [
    (Fn) => (
      <Form>
        <Fn />
      </Form>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['fill', 'outline'],
    },
  },
} as Meta

const Template: Story<InputProps> = (args) => <Input {...args} />
Template.args = Input.defaultProps

export const Fill: Story<InputProps> = Template.bind({})
Fill.args = {
  ...Template.args,
  name: 'username',
  placeholder: 'Username',
}

export const Outline: Story<InputProps> = Template.bind({})
Outline.args = {
  ...Template.args,
  name: 'username',
  placeholder: 'Username',
  variant: 'outline',
}

export const Disabled: Story<InputProps> = Template.bind({})
Disabled.args = {
  ...Template.args,
  disabled: true,
  name: 'username',
  placeholder: 'Username',
}

export const File: Story<InputProps> = Template.bind({})
File.args = {
  ...Template.args,
  name: 'username',
  placeholder: 'Username',
  type: 'file',
  variant: 'outline',
}
