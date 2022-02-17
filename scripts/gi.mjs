#!/usr/bin/env zx
/* eslint-disable no-undef */

//
// This script handles everything required to boilerplate a new component.
// - Create a new component in `/src/components/interface/{Name}.tsx`
// - Creates styles in `/src/styles/{Name}.tsx`
//   - Adds styles to Styler context
// - Creates a story at `/stories/components/{Name}.stories.tsx`
//

import 'zx/globals'

// | ------------------------- |
// | Setup Arugments & Globals |
// | ------------------------- |

const c = global.chalk
const fs = global.fs
const question = global.question
const p = global.path

/**
 * @param {string} str
 */
const upper = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const name = upper(global.argv._[1] || (await question('Name > ')))

const compDestDir = p.resolve(global.__dirname, '../src/components/interface')
const compDestFile = `${name}.tsx`

const compDest = p.resolve(compDestDir, compDestFile)

// | --------------- |
// | Write Component |
// | --------------- |

const ComponentTemplate = `import type { ComponentPropsWithRef as CP, FC } from 'react'

import { useStyler } from '../../context'
import { css } from '../../css'
// import type { Color } from '../../theme'

export type ${name}Variants = {}

export interface ${name}Props extends CP<'div'>, Partial<${name}Variants> {}

export const ${name}: FC<${name}Props> = (p) => {
  const styles = useStyler('${name}', { ...p })
  return <div className={css(styles)} {...p} />
}

${name}.displayName = '${name}'
`

await fs.writeFile(compDest, ComponentTemplate)

console.log(
  c.white(`Wrote ${c.blueBright(name)} at "${c.yellowBright(compDest)}"`)
)

// Add to `components/index.ts`

const compIndex = p.resolve(compDestDir, 'index.ts')

await fs.ensureFile(compIndex)

await fs.appendFile(compIndex, `export * from './${name}'\n`)

console.log(
  c.white(`Exported ${c.blueBright(name)} from "${c.magentaBright(compIndex)}"`)
)

// | ------------ |
// | Write Styles |
// | ------------ |

const stylesDestDir = p.resolve(global.__dirname, '../src/styles')
const stylesDestFile = `${name}.ts`

const stylesDest = p.resolve(stylesDestDir, stylesDestFile)

// --

const StylesTemplate = `import type { ${name}Props, ${name}Variants } from '../components/interface'
import type { StylerStyles } from '../context'
import { cssvar } from '../util'

export const ${name}Styles: StylerStyles<${name}Props, ${name}Variants> = {
  bps: {},
  colors: {},
  base: {},
  variants: {},
}
`

await fs.writeFile(stylesDest, StylesTemplate)

console.log(
  c.white(`Wrote ${c.blueBright(name)} at "${c.yellowBright(stylesDest)}"`)
)

// | -------------------------- |
// | Add styles to AtomicStyles |
// | -------------------------- |

const ctxDir = p.resolve(global.__dirname, '../src/styles')
const stylerCtx = p.resolve(ctxDir, 'index.ts')

const stylerImports = await fs.readFile(stylerCtx)

const stylesImport = `import { ${name}Styles } from './${name}'
// import anchor`
const stylesExport = `${name}: ${name}Styles,
  // export anchor`

await fs.writeFile(
  stylerCtx,
  stylerImports
    .toString()
    .replace('// import anchor', stylesImport)
    .replace('// export anchor', stylesExport)
)

console.log(c.white(`Added ${c.blueBright(name)} default styler`))

// | ----------- |
// | Write Story |
// | ----------- |

const storyDestDir = p.resolve(global.__dirname, '../stories/components')
const storyDestFile = `${name}.stories.tsx`

const storyDest = p.resolve(storyDestDir, storyDestFile)

const StoryTemplate = `import type { Meta, Story } from '@storybook/react'

// import { color } from '../index'

import { ${name} } from '../../dist'
import type { ${name}Props } from '../../dist'

export default {
  title: 'Components/${name}',
  component: ${name},
} as Meta

const Template: Story<${name}Props> = (args) => <${name} {...args} />
Template.args = ${name}.defaultProps

export const Default: Story<${name}Props> = Template.bind({})
Default.args = {
  ...Template.args,
}
`

await fs.writeFile(storyDest, StoryTemplate)

console.log(
  c.white(`Wrote ${c.blueBright(name)} at "${c.yellowBright(storyDest)}"`)
)
