import type { Meta, Story } from '@storybook/react'

import { color, componentSize, edges, radius, variant } from '../index'

import { Form, Submit } from '../../dist'
import type { SubmitProps } from '../../dist'

export default {
  title: 'Components/Forms/Submit',
  component: Submit,
  argTypes: { color, edges, radius, size: componentSize, variant },
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
