import React, { useEffect } from 'react'
import { addParameters } from '@storybook/react'
import { DocsPage, DocsContainer } from '@storybook/addon-docs'

import { AtomicProvider, useSetColorMode } from '../dist'

import { theme } from './manager'
import './index.css'
import { BackToTop, ToC } from './toc'

// --

export const globalTypes = {
  colorMode: {
    name: 'Color Mode',
    description: 'Toggle Atomic\'s color scheme.',
    defaultValue: 'light',
    toolbar: {
      icon: 'mirror',
      items: ['light', 'dark'],
    },
  },
  debugRecoil: {
    name: 'Debug Recoil',
    description: 'Enable Atomic\'s built-in debugger for Recoil.',
    defaultValue: 'disable',
    toolbar: {
      icon: 'structure',
      items: ['enable', 'disable'],
    }
  },
}

// --

const withAtomic = (Fn, { globals: { debugRecoil } }) => {
  return (
    <AtomicProvider recoil={debugRecoil === 'enable' && { captureChanges: true }}>
      <Fn />
    </AtomicProvider>
  )
}

const withColorMode = (Fn, { globals: { colorMode } }) => {
  const setColorMode = useSetColorMode()
  useEffect(() => setColorMode(colorMode), [colorMode])
  return <Fn />
}

export const decorators = [withColorMode, withAtomic]

// --

export const argTypes = {
  children: {
    control: false
  },
}

// --

const order = [
  'Introduction',
  'Installation',
  'Customize',
  ['Theming', 'Styling'],
  'Guides',
  'State',
  ['Introduction', 'Recoil Debugger'],
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

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: { disable: true },
  layout: "padded",
  options: { storySort: { order }, },
  // themes: [
  //   { name: 'light', class: '', color: '#E5E5EB' },
  //   { name: 'dark', class: 'dark', color: '#1F212E' },
  // ],
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
