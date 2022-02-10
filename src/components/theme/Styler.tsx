import { useEffect, useMemo } from 'react'
import type { FC } from 'react'
import { useRecoilCallback } from 'recoil'

import { StylerAtomFamily } from '../../context'
import type {
  StylerObject,
  StylerObjectKeys,
  StylerStyles,
} from '../../context'
import { CSSProperties } from '../css'
import { createGlobalStyles } from '../../css'
import { useBreakpoints } from '../../hooks'
import { AtomicStyles } from '../../styles'
import type { Breakpoint } from '../../theme'
import { cssProperties } from '../../util'
import type { PR } from '../../util'

// ==

export interface StylerProps {
  /**
   * Override Atomic's default `StylerObject`, which defines the low-level visual apperance of its components.
   *
   * **Note:** This override is all-or-nothing - you **will** need to merge Atomic's styles with your own if your goal is to only add new styles.
   *
   * @example
   * // The example below demonstrates merging Atomic's defaults with some customizations.
   * import { AtomicStyles } from '@locktech/atomic'
   *
   * const App = () => (
   *   <AtomicProvider styler={{ ...AtomicStyles, Button: { ... } }}>
   *     ...
   *   </AtomicProvider>
   * )
   */
  styler?: StylerObject
}

// --

type Breakpoints = PR<Breakpoint, Record<string, string>>
type Colors = Record<'base' | 'dark', Record<string, string>>
type Styles = Record<StylerObjectKeys, StylerStyles>

// ==

/**
 * Parses a `StylerObject`, splitting each of its member's `base` and `variant` styles from their custom CSS properties - merging the later together.
 *
 * All styles will be merged under a single `styles` object, with each member's styles still seperated;
 * meanwhile, custom properties are kept seperated but each group contains all member's properties merged together.
 */
const parseSO = (o: StylerObject) => {
  const bps: Breakpoints = {}
  const colors: Colors = { base: {}, dark: {} }
  // @ts-expect-error Fields are populated in for-loop below
  const styles: Styles = {}

  Object.keys(o).forEach((ok) => {
    styles[ok] = {
      base: o[ok].base,
      variants: o[ok].variants,
    }

    // merge all breakpoints into many `Record<string, string>` objects (provided via `bps`)
    o[ok].bps &&
      Object.keys(o[ok].bps).forEach((bp) => {
        bps[bp] = { ...bps[bp], ...o[ok].bps[bp] }
      })

    // merge all colors into two `Record<string, string>` objects (provided via `colors`),
    // one for "base" (bright) colors the other for "dark" (dim)
    o[ok].colors &&
      Object.keys(o[ok].colors).forEach((c) => {
        colors.base[c] = o[ok].colors[c][0]
        colors.dark[c] = o[ok].colors[c][1]
      })
  })

  return { bps, colors, styles }
}

// --

/**
 * The Styler component is used to configure the low-level visual apperance of components which make use of its styles.
 *
 * Once configured, styles can be re-accessed using the `useStyler` hook.
 *
 * Components may define styles which fall into two categories:
 * * `base` - Styles which will always be applied to a component, setting its default visual apperance.
 * * `variants` - Styles which will apply conditionally, depending on the presence of a dynamic value.
 *
 * Components are free to define variants for whatever customizations they have.
 * There can be *n* variants, with each variant having *n* variations..
 *
 * > This API is inspired by Chakra-UI, my 💕 to them for the head-start.
 */
export const Styler: FC<StylerProps> = ({ styler }) => {
  /**
   * Sets the value of many [atoms](https://recoiljs.org/docs/api-reference/core/atom) belonging to the `StylerAtomFamily`.
   * The atoms have identifiers, which are the keys of `styles`; and a value, which is the value held at `styles[key]`.
   */
  const setStylerStyles = useRecoilCallback(
    ({ set }) =>
      (styles: Styles) =>
        Object.keys(styles).forEach((key: StylerObjectKeys) =>
          set(StylerAtomFamily(key), styles[key])
        ),
    []
  )

  const { bps, colors, styles } = useMemo(() => parseSO(styler), [styler])

  useEffect(
    () => typeof styles === 'object' && setStylerStyles(styles),
    [setStylerStyles, styles]
  )

  const bpState = useBreakpoints()

  return (
    <>
      <CSSProperties properties={colors.base} />
      <CSSProperties properties={colors.dark} selector="body.dark" />
      {Object.keys(bps).map((bp) =>
        createGlobalStyles`
          ${`@media only screen and (min-width: ${bpState[bp] || bp})`} {
            :root {
              ${cssProperties(bps[bp])}
            }
          }
        `()
      )}
    </>
  )
}

Styler.defaultProps = {
  styler: AtomicStyles,
}
