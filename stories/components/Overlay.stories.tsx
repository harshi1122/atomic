import { AnimatePresence } from 'framer-motion'
import type { Meta, Story } from '@storybook/react'

// import { color } from '../index'

import { Overlay } from '../../dist'
import type { OverlayProps } from '../../dist'

export default {
  title: 'Components/Overlay',
  component: Overlay,
  decorators: [
    (Fn) => (
      <AnimatePresence>
        <Fn />
      </AnimatePresence>
    ),
  ],
  argTypes: {
    show: { control: 'boolean' },
    z: { control: 'number' },
  },
} as Meta

const Template: Story<OverlayProps> = (args) => <Overlay {...args} />
Template.args = Overlay.defaultProps

export const Default: Story<OverlayProps> = Template.bind({})
Default.args = {
  ...Template.args,
}
