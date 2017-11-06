const path = require('path');
const fs = require('fs');

function BootJsPlugin(options = {}) {
  this.templateFile = options.templateFile;
  this.outputFileName = options.outputFileName || 'boot.js';
  this.entryPointRegEx = options.entryPointRegEx || /^main\.[a-f0-9]+\.js$/i;
}

BootJsPlugin.prototype.apply = function BootJsPluginApply(compiler) {
  compiler.plugin('emit', (compilation, callback) => {
    const filenames = Object.keys(compilation.assets);
    const i = filenames.findIndex(a => this.entryPointRegEx.test(a));

    if (i !== -1) {
      const templateFilePath = this.templateFile || path.join(compiler.context, 'src/boot-template.js');
      const templateStr = fs.readFileSync(templateFilePath, 'utf-8');
      const jsFile = templateStr
        .replace('{{FILENAME}}', filenames[i])
        .replace(/\/\*.+?\*\/(?=[\n\r])/g, '')
        .trim();

      compilation.assets[this.outputFileName] = { // eslint-disable-line
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
};

module.exports = BootJsPlugin;
