import type { Meta, Story } from '@storybook/react'

import { color, componentSize, edges, radius, variant } from '../index'

import { Button } from '../../dist'
import type { ButtonProps } from '../../dist'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: { color, radius, edges, size: componentSize, variant },
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />
Template.args = Button.defaultProps

export const Default: Story<ButtonProps> = Template.bind({})
Default.args = {
  ...Template.args,
  children: 'Button',
}

export const Disabled: Story<ButtonProps> = Template.bind({})
Disabled.args = {
  ...Template.args,
  children: 'Button',
  disabled: true,
}

export const Square: Story<ButtonProps> = Template.bind({})
Square.args = {
  ...Template.args,
  edges: 'circular',
  square: true,
  children: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      height="20"
      width="20"
    >
      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
    </svg>
  ),
}

export const Primary: Story<ButtonProps> = Template.bind({})
Primary.storyName = 'Primary (Color)'
Primary.args = {
  ...Template.args,
  children: 'Button',
  color: 'primary',
}

export const Circular: Story<ButtonProps> = Template.bind({})
Circular.storyName = 'Circular (Edges)'
Circular.args = {
  ...Template.args,
  children: 'Button',
  edges: 'circular',
}

export const Rounded: Story<ButtonProps> = Template.bind({})
Rounded.storyName = 'Rounded (Edges)'
Rounded.args = {
  ...Template.args,
  children: 'Button',
  edges: 'rounded',
}

export const Squared: Story<ButtonProps> = Template.bind({})
Squared.storyName = 'Squared (Edges)'
Squared.args = {
  ...Template.args,
  children: 'Button',
  edges: 'squared',
}

export const Fill: Story<ButtonProps> = Template.bind({})
Fill.storyName = 'Fill (Variant)'
Fill.args = {
  ...Template.args,
  children: 'Button',
}

export const Outline: Story<ButtonProps> = Template.bind({})
Outline.storyName = 'Outline (Variant)'
Outline.args = {
  ...Template.args,
  children: 'Button',
  variant: 'outline',
}

export const Ghost: Story<ButtonProps> = Template.bind({})
Ghost.storyName = 'Ghost (Variant)'
Ghost.args = {
  ...Template.args,
  children: 'Button',
  variant: 'ghost',
}

export const Small: Story<ButtonProps> = Template.bind({})
Small.storyName = 'Small (Size)'
Small.args = {
  ...Template.args,
  children: 'Button',
  size: 'sm',
}

export const Medium: Story<ButtonProps> = Template.bind({})
Medium.storyName = 'Medium (Size)'
Medium.args = {
  ...Template.args,
  children: 'Button',
  size: 'md',
}

export const Large: Story<ButtonProps> = Template.bind({})
Large.storyName = 'Large (Size)'
Large.args = {
  ...Template.args,
  children: 'Button',
  size: 'lg',
}

export const LIcon: Story<ButtonProps> = Template.bind({})
LIcon.storyName = 'Icon (Left)'
LIcon.args = {
  ...Template.args,
  children: (
    <>
      <svg
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        height="20"
        width="20"
      >
        <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
      </svg>
      <span>Adjust</span>
    </>
  ),
}

export const RIcon: Story<ButtonProps> = Template.bind({})
RIcon.storyName = 'Icon (Right)'
RIcon.args = {
  ...Template.args,
  children: (
    <>
      <span>Onward!</span>
      <svg
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        height="20"
        width="20"
      >
        <path
          fillRule="evenodd"
          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </>
  ),
}
