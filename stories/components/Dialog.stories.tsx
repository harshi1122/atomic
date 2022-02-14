import type { Meta, Story } from '@storybook/react'

// import { color } from '../index'

import { Button, Dialog, Flex, Text, useToggle } from '../../dist'
import type { DialogProps } from '../../dist'

export default {
  title: 'Components/Dialog',
  component: Dialog,
  argTypes: {
    side: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
} as Meta

const Template: Story<DialogProps> = ({ children, ...args }) => {
  const [open, toggleOpen, setOpen] = useToggle()
  return (
    <>
      <Button onClick={toggleOpen}>Open</Button>
      <Dialog onClose={setOpen} open={open} {...args}>
        {children || (
          <Flex gap={6} p={6}>
            <Flex gap={2}>
              <Text as="h1" size="2xl" weight="bold">
                Delete Black Hole
              </Text>
              <Text color="hint" size="sm">
                Are you certain you want to delete this black hole from
                existance?
              </Text>
            </Flex>
            <Flex row justify="flex-end" gap={4}>
              <Button color="danger" onClick={toggleOpen}>
                Delete
              </Button>
              <Button variant="ghost" onClick={toggleOpen}>
                Cancel
              </Button>
            </Flex>
          </Flex>
        )}
      </Dialog>
    </>
  )
}
Template.args = Dialog.defaultProps

export const Left: Story<DialogProps> = Template.bind({})
Left.args = {
  ...Template.args,
  side: 'left',
}

export const Right: Story<DialogProps> = Template.bind({})
Right.args = {
  ...Template.args,
  side: 'right',
}

export const Overflow: Story<DialogProps> = Template.bind({})
Overflow.args = {
  ...Template.args,
  side: 'left',
  children: (
    <Flex gap={6} p={6}>
      <Flex gap={2}>
        <Text as="h1" size="2xl" weight="bold">
          Delete Black Hole
        </Text>
        <Text color="hint" size="sm">
          Are you certain you want to delete this black hole from existance?
        </Text>
      </Flex>
      {Array.from(Array(50)).map((_, idx) => (
        <br key={idx} />
      ))}
    </Flex>
  ),
}
