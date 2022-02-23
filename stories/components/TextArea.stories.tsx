import type { Meta, Story } from '@storybook/react'

import { inputVariants } from '../index'

import { Form, TextArea } from '../../dist'
import type { TextAreaProps } from '../../dist'

export default {
  title: 'Components/Forms/Text Area',
  component: TextArea,
  argTypes: { variant: inputVariants },
  decorators: [
    (Fn) => (
      <Form>
        <Fn />
      </Form>
    ),
  ],
} as Meta

const Template: Story<TextAreaProps> = (args) => <TextArea {...args} />
Template.args = TextArea.defaultProps

export const Default: Story<TextAreaProps> = Template.bind({})
Default.args = {
  ...Template.args,
  name: 'textarea',
  placeholder: 'Mandatory Haiku',
}
