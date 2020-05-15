let fs = require('fs');
let path = require('path');

const TARGET_DIR = 'www';

function getFiles() {
  return fs.readdirSync(TARGET_DIR);
}

function addBase64SourceMaps() {
  console.log('===========================');
  console.log('attaching bas64 source maps');
  console.log('===========================');

  getFiles().forEach(file => {
    const mapFile = path.join(TARGET_DIR, file + '.map');
    const targetFile = path.join(TARGET_DIR, file);
    if (path.extname(file) === '.js' && fs.existsSync(mapFile)) {
      const bufMap = fs.readFileSync(mapFile).toString('base64');
      const bufFile = fs.readFileSync(targetFile, "utf8");
      const result = bufFile.replace('sourceMappingURL=' + file + '.map', 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + bufMap);
      fs.writeFileSync(targetFile, result);
    }
  });
}

function deleteSourceMaps() {
  console.log('===========================');
  console.log('deleteing source map files ');
  console.log('===========================');

  fs.readdirSync(TARGET_DIR).filter(f => path.extname(f) === '.map').forEach((file) => {
    const targetFile = path.join(TARGET_DIR, file);
    fs.unlinkSync(targetFile);
  });
}

module.exports = function (ctx) {
  if (ctx.argv.includes('--release')) {
    deleteSourceMaps();
  } else {
    addBase64SourceMaps();
  }
};