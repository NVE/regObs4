import { readdirSync, existsSync, readFileSync, writeFileSync } from "fs";
const path = require('path');

const TARGET_DIR = 'www';

function stripSourceMaps() {
  console.log('===========================');
  console.log('stripping sourceMappingURL ');
  console.log('===========================');

  readdirSync(TARGET_DIR).forEach(file => {
    const mapFile = path.join(TARGET_DIR, file + '.map');
    const targetFile = path.join(TARGET_DIR, file);
    if (path.extname(file) === '.js' && existsSync(mapFile)) {
      const bufFile = readFileSync(targetFile, "utf8");
      const result = bufFile.replace('//# sourceMappingURL=' + file + '.map', '');
      writeFileSync(targetFile, result);
    }
  });
}

stripSourceMaps();