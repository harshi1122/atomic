import type { FC } from 'react'

import { createGlobalStyles } from '../../css'
import { cssProperty } from '../../util'

export interface CSSPropertyProps {
  /**
   * The name to add the property as.
   *
   * `--{property}: ...;`
   */
  property: string
  /**
   * The CSS selector under which the property will be added.
   *
   * @default ':root'
   */
  selector?: string
  /**
   * The value to set the property to.
   *
   * `--...: {value}`
   */
  value: string
}

/**
 * Upserts a single scoped [CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).
 */
export const CSSProperty: FC<CSSPropertyProps> = ({
  property,
  selector = ':root',
  value,
}) => {
  return createGlobalStyles`
    ${selector} {
      ${cssProperty(property, value)}
    }
  `()
}

CSSProperty.displayName = 'CSSProperty'
