import { useEffect, useState } from 'react'

/**
 * Returns the `windows` inner height and width as a tuple.
 */
const getDim = (): [number, number] => [window.innerHeight, window.innerWidth]

/**
 * Returns a tuple containing the device's height and width in the form:
 *
 * `[height, width]`
 *
 * This value will be updated whenever the device is re-sized.
 */
export const useDeviceDimensions = () => {
  const [dimensions, setDimensions] = useState(getDim())

  useEffect(() => {
    const onResize = () => setDimensions(getDim())

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return dimensions
}

/**
 * Returns the device's current `height`, triggering a re-render when that value changes.
 */
export const useDeviceHeight = () => useDeviceDimensions()[0]

/**
 * Returns the device's current `width`, triggering a re-render when that value changes.
 */
export const useDeviceWidth = () => useDeviceDimensions()[1]
