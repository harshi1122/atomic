import type { FC } from 'react'

import { createGlobalStyles } from '../../css'
import { cssProperties } from '../../util'

export interface CSSPropertiesProp {
  /**
   * The CSS selector under which the properties will be added.
   *
   * @default ':root'
   */
  selector?: string
  /**
   * An optional prefix, added to each property.
   *
   * @default undefined
   */
  name?: string
  /**
   * A `Record` of key-value pairings.
   * Each key and value should be of type `string`.
   *
   * @default undefined
   */
  properties: Record<string, string>
}

/**
 * Upserts many scoped [CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).
 */
export const CSSProperties: FC<CSSPropertiesProp> = ({
  name,
  properties,
  selector = ':root',
}) => {
  return createGlobalStyles`
    ${selector} {
      ${cssProperties(properties, name)}
    }
  `()
}

CSSProperties.displayName = 'CSSProperties'
