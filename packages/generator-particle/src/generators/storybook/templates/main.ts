export interface MainConfig {
  designSystemPath: string // this will have to be resolved based off storybook location in apps/storybook and the path of the component_library
  addons: string[]
  storiesRoot: string[]
}

/**
 * app/storybook/main.js
 */
export const main = (
  config: MainConfig
) => `const path = require('path')frontendFramework

const APP_COMPONENT_LIBRARY = path.resolve(__dirname, '../../src/default')
const particle = require('../../particle')

const dev = {}
const prod = {}

const cssMode = process.env.NODE_ENV === 'production' ? 'extract' : 'hot'

module.exports = {
  addons: ${config.addons},
  stories: ${config.storiesRoot},
  webpackFinal: (config) => {
    /**
     * Delete the CSS management rules from Storybook.
     * Also delete the file-loader ruleset from Storybook in favor of Particle
     * Particle.js owns that process.
     */
    // eslint-disable-next-line no-param-reassign
    config.module.rules.splice(2, 2)
    /**
     * Delete the ProgressPlugin from Storybook for CI to remove
     * log file spam.
     */
    if (process.env.CI === 'true') {
      // eslint-disable-next-line no-param-reassign
      config.plugins.splice(4, 1)
    }
    return particle(
      { shared: config, dev, prod },
      { APP_COMPONENT_LIBRARY },
      { cssMode }
    )
  },
}
`
