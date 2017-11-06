const path = require('path');
const fs = require('fs');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './src/boot-template.js',
  },
  output: {
    pathinfo: true,
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].[chunkhash].js',
  },
  stats: {
    errorDetails: true,
  },
  plugins: [
    {
      apply(compiler) {
        compiler.plugin('emit', (compilation, callback) => {
          const filenames = Object.keys(compilation.assets);
          const i = filenames.findIndex(a => /main\.[a-f0-9]+\.js/i.test(a));
          if (i !== -1) {
            const templateStr = fs.readFileSync(path.join(compiler.context, 'src/boot-template.js'), 'utf-8');
            const jsFile = templateStr.replace('{{FILENAME}}', filenames[i]);
            compilation.assets['boot.js'] = { // eslint-disable-line
              source() {
                return jsFile;
              },
              size() {
                return jsFile.length;
              },
            };
            callback();
          } else {
            callback();
          }
        });

        compiler.plugin('done', () => {
          console.log('done');
        });
      },
    },
  ],
  resolve: {
    extensions: ['.js'],
  },
};
