module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/theming",
    "storybook-addon-themes",
  ],
  framework: "@storybook/react",
  webpackFinal: (config) => {
    const webpack = require('webpack')
    // Allow global dependency on React, like a RW application
    config.plugins.push(
      new webpack.ProvidePlugin({ React: 'react' })
    )
    // Allow frame-motion to import React as an ES-Module
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    })
    return config
  }
}
