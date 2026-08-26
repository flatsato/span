const stylelint = require('stylelint');
const Cfg = require('./gulp.config.js');
const options = {
  files: Cfg.scss.srcFormat,
  fix: true,
  formatter: 'string',
};
const outputResult = (resultObject) => {
  if (resultObject.errored) {
    console.error(resultObject.output);
  }
};

(async function main() {
  await stylelint
    .lint({
      ...options,
      config: {
        extends: 'stylelint-config-recess-order',
      },
    })
    .then(outputResult);
  await stylelint
    .lint(options)
    .then(outputResult);
})();
