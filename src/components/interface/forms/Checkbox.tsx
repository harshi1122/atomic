import type { FC } from 'react'
import { CheckboxField } from '@redwoodjs/forms'
import type { CheckboxFieldProps } from '@redwoodjs/forms'

import { useStyler } from '../../../context'
import { css } from '../../../css'
// import type { Color } from '../../../theme'

export type CheckboxVariants = {}

export interface CheckboxProps
  extends CheckboxFieldProps,
    Partial<CheckboxVariants> {}

/**
 * A wrapper around RedwoodJS' [`CheckboxField`](https://redwoodjs.com/docs/forms.html#input-fields) component.
 * Used to gather yes/no feedback from the user, with integration with Redwood's forms.
 */
export const Checkbox: FC<CheckboxProps> = (p: CheckboxProps) => {
  const styles = useStyler('Checkbox')
  return <CheckboxField className={css(styles)} {...p} />
}

Checkbox.displayName = 'Checkbox'
