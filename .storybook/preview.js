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

export const argTypes = { children: { control: false } }

// --

const order = [
  'Introduction',
  'Installation',
  'Customize',
  ['Theming', ['Introduction'], 'Styling', ['Introduction']],
  'Guides',
  'State',
  ['Introduction', 'Recoil Debugger'],
  'Hooks',
  ['Introduction'],
  'Components',
  ['CSS Properties']
]

addParameters({
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: { disable: true },
  layout: "padded",
  options: { storySort: { order }, },
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
    transformSource: (src, _ctx) => src,
  },
})
