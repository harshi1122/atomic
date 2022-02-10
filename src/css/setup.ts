import { setup as gSetup } from 'goober'
import { shouldForwardProp } from 'goober/should-forward-prop'
import { prefix } from 'goober/prefixer'
import { createElement } from 'react'

const RemovedProps = [
  'align',
  'as',
  'blur',
  'center',
  'color',
  'family',
  'fill',
  'fillX',
  'fillY',
  'grain',
  'grow',
  'height',
  'hue',
  'image',
  'justify',
  'letterSpacing',
  'lineHeight',
  'm',
  'opaque',
  'order',
  'outline',
  'p',
  'radius',
  'ratio',
  'reverse',
  'rounded',
  'row',
  'saturate',
  'sepia',
  'shadow',
  'shrink',
  'size',
  'transform',
  'variant',
  'weight',
  'width',
  'wrap',
]

/**
 * Override Atomic's default configuration of [goober](https://goober.js.org/).
 */
interface SetupConfig {
  // This option has been removed due to the inherit dependency this library has on React.
  /**
   * The function which will be used to create [styled](https://goober.js.org/api/styled) elements.
   *
   * @default React.createElement
   */
  // pragma?: typeof createElement
  /**
   * A function which will transform CSS being being applied to the browser.
   *
   * [goober's autoprefixer](https://goober.js.org/features/autoprefixer) is configured by default.
   *
   * @default prefix
   */
  prefixer?: (key: string, value: unknown) => string
  /**
   * A list of props which will NOT be passed to the DOM.
   *
   * @default []
   */
  removedProps?: string[]
  /**
   * A function which returns an object containing contactually important values.
   *
   * *Note:* Atomic does NOT make use of this value. It has been provided
   * if you should require it.
   *
   * See the corresponding section of [Goober's documentation](https://goober.js.org/api/setup#with-theme) for more.
   *
   * @default undefined
   */
  useTheme?: () => Record<string, unknown>
}

/**
 * Invoke's goober's [`setup`](https://goober.js.org/api/setup) function - requiring zero-configuration.
 *
 * **Note:** Invoking this function is **not** required when using the `AtomicProvider` component.
 *
 * **Note:** If your application makes use of Atomic's CSS-in-JS, these settings will effect it as well.
 */
export const setup = (
  conf: SetupConfig = {
    // pragma: createElement,
    prefixer: prefix,
    removedProps: [],
    useTheme: undefined,
  }
) => {
  const removedProps = [...RemovedProps, ...conf.removedProps]

  return gSetup(
    createElement,
    conf.prefixer,
    conf.useTheme,
    shouldForwardProp((prop) => !removedProps.includes(prop))
  )
}
