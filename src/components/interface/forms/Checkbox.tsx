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

export const Checkbox: FC<CheckboxProps> = (p: CheckboxProps) => {
  const styles = useStyler('Checkbox')
  return <CheckboxField className={css(styles)} {...p} />
}

Checkbox.displayName = 'Checkbox'
