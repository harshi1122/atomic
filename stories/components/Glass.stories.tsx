import type { Meta, Story } from '@storybook/react'

import {
  blur,
  hue,
  opaque,
  outline,
  radius,
  saturate,
  sepia,
  shadow,
} from '../index'

import { Glass } from '../../dist'
import type { GlassProps as GP } from '../../dist'

type GlassProps = GP & { bg: string }

export default {
  title: 'Components/Glass',
  component: Glass,
  argTypes: {
    blur,
    grain: {
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    hue,
    outline,
    radius,
    opaque,
    saturate,
    sepia,
    shadow,
  },
} as Meta

const Template: Story<GlassProps> = ({ bg, ...args }) => (
  <>
    <style
      dangerouslySetInnerHTML={{
        __html: `
        #root {
          height: 100%;
        }

        .sb-show-main {
          background: ${bg};
          background-size: fit;
        }

        .sb-show-main.sb-main-padded {
          padding: 8rem;
        }
      `,
      }}
    />
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Glass {...args}>
        <div style={{ padding: '2rem' }}>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '0.325rem',
            }}
          >
            Lemons-in-the-Morning
          </h1>
          <p style={{ fontSize: '0.85rem' }}>
            Your favorite monthly newsletter — dedicated to all things
            rust-buckets and lemonade.
          </p>
        </div>
      </Glass>
    </div>
  </>
)
Template.args = Glass.defaultProps

export const Floral: Story<GlassProps> = Template.bind({})
Floral.storyName = "Grandma's Table Cloth"
Floral.args = {
  bg: "url('https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/4-vector-floral-seamless-pattern-with-anna-paff.jpg')",
  ...Template.args,
  sepia: 30,
}

export const Colorful: Story<GlassProps> = Template.bind({})
Colorful.storyName = 'Bowling Alley Carpet'
Colorful.args = {
  bg: "url('https://images.fineartamerica.com/images-medium-large-5/vector-colorful-seamless-pattern-with-tatiana-kost.jpg')",
  ...Template.args,
}

export const Abstract: Story<GlassProps> = Template.bind({})
Abstract.storyName = "80's Pants"
Abstract.args = {
  bg: "url('https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/abstract-geometric-seamless-pattern-with-animal-print-trendy-hand-drawn-textures-zhu-ming.jpg')",
  ...Template.args,
}

export const Solid: Story<GlassProps> = Template.bind({})
Solid.storyName = 'Solid (Black)'
Solid.args = {
  bg: 'black',
  ...Template.args,
}
