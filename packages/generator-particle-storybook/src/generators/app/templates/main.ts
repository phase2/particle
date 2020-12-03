import { stringifyAndSingleQuote } from '../../../utils/helpers'

export interface MainConfig {
  addons: string[]
  storiesRoot: string[]
}

/**
 * app/storybook/main.js
 * @TODO require('../../particle) is a placeholder until we have proper base config
 */
export const main = (config: MainConfig) => `
module.exports = {
  addons: ${stringifyAndSingleQuote(config.addons)},
  stories: ${stringifyAndSingleQuote(config.storiesRoot)},
   webpackFinal: async config => {
    config.module.rules.push({
      test: /\\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
}
`
