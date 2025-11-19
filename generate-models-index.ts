//Genererer models/models.ts med eksport av alle genererte modeller
import * as fs from 'fs';
import * as path from 'path';

console.log('Starter generering av models/models.ts med eksport av alle modeller...');

const modelsDir = path.join(__dirname, 'src', 'app', 'modules', 'common-regobs-api', 'models');
const outFile = path.join(modelsDir, 'models.ts');

const files = fs
  .readdirSync(modelsDir)
  .filter((f) => f.endsWith('.ts') && f !== 'index.ts' && f !== 'models.ts')
  .map((f) => f.replace(/\.ts$/, ''));

const content = files.map((f) => `export * from './${f}';`).join('\n') + '\n';

fs.writeFileSync(outFile, content);
console.log(outFile + ' oppdatert med', files.length, 'modeller.');
