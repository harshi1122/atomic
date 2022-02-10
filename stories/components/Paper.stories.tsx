import type { Meta, Story } from '@storybook/react'

import {
  blur,
  hue,
  opaque,
  outline,
  radius,
  saturate,
  sepia,
  shadow,
} from '../index'

import { Paper } from '../../dist'
import type { PaperProps } from '../../dist'

export default {
  title: 'Components/Paper',
  component: Paper,
  argTypes: {
    blur,
    hue,
    image: { control: 'text' },
    opaque,
    outline,
    radius,
    saturate,
    sepia,
    shadow,
  },
} as Meta

const Template: Story<PaperProps> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
    <Paper {...args} />
  </div>
)
Template.args = Paper.defaultProps

export const Filled: Story<PaperProps> = Template.bind({})
Filled.args = {
  ...Template.args,
  color: 'primary.5',
  height: '200px',
  width: '300px',
}

export const CustomColor: Story<PaperProps> = Template.bind({})
CustomColor.args = {
  ...Template.args,
  color: 'orange',
  height: '200px',
  width: '300px',
}

export const Image: Story<PaperProps> = Template.bind({})
Image.storyName = 'Image (w/ Aspect Ratio)'
Image.args = {
  ...Template.args,
  image:
    'https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGZvcmVzdHxlbnwwfHwwfHw%3D&w=1000&q=80',
  ratio: 16 / 9,
}
