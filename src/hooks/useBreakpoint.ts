import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { BreakpointAtom } from '../theme'
import type { Breakpoint } from '../theme'

// --

export const useBreakpoints = () => useRecoilValue(BreakpointAtom)

// --

export const useTriggersBreakpoint = (bp: Breakpoint) => {
  const rawBpW = useBreakpoints()[bp]
  const bpW = parseInt(rawBpW)

  const [trigger, setTrigger] = useState(window.innerWidth > bpW)

  useEffect(() => {
    const onResize = () =>
      trigger !== window.innerWidth > bpW && setTrigger(window.innerWidth > bpW)

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })

  return trigger
}
