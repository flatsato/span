const del = require('del');
const Cfg = require('./gulp.config.js');

(async () => {
  const deletedPaths = await del(Cfg.remove);

  console.log('Deleted:\n', deletedPaths.join('\n'));
})();
