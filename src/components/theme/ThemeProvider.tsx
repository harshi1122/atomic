import type { FC } from 'react'

import { createGlobalStyles } from '../../css'
import { AtomicTheme } from '../../theme'
import type { Theme } from '../../theme'
import { cssProperty, cssvar } from '../../util'

import {
  BreakpointProvider,
  ColorProvider,
  RadiusProvider,
  ShadowProvider,
  SpaceProvider,
  TypographyProvider,
} from '../../theme'

const ColorModeProvider = createGlobalStyles`
   :root {
     ${cssProperty('color.text', cssvar('color.neutral.9.hex'))}
     ${cssProperty('color.hint', cssvar('color.neutral.6.hex'))}
     & body.dark {
       ${cssProperty('color.text', cssvar('color.neutral.0.hex'))}
       ${cssProperty('color.hint', cssvar('color.neutral.3.hex'))}
     }
   }
 `

export const ThemeProvider: FC<Theme> = (p) => (
  <>
    <BreakpointProvider {...p.breakpoint} />
    <ColorProvider {...p.color} />
    <RadiusProvider {...p.radius} />
    <ShadowProvider {...p.shadow} />
    <SpaceProvider {...p.space} />
    <TypographyProvider {...p.typography} />
    {/*  */}
    <ColorModeProvider />
  </>
)

ThemeProvider.displayName = 'ThemeProvider'
ThemeProvider.defaultProps = AtomicTheme
