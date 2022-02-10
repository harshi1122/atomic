import type { FC } from 'react'
import { Label } from '@redwoodjs/forms'
import type { LabelProps } from '@redwoodjs/forms'

import { Text } from '../Text'
import type { TextProps } from '../Text'

export interface FieldHintProps extends Omit<TextProps, 'as'>, LabelProps {}

export const FieldHint: FC<FieldHintProps> = (p: FieldHintProps) => {
  return <Text {...p} />
}

FieldHint.displayName = 'FieldHint'
FieldHint.defaultProps = {
  ...Text.defaultProps,
  as: Label,
  color: 'hint',
  errorStyle: { display: 'none' },
  size: 'sm',
}
