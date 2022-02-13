import type { Meta, Story } from '@storybook/react'

import { spacing } from '../index'

import { Flex, Paper, Text } from '../../dist'
import type { FlexProps, PaperProps, TextProps } from '../../dist'

export default {
  title: 'Components/Flex',
  component: Flex,
  argTypes: {
    gap: spacing,
    order: { control: 'number' },
    m: { control: 'array' },
    p: { control: 'array' },
    align: {
      control: 'select',
      options: [
        'baseline',
        'center',
        'flex-start',
        'flex-end',
        'inherit',
        'initial',
        'stretch',
      ],
    },
    justify: {
      control: 'select',
      options: [
        'center',
        'flex-start',
        'flex-end',
        'inherit',
        'initial',
        'space-around',
        'space-between',
      ],
    },
  },
} as Meta

const Template: Story<FlexProps> = (args) => (
  <>
    <style
      dangerouslySetInnerHTML={{
        __html: `
        #root {
          height: 100%;
        }
      `,
      }}
    />
    <Flex {...args} />
  </>
)
Template.args = {
  ...Flex.defaultProps,
  m: [0],
  p: [0],
}

const PP: PaperProps = {
  color: 'primary.5',
  height: '50px',
  width: '50px',
}

const TP: TextProps = { color: 'primary.5.text' }

export const Default: Story<FlexProps> = Template.bind({})
Default.args = {
  ...Template.args,
  children: (
    <>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <Paper key={i} {...PP}>
          <Flex center fill>
            <Text {...TP}>{i}</Text>
          </Flex>
        </Paper>
      ))}
    </>
  ),
}

export const Centered: Story<FlexProps> = Template.bind({})
Centered.args = {
  ...Template.args,
  children: (
    <>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <Paper key={i} {...PP}>
          <Flex center fill>
            <Text {...TP}>{i}</Text>
          </Flex>
        </Paper>
      ))}
    </>
  ),
  row: true,
  gap: 4,
  center: true,
  fill: true,
}
