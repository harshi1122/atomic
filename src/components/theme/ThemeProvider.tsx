import type { FC } from 'react'

import { AtomicTheme } from '../../theme'
import type { Theme } from '../../theme'

import {
  BreakpointProvider,
  ColorProvider,
  RadiusProvider,
  ShadowProvider,
  SpaceProvider,
  TypographyProvider,
  //
  // useSetBreakpoints,
  // setRadiusProperties,
  // setShadowProperties,
  // setSpaceProperties,
  // setTypeProperties,
} from '../../theme'

export const ThemeProvider: FC<Theme> = (p) => (
  <>
    <BreakpointProvider {...p.breakpoint} />
    <ColorProvider {...p.color} />
    <RadiusProvider {...p.radius} />
    <ShadowProvider {...p.shadow} />
    <SpaceProvider {...p.space} />
    <TypographyProvider {...p.typography} />
  </>
)

// return createGlobalStyles`
//   :root {
//     ${setColorProperties(p.color)}
//     ${setRadiusProperties(p.radius)}
//     ${setShadowProperties(p.shadow)}
//     ${setSpaceProperties(p.space)}
//     ${setTypeProperties(p.type)}

//     ${cssProperty('color.text', cssvar('color.neutral.9'))}
//     ${cssProperty('color.hint', cssvar('color.neutral.6'))}

//     & body.dark {
//       ${cssProperty('color.text', cssvar('color.neutral.0'))}
//       ${cssProperty('color.hint', cssvar('color.neutral.3'))}
//     }
//   }
// `()

ThemeProvider.displayName = 'ThemeProvider'
ThemeProvider.defaultProps = AtomicTheme
