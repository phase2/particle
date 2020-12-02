export const config = () => `
  import { Config } from '@stencil/core';

  const { name, distDirs } = require('./package.json');

  export const config: Config = {
    buildDist: true,
    namespace: name,
    taskQueue: 'async',
    outputTargets: [
      {
        type: 'www',
        serviceWorker: null, // disable service workers
      },
      {
        type: 'dist',
        dir: distDirs.stencil,
      },
      {
        type: 'dist-custom-elements-bundle',
        dir: distDirs.stencil,
      },
      {
        type: 'docs-readme',
        dir: distDirs.stencil,
      },
    ],
  }
`
