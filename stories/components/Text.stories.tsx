import type { Meta, Story } from '@storybook/react'

import {
  family,
  letterSpacing,
  lineHeight,
  transform,
  typeSize,
  weight,
  wrap,
} from '../index'

import { Paper, Flex, Text } from '../../dist'
import type { TextProps } from '../../dist'

export default {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    family,
    letterSpacing,
    lineHeight,
    size: typeSize,
    transform,
    weight,
    wrap,
  },
} as Meta

const Template: Story<TextProps> = (args) => <Text {...args} />
Template.args = Text.defaultProps

export const Default: Story<TextProps> = Template.bind({})
Default.args = {
  ...Template.args,
  children: 'Hello world',
}

export const Heading: Story<TextProps> = Template.bind({})
Heading.args = {
  ...Template.args,
  as: 'h1',
  children: 'Atomic UI',
  letterSpacing: 'wide',
  size: '4xl',
  weight: 'bold',
}

export const Ellipsis: Story<TextProps> = Template.bind({})
Ellipsis.args = {
  ...Template.args,
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec ex eu turpis scelerisque consequat. Sed sed suscipit eros, at semper lectus. Morbi metus orci, euismod quis libero sit amet, convallis fermentum mauris.',
  wrap: false,
}

// TODO: Add an example of text on a colored background, highlighting the easy of doing:
/*
  <Paper color="primary.6">
    <Text color="primary.6.text">Hello World</Text>
  </Paper>
*/

export const Color: Story<TextProps> = (args) => (
  <Paper color={args.color.replace('.text', '')}>
    <Flex p={3}>
      <Text {...args}>Some kind of sample text</Text>
    </Flex>
  </Paper>
)
Color.args = {
  ...Template.args,
  color: 'primary.6.text',
}
