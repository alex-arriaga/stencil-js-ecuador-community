import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'web-components-demo',
  taskQueue: 'async',
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/styles/global/main.scss'
      ]
    })
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
