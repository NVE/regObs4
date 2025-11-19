import { Project, PropertySignature } from 'ts-morph';
import { join } from 'path';
import { readdirSync } from 'fs';

console.log(`Starter sortering av felter i modell-typer i alfabetisk rekkefølge...`);

const modelDir = join(__dirname, '/src/app/modules/common-regobs-api/models');
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
    const props = intf.getProperties().map((p: PropertySignature) => {
      console.log(`Leser interface ${intf.getName()} i fil ${file}, property ${p.getName()}`);
      return {
        name: p.getName(),
        type: p.getTypeNode()?.getText() ?? 'unknown',
        hasQuestionToken: p.hasQuestionToken(),
      };
    });

    // Sorter props alfabetisk etter normalisert navn
    const sorted = [...props].sort((a, b) => normalizeName(a.name).localeCompare(normalizeName(b.name), 'nb'));

    // Fjern ALLE eksisterende properties (og deres JSDoc)
    intf.getProperties().forEach((p) => p.remove());

    // Legg til sorterte properties med JSDoc
    sorted.forEach((p) => {
      console.log(
        `Legger til property ${p.name} i alfabetisk rekkefølge til interface ${intf.getName()} i fil ${file}}`
      );
      intf.addProperty(p);
    });
  });

  sourceFile.saveSync();
});

console.log('Felter i alle modell-typer er sortert alfabetisk. TODO: JSDOC er utelatt pga. tekniske utfordringer');
