import { useEffect, useState } from 'react'

import { useBreakpoint } from '../theme/breakpoint'
import type { Breakpoint } from '../theme'

// --

const matchMax = (w: string) => window.matchMedia(`(max-width: ${w})`).matches
const matchMin = (w: string) => window.matchMedia(`(min-width: ${w})`).matches

/**
 * A hook which returns a boolean when the corresponding [width media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/width) would be applied.
 * This media feature is typically used to create responsive designs, to adapt styles to a multitude of devices: mobile, desktop, embedded.
 *
 * Specifically, the `max` and `min` variants of the media feature are provided — which behave as:
 *
 * * `max` — Return `false` when the device's width is **greater than** the breakpoint's.
 * * `min` — Return `true` when the device's width is **greater than** the breakpoint's.
 *
 * @param bp The `key` of one of Atomic or your application's configured breakpoints — or an arbitrary width (`300px`, `450rem`)
 * @param variant Corresponds to the `max-` and `min-` variants of the width media feature — controls how the device's width influences the returned value.
 *
 * @example
 *
 * useMediaWidth('sm')
 * useMediaWidth('400px')
 * useMediaWidth('lg', 'max')
 */
export const useMediaWidth = (
  bp: Breakpoint,
  variant: 'max' | 'min' = 'min'
): boolean => {
  const bpWidth = useBreakpoint()[bp] || bp

  const matches = variant === 'max' ? matchMax : matchMin
  const [triggered, setTriggered] = useState(matches(bpWidth))

  useEffect(() => {
    const onResize = () => {
      const match = matches(bpWidth)
      triggered !== match && setTriggered(match)
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [bpWidth, setTriggered, triggered, matches])

  return triggered
}
