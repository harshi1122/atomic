import type { Meta, Story } from '@storybook/react'

// import { color } from '../index'

import {
  Button,
  Card,
  Checkbox,
  FieldError,
  FieldHint,
  FieldLabel,
  Form,
  FormError,
  Input,
  Layout,
  Select,
  Text,
} from '../../dist'
import type { FormProps } from '../../dist'

export default {
  title: 'Components/Forms',
  component: Form,
  argTypes: { onSubmit: { action: 'onSubmit' } },
} as Meta

const Template: Story<FormProps> = (args) => (
  <Card outline shadow="sm">
    <Layout gap={6} p={6}>
      <Layout gap={2}>
        <Text as="h1" size="2xl" weight="bold">
          Who goes there?
        </Text>
        <Text color="hint" size="sm">
          Enter your password and provided secret to continue.
        </Text>
      </Layout>
      <Form {...args} />
    </Layout>
  </Card>
)
Template.args = {
  ...Form.defaultProps,
  children: (
    <Layout gap={6}>
      <Layout gap={2}>
        <FieldLabel name="password">Password</FieldLabel>
        <Input
          name="password"
          placeholder="Password"
          type="password"
          validation={{ required: true }}
        />
        <FieldError name="password" />
        <FieldHint name="password">
          Just a thought: Your birthday is a terrible idea for a password.
        </FieldHint>
      </Layout>
      <Layout gap={2}>
        <FieldLabel name="secret">Secret File</FieldLabel>
        <Input name="secret" type="file" variant="outline" />
        <FieldError name="secret" />
      </Layout>
      <Layout gap={2}>
        <FieldLabel name="country">Login Location (Optional)</FieldLabel>
        <Select name="country">
          <Select.Button placeholder="Authentication Location" />
          <Select.List>
            <Select.Option value="afg">Afghanistan</Select.Option>
            <Select.Option value="it">Italy</Select.Option>
            <Select.Option value="us">United States</Select.Option>
          </Select.List>
        </Select>
      </Layout>
      <Layout align="center" row gap={3}>
        <Checkbox name="remember" />
        <FieldLabel name="remember">Remember this device?</FieldLabel>
      </Layout>
      <Layout align="flex-end">
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Layout>
    </Layout>
  ),
}

export const Default: Story<FormProps> = Template.bind({})
Default.args = Template.args

export const Error: Story<FormProps> = (args) => (
  <Layout gap={8}>
    <FormError
      error={{
        graphQLErrors: [
          // @ts-expect-error ain't nobody got time to declare all that
          {
            message: 'An error occured trying to create your account.',
            extensions: {
              properties: {
                messages: {
                  Username: ['- Contains one or more invalid characters.'],
                  Password: ['- Must be greater than 6 characters long.'],
                },
              },
            },
          },
        ],
      }}
    />
    <Card outline shadow="sm">
      <Layout gap={6} p={6}>
        <Layout gap={2}>
          <Text as="h1" size="2xl" weight="bold">
            Who goes there?
          </Text>
          <Text color="hint" size="sm">
            Enter your password and provided secret to continue.
          </Text>
        </Layout>
        <Form {...args} />
      </Layout>
    </Card>
  </Layout>
)
Error.args = Template.args
