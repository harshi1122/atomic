import type { Meta, Story } from '@storybook/react'

// import { color } from '../index'

import { Form, TextArea } from '../../dist'
import type { TextAreaProps } from '../../dist'

export default {
  title: 'Components/Forms/Text Area',
  component: TextArea,
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

const Template: Story<TextAreaProps> = (args) => <TextArea {...args} />
Template.args = TextArea.defaultProps

export const Default: Story<TextAreaProps> = Template.bind({})
Default.args = {
  ...Template.args,
  name: 'textarea',
  placeholder: 'And it went like..',
}
