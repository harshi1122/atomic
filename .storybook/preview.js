import React from 'react'
import { addParameters } from '@storybook/react'
import { DocsPage, DocsContainer } from '@storybook/addon-docs'

import { AtomicProvider } from '../dist'

import { theme } from './manager'
import './index.css'
import { BackToTop, ToC } from './toc'

// --

const withAtomic = (Fn, ctx) => {
  return (
    <AtomicProvider recoil={ctx.globals.debugRecoil === 'enable' && { captureChanges: true }}>
      <Fn />
    </AtomicProvider>
  )
}

// --

const order = [
  'Atomic',
  ['Introduction'],
  'Customize',
  ['Theming', 'Styling'],
  'Guides',
  'State',
  ['Introduction'],
  'Hooks',
  ['Introduction'],
  'Components',
  ['CSS Properties']
]

// taken from atomic's default breakpoints
const viewports = {
  sm: {
    name: 'Small',
    styles: {
      height: '720px',
      width: '640px',
    }
  },
  md: {
    name: 'Medium',
    styles: {
      height: '720px',
      width: '768px',
    }
  },
  lg: {
    name: 'Large',
    styles: {
      height: '720px',
      width: '1024px',
    }
  },
  xl: {
    name: 'X-Large',
    styles: {
      height: '720px',
      width: '1280px',
    }
  },
  '2xl': {
    name: '2X-Large',
    styles: {
      height: '864px',
      width: '1536px',
    }
  },
}

// --

export const globalTypes = {
  debugRecoil: {
    name: 'Debug Recoil',
    description: 'Enable Atomic\'s built-in debugger for Recoil.',
    defaultValue: 'disable',
    toolbar: {
      icon: 'structure',
      items: ['enable', 'disable'],
    }
  }
}

export const argTypes = {
  children: {
    control: false
  },
}

export const decorators = [withAtomic]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: { disable: true },
  layout: "padded",
  themes: [
    { name: 'light', class: '', color: '#E5E5EB' },
    { name: 'dark', class: 'dark', color: '#1F212E' },
  ],
  options: {
    storySort: { order },
  },
  // viewport: {
  //   viewports,
  // },
}

addParameters({
  docs: {
    container: ({ children, ...p }) => (
      <DocsContainer {...p}>
        <ToC />
        {children}
        <BackToTop />
      </DocsContainer>
    ),
    page: DocsPage,
    theme,
  },
})
