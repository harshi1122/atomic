import type { Meta, Story } from '@storybook/react'

// import { color } from '../index'

import {
  Card,
  Checkbox,
  FieldError,
  FieldHint,
  FieldLabel,
  Flex,
  Form,
  FormError,
  Input,
  Select,
  Submit,
  Text,
  useTriggersBreakpoint,
} from '../../dist'
import type { FormProps } from '../../dist'

export default {
  title: 'Components/Forms',
  component: Form,
  argTypes: { onSubmit: { action: 'onSubmit' } },
} as Meta

const Template: Story<FormProps> = (args) => {
  const isMd = useTriggersBreakpoint('md')
  return (
    <Flex {...(isMd ? { m: 'auto', p: [6, 0, 0, 0], width: '50%' } : {})}>
      <Card outline shadow="sm">
        <Flex gap={6} p={6}>
          <Flex gap={2}>
            <Text as="h1" size="2xl" weight="bold">
              Who goes there?
            </Text>
            <Text color="hint" size="sm">
              Enter your password and provided secret to continue.
            </Text>
          </Flex>
          <Form {...args} />
        </Flex>
      </Card>
    </Flex>
  )
}
Template.args = {
  ...Form.defaultProps,
  children: (
    <Flex gap={6}>
      <Flex gap={2}>
        <FieldLabel name="password" required>
          Password
        </FieldLabel>
        <Input
          name="password"
          placeholder="Password"
          type="password"
          validation={{ required: true }}
        />
        <FieldError name="password" />
        <FieldHint hideError name="password">
          Just a thought: Your birthday is a terrible idea for a password.
        </FieldHint>
      </Flex>
      <Flex gap={2}>
        <FieldLabel name="secret">Secret File</FieldLabel>
        <Input name="secret" type="file" variant="outline" />
        <FieldError name="secret" />
      </Flex>
      <Flex gap={2}>
        <FieldLabel name="country">Login Location (Optional)</FieldLabel>
        <Select name="country">
          <Select.Button placeholder="Authentication Location" />
          <Select.List>
            <Select.Option value="afg">Afghanistan</Select.Option>
            <Select.Option value="it">Italy</Select.Option>
            <Select.Option value="us">United States</Select.Option>
          </Select.List>
        </Select>
      </Flex>
      <Flex align="center" row gap={3}>
        <Checkbox name="remember" />
        <FieldLabel name="remember">Remember this device?</FieldLabel>
      </Flex>
      <Flex align="flex-end">
        <Submit color="primary">Submit</Submit>
      </Flex>
    </Flex>
  ),
}

export const Default: Story<FormProps> = Template.bind({})
Default.args = Template.args

export const Error: Story<FormProps> = (args) => {
  const isMd = useTriggersBreakpoint('md')
  return (
    <Flex
      gap={8}
      {...(isMd ? { m: 'auto', p: [6, 0, 0, 0], width: '50%' } : {})}
    >
      <FormError
        error={{
          graphQLErrors: [
            // @ts-expect-error ain't nobody got time to declare all that
            {
              message: 'An error occured trying to see "who goes there".',
              extensions: {
                properties: {
                  messages: {
                    Passwords: [
                      '- Must be greater than 6 characters long.',
                      '- Cannot contain known phrases or words.',
                    ],
                    'Secret File': ['- Cannot be un-encrypted.'],
                  },
                },
              },
            },
          ],
        }}
      />
      <Card outline shadow="sm">
        <Flex gap={6} p={6}>
          <Flex gap={2}>
            <Text as="h1" size="2xl" weight="bold">
              Who goes there?
            </Text>
            <Text color="hint" size="sm">
              Enter your password and provided secret to continue.
            </Text>
          </Flex>
          <Form {...args} />
        </Flex>
      </Card>
    </Flex>
  )
}
Error.args = Template.args
