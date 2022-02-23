import type { FC } from 'react'

import { Button } from '../Button'
import type { ButtonProps } from '../Button'

export interface SubmitProps extends ButtonProps {}

/**
 * Atomic's `<Button>` component with its `type` set to `'submit'`.
 */
export const Submit: FC<SubmitProps> = (p) => {
  return <Button {...p} />
}

Submit.displayName = 'Submit'
Submit.defaultProps = {
  ...Button.defaultProps,
  type: 'submit',
}
