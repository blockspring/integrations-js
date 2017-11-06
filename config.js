const NODE_ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `.env.${NODE_ENV}`,
});

module.exports = {
  /** The environment to use when building the project */
  env: NODE_ENV,
  /** The full path to the project's root directory */
  basePath: __dirname,
  /** The name of the directory containing the application source code */
  srcDir: 'src',
  /** The entry points */
  entryPoints: {
    main: [
      './src/index.jsx',
    ],
  },
  /** Extract css in production - may want to disable for embedded apps */
  extractText: false,
  /** The name of the directory in which to emit compiled assets */
  outDir: 'dist',
  /** The base path for all projects assets (relative to the website root) */
  publicPath: '/dev/',
  /** host and port for dev server */
  devHost: process.env.HOST || 'localhost',
  devPort: process.env.PORT || 7000,
};
