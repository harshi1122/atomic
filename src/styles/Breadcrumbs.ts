import type {
  BreadcrumbsProps,
  BreadcrumbsVariants,
} from '../components/interface'
import type { StylerStyles } from '../context'
import { cssvar } from '../css'

export const BreadcrumbsStyles: StylerStyles<
  BreadcrumbsProps,
  BreadcrumbsVariants
> = {
  bps: {},
  colors: {},
  base: {
    display: 'flex',
    '& > :not([hidden]) ~ :not([hidden])': {
      marginLeft: cssvar('space.2'),
    },
  },
}
