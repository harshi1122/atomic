import { useEffect, useMemo } from 'react'
import type { FC } from 'react'
import { useRecoilCallback } from 'recoil'

import { StylerAtomFamily } from '../../context'
import type {
  StylerAtomState,
  StylerObject,
  StylerObjectKeys,
} from '../../context'
import { CSSProperties } from '../css'
import { createGlobalStyles, cssProperties } from '../../css'
import { AtomicStyles } from '../../styles'
import { useBreakpoint } from '../../theme'
import type { Breakpoint } from '../../theme'
import type { PR } from '../../util'

// ==

// The types which `parseSO` splits a `StylerObject` into.

type BreakpointProperties = PR<Breakpoint, Record<string, string>>
type ColorProperties = Record<'light' | 'dark', Record<string, string>>
type AtomStyles = Record<StylerObjectKeys, StylerAtomState>

// --

/**
 * Parses a `StylerObject`, splitting its `base` and `variant` styles from custom CSS properties.
 */
const parseSO = (o: StylerObject) => {
  const bps: BreakpointProperties = {}
  const colors: ColorProperties = { light: {}, dark: {} }
  // @ts-expect-error Fields are populated in for-loop below
  const styles: AtomStyles = {}

  Object.keys(o).forEach((ok) => {
    styles[ok] = {
      base: o[ok].base,
      variants: o[ok].variants,
    }

    // merge all breakpoints into many `Record<string, string>` objects (provided via `bps`).
    o[ok].bps &&
      Object.keys(o[ok].bps).forEach((bp) => {
        bps[bp] = { ...bps[bp], ...o[ok].bps[bp] }
      })

    // merge all colors into two `Record<string, string>` objects (provided via `colors`),
    // one for "base" (light) colors the other for "dark".
    o[ok].colors &&
      Object.keys(o[ok].colors).forEach((c) => {
        colors.light[c] = o[ok].colors[c][0]
        colors.dark[c] = o[ok].colors[c][1]
      })
  })

  return { bps, colors, styles }
}

// --

export const StyleProvider: FC<StylerObject> = (styler) => {
  /**
   * Sets the value of many [atoms](https://recoiljs.org/docs/api-reference/core/atom) belonging to the `StylerAtomFamily`.
   * The atoms have identifiers, which are the keys of `styles`; and a value, which is the value held at `styles[key]`.
   */
  const setStylerStyles = useRecoilCallback(
    ({ set }) =>
      (styles: AtomStyles) =>
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

  const bpState = useBreakpoint()

  return (
    <>
      <CSSProperties properties={colors.light} />
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

StyleProvider.displayName = 'StyleProvider'
StyleProvider.defaultProps = AtomicStyles
