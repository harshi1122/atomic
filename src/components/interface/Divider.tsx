import type { ComponentPropsWithRef as CP, FC } from 'react'

import { useStyler } from '../../context'
import { css } from '../../css'
// import type { Color } from '../../theme'

export type DividerVariants = {
  /**
   * @default 'horizontal'
   */
  variant: 'horizontal' | 'vertical'
}

export interface DividerProps extends CP<'hr'>, Partial<DividerVariants> {}

export const Divider: FC<DividerProps> = ({ ...p }: DividerProps) => {
  const styles = useStyler('Divider', { ...p })
  return <hr className={css(styles)} {...p} />
}

Divider.defaultProps = {
  variant: 'horizontal',
}
