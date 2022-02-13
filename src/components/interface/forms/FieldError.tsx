import type { FC } from 'react'
import { FieldError as RWFieldError } from '@redwoodjs/forms'
import type { FieldErrorProps as RWFieldErrorProps } from '@redwoodjs/forms'

import { useStyler } from '../../../context'
import { css } from '../../../css'

import { Text } from '../Text'
import type { TextProps } from '../Text'

export type FieldErrorVariants = {}

export interface FieldErrorProps
  extends Omit<TextProps, 'as'>,
    RWFieldErrorProps,
    Partial<FieldErrorVariants> {}

/**
 * An opinionated wrapper around RedwoodJS' [`FieldError`](https://redwoodjs.com/docs/forms.html#fielderror) and the `Text` components.
 *
 * The `color.fieldError.text` custom CSS property is added and this component styled with it.
 * The property is set to a `color.danger` shade which best contrasts the current color mode.
 */
export const FieldError: FC<FieldErrorProps> = ({ ...p }: FieldErrorProps) => {
  const styles = useStyler('FieldError')
  return <Text className={css(styles)} {...p} />
}

FieldError.displayName = 'FieldError'
FieldError.defaultProps = {
  ...Text.defaultProps,
  as: RWFieldError,
  color: 'fieldError.text',
}
