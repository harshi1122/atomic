import type { Meta, Story } from '@storybook/react'

import { inputVariants } from '../index'

import { Form, Select } from '../../dist'
import type { SelectProps } from '../../dist'

export default {
  title: 'Components/Forms/Select',
  component: Select,
  argTypes: { variant: inputVariants },
  decorators: [
    (Fn) => (
      <Form>
        <Fn />
      </Form>
    ),
  ],
} as Meta

const Template: Story<SelectProps> = (args) => <Select {...args} />
Template.args = {
  ...Select.defaultProps,
  children: (
    <>
      <Select.Button />
      <Select.List>
        <Select.Option value="Apple" />
        <Select.Option value="Banana" />
        <Select.Option value="Cucumber" />
      </Select.List>
    </>
  ),
  name: 'example',
}

export const Default: Story<SelectProps> = Template.bind({})
Default.args = Template.args

export const Disabled: Story<SelectProps> = Template.bind({})
Disabled.args = {
  ...Template.args,
  disabled: true,
}

export const DisabledItem: Story<SelectProps> = Template.bind({})
DisabledItem.storyName = 'Disabled (Item)'
DisabledItem.args = {
  ...Template.args,
  children: (
    <>
      <Select.Button />
      <Select.List>
        <Select.Option value="Apple" />
        <Select.Option disabled value="Banana" />
        <Select.Option value="Cucumber" />
      </Select.List>
    </>
  ),
}

export const Small: Story<SelectProps> = Template.bind({})
Small.args = {
  ...Template.args,
  children: (
    <>
      <Select.Button />
      <Select.List>
        <Select.Option size="sm" value="Apple" />
        <Select.Option size="sm" value="Banana" />
        <Select.Option size="sm" value="Cucumber" />
      </Select.List>
    </>
  ),
}

export const Medium: Story<SelectProps> = Template.bind({})
Medium.args = Template.args

export const Large: Story<SelectProps> = Template.bind({})
Large.args = {
  ...Template.args,
  children: (
    <>
      <Select.Button />
      <Select.List>
        <Select.Option size="lg" value="Apple" />
        <Select.Option size="lg" value="Banana" />
        <Select.Option size="lg" value="Cucumber" />
      </Select.List>
    </>
  ),
}

const MenuItems = [
  'sit',
  'oatmeal',
  'tell',
  'touch',
  'calendar',
  'withdraw',
  'things',
  'tremble',
  'nondescript',
  'simplistic',
  'baby',
  'support',
  'chemical',
  'truthful',
  'bead',
  'knotty',
  'succeed',
  'helpful',
  'lumpy',
  'speed',
]

export const Scrolling: Story<SelectProps> = Template.bind({})
Scrolling.args = {
  ...Template.args,
  children: (
    <>
      <Select.Button />
      <Select.List>
        {MenuItems.map((item) => (
          <Select.Option key={item} value={item} />
        ))}
      </Select.List>
    </>
  ),
}
