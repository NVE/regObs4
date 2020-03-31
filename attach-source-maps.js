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
    let mapFile = path.join(TARGET_DIR, file + '.map');
    let targetFile = path.join(TARGET_DIR, file);
    if (path.extname(file) === '.js' && fs.existsSync(mapFile)) {
      let bufMap = fs.readFileSync(mapFile).toString('base64');
      let bufFile = fs.readFileSync(targetFile, "utf8");
      let result = bufFile.replace('sourceMappingURL=' + file + '.map', 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + bufMap);
      fs.writeFileSync(targetFile, result);
    }
  });
}

function deleteSourceMaps() {
  console.log('===========================');
  console.log('deleteing source map files ');
  console.log('===========================');

  fs.readdirSync(TARGET_DIR).filter(f => f.extname(f) === '.map').forEach(file => {
    fs.unlinkSync(file);
  });
}

module.exports = function (ctx) {
  if (ctx.argv.includes('--release')) {
    deleteSourceMaps();
  } else {
    addBase64SourceMaps();
  }
};