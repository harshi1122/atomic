import type { ComponentPropsWithRef as CP, FC } from 'react'
import { TextAreaField } from '@redwoodjs/forms'

import type { InputVariants } from './Input'

import { useStyler } from '../../../context'
import { css } from '../../../css'

export interface TextAreaProps
  extends CP<typeof TextAreaField>,
    Partial<InputVariants> {}

/**
 * A component wrapping Redwood's [`TextAreaField`](https://redwoodjs.com/docs/forms#overview), applying Atomic's `Input` styling.
 */
export const TextArea: FC<TextAreaProps> = ({ variant, ...p }) => {
  const styles = useStyler('Input', { variant })
  return <TextAreaField className={css(styles)} {...p} />
}

TextArea.displayName = 'TextArea'
TextArea.defaultProps = {
  variant: 'fill',
}
