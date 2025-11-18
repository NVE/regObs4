import { Project } from 'ts-morph';
import { join } from 'path';
import { readdirSync } from 'fs';

const modelDir = join(__dirname, '/src/app/modules/common-regobs-api/model');
const files = readdirSync(modelDir).filter((f) => f.endsWith('.ts'));

const project = new Project();

function normalizeName(name: string): string {
  return name.replace(/^['"]|['"]$/g, '');
}

files.forEach((file) => {
  const filePath = join(modelDir, file);
  const sourceFile = project.addSourceFileAtPath(filePath);

  sourceFile.getInterfaces().forEach((intf) => {
    // Hent ut alle props og deres JSDoc før du fjerner dem
    const props = intf.getProperties().map((p) => {
      // Slå sammen alle JSDoc-kommentarer til én, hvis de finnes
      const jsDocText = p
        .getJsDocs()
        .map((d) => d.getText().trim())
        .filter(Boolean)
        .join('\n');
      return {
        name: p.getName(),
        type: p.getTypeNode()?.getText() ?? 'unknown',
        hasQuestionToken: p.hasQuestionToken(),
        docs: jsDocText ? [jsDocText] : [],
      };
    });

    // Sorter props alfabetisk etter normalisert navn
    const sorted = [...props].sort((a, b) => normalizeName(a.name).localeCompare(normalizeName(b.name), 'nb'));

    // Fjern ALLE eksisterende properties (og deres JSDoc)
    intf.getProperties().forEach((p) => p.remove());

    // Legg til sorterte properties med JSDoc
    sorted.forEach((p) => {
      intf.addProperty(p);
    });
  });

  sourceFile.saveSync();
});

console.log('All model interfaces sorted alphabetically with JSDoc preserved.');
