import type { FC } from 'react'
import { Form as RWForm } from '@redwoodjs/forms'
import type { FormProps as RWFormProps } from '@redwoodjs/forms'

export type FormVariants = {}

export interface FormProps extends RWFormProps, Partial<FormVariants> {}

/**
 * Wraps RedwoodJS' [`Form`](https://redwoodjs.com/docs/forms.html#form) component.
 *
 * Provides **no** additional benefit besides making all form components accessible from `@locktech/atomic`.
 */
export const Form: FC<FormProps> = (p: FormProps) => {
  return <RWForm {...p} />
}

Form.displayName = 'Form'
