import type { Meta, Story } from '@storybook/react'

import { Button, Menu } from '../../dist'
import type { MenuProps } from '../../dist'

export default {
  title: 'Components/Menu',
  component: Menu,
} as Meta

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

const Template: Story<MenuProps> = (args) => (
  <Menu {...args}>
    <Menu.Button as={Button} edges="circular" square variant="ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        height="20"
        width="20"
      >
        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
      </svg>
    </Menu.Button>
    <Menu.List>
      {MenuItems.map((itm) => (
        <Menu.Item key={itm}>{itm}</Menu.Item>
      ))}
    </Menu.List>
  </Menu>
)
Template.args = Menu.defaultProps

export const Default: Story<MenuProps> = Template.bind({})
