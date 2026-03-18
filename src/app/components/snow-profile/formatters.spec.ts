import { createSnowProfileLayerFormatter, formatGrainFormSymbol, formatGrainSizeMm } from './formatters';
import { GrainForm } from './grainforms';
import { Hardness } from './models';
import { TranslateService } from '@ngx-translate/core';

// ── formatGrainFormSymbol ────────────────────────────────

describe('formatGrainFormSymbol', () => {
  it('returns symbol key for primary grain form only', () => {
    const result = formatGrainFormSymbol(GrainForm.PP);
    expect(result).toBe('a'); // PP -> 'a'
  });

  it('returns primary + (secondary) when secondary differs', () => {
    const result = formatGrainFormSymbol(GrainForm.FC, GrainForm.DH);
    // FC='e', DH='f'
    expect(result).toBe('e(f)');
  });

  it('ignores secondary when same as primary', () => {
    const result = formatGrainFormSymbol(GrainForm.RG, GrainForm.RG);
    expect(result).toBe('d'); // just RG
  });

  it('handles MFcr as primary: appends MF symbol', () => {
    // MFcr primary, no secondary => MFcr + MF
    const result = formatGrainFormSymbol(GrainForm.MFcr);
    // MFcr='O', MF='h'
    expect(result).toBe('Oh');
  });

  it('handles MFcr as primary with different secondary: appends secondary directly', () => {
    const result = formatGrainFormSymbol(GrainForm.MFcr, GrainForm.FC);
    // MFcr='O', FC='e'
    expect(result).toBe('Oe');
  });

  it('handles MFcr as secondary: wraps secondary+MF in parens', () => {
    const result = formatGrainFormSymbol(GrainForm.FC, GrainForm.MFcr);
    // FC='e', MFcr='O', MF='h'
    expect(result).toBe('e(Oh)');
  });

  it('handles null secondary', () => {
    const result = formatGrainFormSymbol(GrainForm.DH, null);
    expect(result).toBe('f'); // just DH
  });
});

// ── formatGrainSizeMm ───────────────────────────────────

describe('formatGrainSizeMm', () => {
  it('converts meters to mm with 1 decimal', () => {
    expect(formatGrainSizeMm(0.015)).toBe('1.5');
  });

  it('formats whole numbers without trailing zeros', () => {
    expect(formatGrainSizeMm(0.01)).toBe('1');
  });

  it('formats range when avgMax is provided', () => {
    expect(formatGrainSizeMm(0.01, 0.03)).toBe('1-3');
  });

  it('formats range with decimals', () => {
    expect(formatGrainSizeMm(0.005, 0.015)).toBe('0.5-1.5');
  });

  it('ignores null avgMax', () => {
    expect(formatGrainSizeMm(0.02, null)).toBe('2');
  });

  it('handles very small grain sizes', () => {
    expect(formatGrainSizeMm(0.001)).toBe('0.1');
  });
});

// ── formatHardness (via createSnowProfileLayerFormatter) ─
describe('formatHardness via tooltip', () => {
  // Vi kan bare nå formatHardness gjennom tooltip, siden den er privat.
  const mockTranslate = {
    instant: (key: string, params?: Record<string, unknown>) => {
      if (params?.['value']) return `${key}:${params['value']}`;
      return key;
    },
  } as unknown as TranslateService;
  const emptyKdvs = { wetness: [], propagation: [], fracture: [] };

  it('treats HardnessTID=0 (" - ") as missing hardness', () => {
    const formatter = createSnowProfileLayerFormatter(mockTranslate, emptyKdvs);
    const tooltip = formatter.tooltip({ HardnessTID: Hardness[' - '], Thickness: 0.5 });
    expect(tooltip).toContain('SNOW_PROFILE.LABEL_HARDNESS_MISSING');
  });

  it('treats HardnessTID=undefined as missing hardness', () => {
    const formatter = createSnowProfileLayerFormatter(mockTranslate, emptyKdvs);
    const tooltip = formatter.tooltip({ HardnessTID: undefined, Thickness: 0.5 });
    expect(tooltip).toContain('SNOW_PROFILE.LABEL_HARDNESS_MISSING');
  });

  it('formats valid hardness (e.g. P)', () => {
    const formatter = createSnowProfileLayerFormatter(mockTranslate, emptyKdvs);
    const tooltip = formatter.tooltip({ HardnessTID: Hardness.P, Thickness: 0.5 });
    expect(tooltip).toContain('P');
  });

  it('includes bottom hardness in range format', () => {
    const formatter = createSnowProfileLayerFormatter(mockTranslate, emptyKdvs);
    const tooltip = formatter.tooltip({ HardnessTID: Hardness.F, HardnessBottomTID: Hardness.K, Thickness: 0.5 });
    expect(tooltip).toContain('F-K');
  });
});
