import type { FC } from 'react'
import { Label } from '@redwoodjs/forms'
import type { LabelProps } from '@redwoodjs/forms'

import { Text } from '../Text'
import type { TextProps } from '../Text'

export interface FieldLabelProps extends Omit<TextProps, 'as'>, LabelProps {}

/**
 * An wrapper around RedwoodJS' [`Label`](https://redwoodjs.com/docs/forms.html#label) and the `Text` components,
 * re-exposing their APIs.
 */
export const FieldLabel: FC<FieldLabelProps> = (p: FieldLabelProps) => {
  return <Text {...p} />
}

FieldLabel.displayName = 'FieldLabel'
FieldLabel.defaultProps = {
  ...Text.defaultProps,
  as: Label,
}
