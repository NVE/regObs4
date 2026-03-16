import { CompressionTestEditModel, KdvElement } from 'src/app/modules/common-regobs-api';

export function formatCompressionTest(
  test: CompressionTestEditModel,
  propagationKdv: KdvElement[],
  fractureKdv: KdvElement[],
  opts: { includeDepth?: boolean; includeFracture?: boolean } = { includeDepth: true, includeFracture: true }
) {
  const parts = [];
  if (test.PropagationTID) {
    parts.push(propagationKdv.find((x) => x.Id === test.PropagationTID)?.Name);
  }
  if (test.TapsFracture) {
    parts.push(test.TapsFracture);
  }
  if (opts.includeFracture) {
    if (test.ComprTestFractureTID) {
      const name = fractureKdv.find((x) => x.Id === test.ComprTestFractureTID)?.Name;
      parts.push(`(${name})`);
    }
  }
  if (opts.includeDepth && test.FractureDepth && test.FractureDepth > 0) {
    const depth = (test.FractureDepth * 100).toFixed(0);
    parts.push(`@${depth}cm`);
  }
  return parts.join('');
}
