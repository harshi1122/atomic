import type { Meta, Story } from '@storybook/react'

// import { color } from '../index'

import { Button, Card, Flex, Modal, Text, useToggle } from '../../dist'
import type { ModalProps } from '../../dist'

export default {
  title: 'Components/Modal',
  component: Modal,
} as Meta

const Template: Story<ModalProps> = (args) => {
  const [open, toggleOpen] = useToggle()
  return (
    <>
      <Button onClick={toggleOpen}>Open</Button>
      <Modal onClose={toggleOpen} open={open} {...args}>
        <Card outline shadow="lg">
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
        </Card>
      </Modal>
    </>
  )
}
Template.args = Modal.defaultProps

export const Default: Story<ModalProps> = Template.bind({})
Default.args = {
  ...Template.args,
}
