import type { ComponentPropsWithRef as CP, FC } from 'react'

import { useStyler } from '../../context'
import { css } from '../../css'
// import type { Color } from '../../theme'

import { Paper } from './Paper'
import type { PaperProps } from './Paper'

export type CardVariants = {}

export interface CardProps
  extends CP<'div'>,
    Partial<CardVariants>,
    Pick<PaperProps, 'outline' | 'radius' | 'ratio' | 'shadow'> {}

export const Card: FC<CardProps> = ({
  outline,
  radius,
  ratio,
  shadow,
  ...p
}: CardProps) => {
  const styles = useStyler('Card', { outline, radius, ratio, shadow })
  return <div className={css(styles)} {...p} />
}

const PaperDefaults = Paper.defaultProps

Card.displayName = 'Card'
Card.defaultProps = {
  outline: PaperDefaults.outline,
  radius: PaperDefaults.radius,
  ratio: PaperDefaults.ratio,
  shadow: PaperDefaults.shadow,
}
