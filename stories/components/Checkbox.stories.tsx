import type { Meta, Story } from '@storybook/react'

// import { color } from '../index'

import { Checkbox, Form } from '../../dist'
import type { CheckboxProps } from '../../dist'

export default {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  decorators: [
    (Fn) => (
      <Form>
        <Fn />
      </Form>
    ),
  ],
} as Meta

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />
Template.args = Checkbox.defaultProps

export const Default: Story<CheckboxProps> = Template.bind({})
Default.args = {
  ...Template.args,
  name: 'foo',
}
