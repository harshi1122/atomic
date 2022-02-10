import type { FC } from 'react'
import { Form as RWForm } from '@redwoodjs/forms'
import type { FormProps as RWFormProps } from '@redwoodjs/forms'

import { useStyler } from '../../../context'
import { css } from '../../../css'
// import type { Color } from '../../../theme'

export type FormVariants = {}

export interface FormProps extends RWFormProps, Partial<FormVariants> {}

export const Form: FC<FormProps> = (p: FormProps) => {
  const styles = useStyler('Form')
  return <RWForm className={css(styles)} {...p} />
}

Form.displayName = 'Form'
