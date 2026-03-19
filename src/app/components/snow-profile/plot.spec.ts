/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  pointsToPath,
  pointsToPolyline,
  pointsToOpenPolyline,
  createDepthProjector,
  createHardnessWidthProjector,
  createTempProjector,
  createTempPoints,
  createLayerPolygons,
  computeExpandedHeights,
  computeExpandedYCoordinates,
  expandLayerPolygons,
  createHardnessAxis,
  createDepthAxis,
  createTempAxis,
  generateStepList,
  getLabelPositionY,
  createLayerLabels,
  createCompressionTestPlots,
  offsetCriticalLayerPointsTop,
  offsetCriticalLayerPointsBottom,
  createCriticalLayer,
  createCriticalLayers,
} from './plot';
import { CriticalLayer, Hardness, PlotFrame, PlotPoint, SimplePolygon } from './models';
import { StratProfileLayerEditModel } from 'src/app/modules/common-regobs-api';

// ── Helpers ──────────────────────────────────────────────

function frame(overrides: Partial<PlotFrame> = {}): PlotFrame {
  return { x0: 0, y0: 0, width: 600, height: 400, axisSize: 10, ...overrides };
}

function layer(overrides: Partial<StratProfileLayerEditModel> = {}): StratProfileLayerEditModel {
  return { Thickness: 0.5, HardnessTID: Hardness.P, ...overrides };
}

function simplePolygon(
  topLeft: PlotPoint,
  topRight: PlotPoint,
  bottomRight: PlotPoint,
  bottomLeft: PlotPoint,
  layerOverrides: Partial<StratProfileLayerEditModel> = {}
): SimplePolygon {
  return { topLeft, topRight, bottomLeft, bottomRight, layer: layer(layerOverrides) };
}

// ── pointsToPath ─────────────────────────────────────────

describe('pointsToPath', () => {
  it('returns empty string for no points', () => {
    expect(pointsToPath([])).toBe('');
  });

  it('returns M command for single point', () => {
    expect(pointsToPath([{ x: 10, y: 20 }])).toBe('M 10 20');
  });

  it('returns M + L commands for multiple points', () => {
    const result = pointsToPath([
      { x: 0, y: 0 },
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ]);
    expect(result).toBe('M 0 0 L 10 20 L 30 40');
  });
});

// ── pointsToPolyline ────────────────────────────────────

describe('pointsToPolyline', () => {
  it('closes the polygon by repeating the first point', () => {
    const pts: PlotPoint[] = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 10 },
    ];
    const result = pointsToPolyline(pts);
    expect(result).toBe('0,0 10,0 10,10 0,0');
  });
});

// ── pointsToOpenPolyline ─────────────────────────────────

describe('pointsToOpenPolyline', () => {
  it('does not close the polygon', () => {
    const pts: PlotPoint[] = [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ];
    expect(pointsToOpenPolyline(pts)).toBe('1,2 3,4');
  });
});

// ── createDepthProjector ─────────────────────────────────

describe('createDepthProjector', () => {
  const f = frame({ y0: 10, height: 200 });

  it('maps depth=0 to y0', () => {
    const proj = createDepthProjector(f, 2);
    expect(proj(0)).toBe(10);
  });

  it('maps depth=maxDepth to y0+height', () => {
    const proj = createDepthProjector(f, 2);
    expect(proj(2)).toBe(210);
  });

  it('maps intermediate depth proportionally', () => {
    const proj = createDepthProjector(f, 2);
    expect(proj(1)).toBe(110); // y0 + height/2 = 10 + 100
  });

  it('clamps values above maxDepth to y0+height', () => {
    const proj = createDepthProjector(f, 2);
    expect(proj(4)).toBe(210); // clamped to 1
  });

  it('throws for negative depth', () => {
    const proj = createDepthProjector(f, 2);
    expect(() => proj(-1)).toThrow();
  });

  it('throws for NaN depth', () => {
    const proj = createDepthProjector(f, 2);
    expect(() => proj(NaN)).toThrow();
  });
});

// ── createHardnessWidthProjector ─────────────────────────

describe('createHardnessWidthProjector', () => {
  const f = frame({ width: 600 });

  it('maps F to 1/6 of width', () => {
    const proj = createHardnessWidthProjector(f);
    expect(proj(Hardness.F)).toBe(100); // 600/6
  });

  it('maps 4F to 2/6 of width', () => {
    const proj = createHardnessWidthProjector(f);
    expect(proj(Hardness['4F'])).toBe(200);
  });

  it('maps 1F to 3/6 of width', () => {
    const proj = createHardnessWidthProjector(f);
    expect(proj(Hardness['1F'])).toBe(300);
  });

  it('maps P to 4/6 of width', () => {
    const proj = createHardnessWidthProjector(f);
    expect(proj(Hardness.P)).toBe(400);
  });

  it('maps K to 5/6 of width', () => {
    const proj = createHardnessWidthProjector(f);
    expect(proj(Hardness.K)).toBe(500);
  });

  it('maps I (ice) to full width', () => {
    const proj = createHardnessWidthProjector(f);
    expect(proj(Hardness.I)).toBe(600);
  });

  it('maps " - " (missing) to full width', () => {
    const proj = createHardnessWidthProjector(f);
    expect(proj(Hardness[' - '])).toBe(600);
  });

  it('maps F- to 3/24 of width', () => {
    const proj = createHardnessWidthProjector(f);
    expect(proj(Hardness['F-'])).toBe(75); // 600 * 3/24
  });

  it('interpolates between anchor values for intermediate hardness', () => {
    const proj = createHardnessWidthProjector(f);
    // F-4F is between F(2) and 4F(6), tid=4 => t=(4-2)/(6-2)=0.5
    // fraction = 1/6 + (2/6-1/6)*0.5 = 1/6 + 1/12 = 3/12 = 0.25
    expect(proj(Hardness['F-4F'])).toBe(150); // 600 * 0.25
  });

  it('is monotonically increasing from F to I', () => {
    const proj = createHardnessWidthProjector(f);
    const hardnesses = [Hardness.F, Hardness['4F'], Hardness['1F'], Hardness.P, Hardness.K, Hardness.I];
    for (let i = 1; i < hardnesses.length; i++) {
      expect(proj(hardnesses[i])).toBeGreaterThan(proj(hardnesses[i - 1]));
    }
  });
});

// ── createTempProjector ──────────────────────────────────

describe('createTempProjector', () => {
  const f = frame({ x0: 10, y0: 20, width: 300, height: 400 });

  it('maps temp=minTemp, depth=0 to top-left (x0, y0)', () => {
    const proj = createTempProjector(f, -10, 2);
    const pt = proj({ SnowTemp: -10, Depth: 0 });
    expect(pt.x).toBe(10); // x0 + 0 = 10
    expect(pt.y).toBe(20); // y0 + 0 = 20
  });

  it('maps temp=0, depth=maxDepth to bottom-right (x0+width, y0+height)', () => {
    const proj = createTempProjector(f, -10, 2);
    const pt = proj({ SnowTemp: 0, Depth: 2 });
    expect(pt.x).toBe(310); // x0 + width
    expect(pt.y).toBe(420); // y0 + height
  });

  it('maps intermediate values proportionally', () => {
    const proj = createTempProjector(f, -10, 2);
    const pt = proj({ SnowTemp: -5, Depth: 1 });
    expect(pt.x).toBe(160); // x0 + width*0.5 = 10 + 150
    expect(pt.y).toBe(220); // y0 + height*0.5 = 20 + 200
  });

  it('clamps positive temps to right edge', () => {
    const proj = createTempProjector(f, -10, 2);
    const pt = proj({ SnowTemp: 5, Depth: 0 });
    expect(pt.x).toBe(310); // clamped to 1 => x0 + width
  });

  it('throws if SnowTemp is null', () => {
    const proj = createTempProjector(f, -10, 2);
    expect(() => proj({ Depth: 0 })).toThrow();
  });

  it('throws if Depth is null', () => {
    const proj = createTempProjector(f, -10, 2);
    expect(() => proj({ SnowTemp: -5 })).toThrow();
  });
});

// ── createTempPoints ─────────────────────────────────────

describe('createTempPoints', () => {
  it('creates TempPoints with temp value attached', () => {
    const proj = createTempProjector(frame({ x0: 0, y0: 0, width: 100, height: 100 }), -10, 1);
    const result = createTempPoints(
      [
        { SnowTemp: -5, Depth: 0.5 },
        { SnowTemp: 0, Depth: 1 },
      ],
      proj
    );
    expect(result.length).toBe(2);
    expect(result[0].temp).toBe(-5);
    expect(result[1].temp).toBe(0);
    // Each result should have x, y, and temp
    result.forEach((pt) => {
      expect(pt.x).toBeDefined();
      expect(pt.y).toBeDefined();
      expect(pt.temp).toBeDefined();
    });
  });
});

// ── generateStepList ─────────────────────────────────────

describe('generateStepList', () => {
  it('generates ascending steps for positive range', () => {
    const result = generateStepList(0, 1, 0.5);
    expect(result).toEqual([0, 0.5, 1]);
  });

  it('generates descending steps for negative range (min < 0)', () => {
    const result = generateStepList(-10, 0, 2);
    expect(result).toEqual([0, -2, -4, -6, -8, -10]);
  });

  it('includes both endpoints', () => {
    const result = generateStepList(0, 2, 1);
    expect(result[0]).toBe(0);
    expect(result[result.length - 1]).toBe(2);
  });

  it('handles step that does not divide range evenly', () => {
    const result = generateStepList(0, 1, 0.3);
    // 0, 0.3, 0.6, 0.9, 1
    expect(result.length).toBe(5);
    expect(result[0]).toBe(0);
    expect(result[result.length - 1]).toBe(1);
  });

  it('throws for step <= 0', () => {
    expect(() => generateStepList(0, 10, 0)).toThrow();
    expect(() => generateStepList(0, 10, -1)).toThrow();
  });

  it('throws for max < min', () => {
    expect(() => generateStepList(10, 5, 1)).toThrow();
  });

  it('returns [min, max] when step >= range', () => {
    const result = generateStepList(0, 1, 5);
    expect(result).toEqual([0, 1]);
  });

  it('generates negative range -10 to 0 with step 5', () => {
    const result = generateStepList(-10, 0, 5);
    expect(result).toEqual([0, -5, -10]);
  });
});

// ── createLayerPolygons ──────────────────────────────────

describe('createLayerPolygons', () => {
  const f = frame({ x0: 10, y0: 20, width: 300, height: 400 });

  it('returns empty array for empty layers', () => {
    expect(
      createLayerPolygons(
        f,
        [],
        () => 0,
        () => 0
      )
    ).toEqual([]);
  });

  it('creates polygon with correct right edge', () => {
    const hardnessProj = createHardnessWidthProjector(f);
    const depthProj = createDepthProjector(f, 1);
    const layers = [layer({ HardnessTID: Hardness.P, Thickness: 1 })];

    const result = createLayerPolygons(f, layers, hardnessProj, depthProj);
    expect(result.length).toBe(1);
    // Right edge should be x0 + width = 310
    expect(result[0].topRight.x).toBe(310);
    expect(result[0].bottomRight.x).toBe(310);
  });

  it('stacks layers vertically from depth 0', () => {
    const depthProj = createDepthProjector(f, 1);
    const hardnessProj = createHardnessWidthProjector(f);
    const layers = [
      layer({ HardnessTID: Hardness.P, Thickness: 0.5 }),
      layer({ HardnessTID: Hardness.K, Thickness: 0.5 }),
    ];

    const result = createLayerPolygons(f, layers, hardnessProj, depthProj);
    expect(result.length).toBe(2);
    // First layer: top at depth=0, bottom at depth=0.5
    expect(result[0].topRight.y).toBe(20); // y0
    expect(result[0].bottomRight.y).toBe(result[1].topRight.y); // second layer starts where first ends
    // Second layer: bottom at depth=1
    expect(result[1].bottomRight.y).toBe(420); // y0 + height
  });

  it('handles layer with missing hardness (defaults to " - ")', () => {
    const hardnessProj = createHardnessWidthProjector(f);
    const depthProj = createDepthProjector(f, 1);
    const layers = [layer({ HardnessTID: undefined, Thickness: 1 })];

    const result = createLayerPolygons(f, layers, hardnessProj, depthProj);
    // Missing hardness => fraction=1 => full width => leftX = x0 + width - width = x0
    expect(result[0].topLeft.x).toBe(f.x0);
  });

  it('handles layer with HardnessBottomTID different from top', () => {
    const hardnessProj = createHardnessWidthProjector(f);
    const depthProj = createDepthProjector(f, 1);
    const layers = [layer({ HardnessTID: Hardness.F, HardnessBottomTID: Hardness.K, Thickness: 1 })];

    const result = createLayerPolygons(f, layers, hardnessProj, depthProj);
    // Top should be narrower (F) than bottom (K)
    expect(result[0].topLeft.x).toBeGreaterThan(result[0].bottomLeft.x);
  });

  it('uses 0.001 as minimum thickness for layers with Thickness=0', () => {
    const depthProj = createDepthProjector(f, 1);
    const hardnessProj = createHardnessWidthProjector(f);
    const layers = [layer({ Thickness: 0 })];

    const result = createLayerPolygons(f, layers, hardnessProj, depthProj);
    expect(result[0].bottomRight.y).toBeGreaterThan(result[0].topRight.y);
  });
});

// ── computeExpandedHeights ──────────────────────────────

describe('computeExpandedHeights', () => {
  it('returns original heights if all >= minHeight', () => {
    const result = computeExpandedHeights([30, 40, 50], 20);
    expect(result).toEqual([30, 40, 50]);
  });

  it('expands small layers to minHeight', () => {
    const result = computeExpandedHeights([5, 100, 5], 20);
    // Layer 0 and 2 are too small (5), expanded to 20
    // Deficit of 15 each should be absorbed from layer 1 (capacity 80)
    expect(result[0]).toBe(20);
    expect(result[2]).toBe(20);
    // Total should remain the same: 5+100+5 = 110
    const originalSum = 5 + 100 + 5;
    const expandedSum = result.reduce((s, h) => s + h, 0);
    expect(expandedSum).toBeCloseTo(originalSum, 1);
  });

  it('absorbs deficit from neighbours', () => {
    const result = computeExpandedHeights([5, 60, 5], 20);
    // Deficit: layer 0 needs +15, layer 2 needs +15, total +30
    // Layer 1 can give 60-20=40 => enough
    expect(result[0]).toBe(20);
    expect(result[2]).toBe(20);
    expect(result[1]).toBe(60 - 30); // gave away 30
  });

  it('keeps total sum when neighbours can absorb all deficit', () => {
    const original = [5, 50, 5, 50, 5];
    const result = computeExpandedHeights(original, 20);
    const originalSum = original.reduce((s, h) => s + h, 0);
    const expandedSum = result.reduce((s, h) => s + h, 0);
    expect(expandedSum).toBeCloseTo(originalSum, 1);
  });

  it('all layers at least minHeight', () => {
    const original = [2, 3, 100, 1, 4];
    const result = computeExpandedHeights(original, 20);
    result.forEach((h) => expect(h).toBeGreaterThanOrEqual(20));
  });

  it('handles single layer', () => {
    expect(computeExpandedHeights([5], 20)).toEqual([20]);
  });

  it('handles all layers below minHeight', () => {
    const result = computeExpandedHeights([5, 5, 5], 20);
    result.forEach((h) => expect(h).toBe(20));
  });

  it('does not modify input array', () => {
    const original = [5, 100, 5];
    const copy = [...original];
    computeExpandedHeights(original, 20);
    expect(original).toEqual(copy);
  });
});

// ── computeExpandedYCoordinates ──────────────────────────

describe('computeExpandedYCoordinates', () => {
  it('computes stacking from anchor', () => {
    const { tops, bottoms } = computeExpandedYCoordinates(10, [20, 30, 50]);
    expect(tops).toEqual([10, 30, 60]);
    expect(bottoms).toEqual([30, 60, 110]);
  });

  it('handles single layer', () => {
    const { tops, bottoms } = computeExpandedYCoordinates(5, [25]);
    expect(tops).toEqual([5]);
    expect(bottoms).toEqual([30]);
  });

  it('each bottom equals next top', () => {
    const { tops, bottoms } = computeExpandedYCoordinates(0, [10, 20, 30]);
    for (let i = 0; i < tops.length - 1; i++) {
      expect(bottoms[i]).toBe(tops[i + 1]);
    }
  });
});

// ── expandLayerPolygons ──────────────────────────────────

describe('expandLayerPolygons', () => {
  const config = { transitionOffsetFromRight: 50, transitionWidth: 20 };

  it('returns empty for empty input', () => {
    expect(expandLayerPolygons([], [], config)).toEqual([]);
  });

  it('returns 4-point polygons (topEdge + bottomEdge) when no expansion needed', () => {
    const polygons: SimplePolygon[] = [
      simplePolygon({ x: 100, y: 0 }, { x: 300, y: 0 }, { x: 300, y: 50 }, { x: 100, y: 50 }),
    ];
    const expandedHeights = [50]; // same as original

    const result = expandLayerPolygons(polygons, expandedHeights, config);
    expect(result.length).toBe(1);
    expect(result[0].topEdge.length).toBe(2);
    expect(result[0].bottomEdge.length).toBe(2);
  });

  it('creates 6-point polygon when only top expands', () => {
    // Layer occupies y=20 to y=25 (height=5), but expanded to 25 (starts at y=-5)
    // const polygons: SimplePolygon[] = [
    //   simplePolygon({ x: 100, y: 20 }, { x: 300, y: 20 }, { x: 300, y: 25 }, { x: 100, y: 25 }),
    // ];
    // The expanded height is 25: top shifts up by 20
    // Original top y = 20, expanded top = 20 (anchor), bottom = 20+25 = 45
    // But original bottom = 25, diff = |45-25| = 20 > 0.5 → bottom also expands
    // To only test top expansion, we need the bottom to stay the same
    // expanded top = anchor = 20, bottom = 20 + expandedHeight
    // For no bottom expansion, expandedBottom must equal original bottom
    // original bottom = 25, so expandedBottom must = 25 → expandedHeight = 5
    // But expanded >= 20 means expansion... Let me use a different approach.

    // 2 layers: first already big enough, second too small
    const poly2: SimplePolygon[] = [
      simplePolygon({ x: 100, y: 0 }, { x: 300, y: 0 }, { x: 300, y: 40 }, { x: 100, y: 40 }),
      simplePolygon({ x: 100, y: 40 }, { x: 300, y: 40 }, { x: 300, y: 45 }, { x: 100, y: 45 }),
    ];
    // expandedHeights: first shrinks, second grows. First keeps its top, second's bottom stays.
    // With expanded heights [35, 10]: tops=[0,35], bottoms=[35,45]
    // Layer 0: expandedTop=0 == original(0), expandedBottom=35 != 40 => only bottom expands
    // Layer 1: expandedTop=35 != 40 => top expands, expandedBottom=45 == 45 => bottom same
    const result = expandLayerPolygons(poly2, [35, 10], config);
    expect(result.length).toBe(2);
    // Layer 1 should have topEdge with 4 points (top expansion)
    expect(result[1].topEdge.length).toBe(4);
    // Layer 1 should have bottomEdge with 2 points (no bottom expansion)
    expect(result[1].bottomEdge.length).toBe(2);
  });

  it('preserves layer reference in output', () => {
    const l = layer({ Comment: 'test-layer' });
    const polygons: SimplePolygon[] = [
      {
        topLeft: { x: 100, y: 0 },
        topRight: { x: 300, y: 0 },
        bottomRight: { x: 300, y: 50 },
        bottomLeft: { x: 100, y: 50 },
        layer: l,
      },
    ];

    const result = expandLayerPolygons(polygons, [50], config);
    expect(result[0].layer).toBe(l);
  });
});

// ── createHardnessAxis ───────────────────────────────────

describe('createHardnessAxis', () => {
  it('returns a Map with entries for F, 4F, 1F, P, K, I', () => {
    const f = frame();
    const proj = createHardnessWidthProjector(f);
    const axis = createHardnessAxis(f, proj);

    expect(axis.size).toBe(6);
    expect(axis.has('F')).toBe(true);
    expect(axis.has('4F')).toBe(true);
    expect(axis.has('1F')).toBe(true);
    expect(axis.has('P')).toBe(true);
    expect(axis.has('K')).toBe(true);
    expect(axis.has('I')).toBe(true);
  });

  it('each axis marker has y values at bottom of frame', () => {
    const f = frame({ y0: 10, height: 200 });
    const proj = createHardnessWidthProjector(f);
    const axis = createHardnessAxis(f, proj);

    for (const [, value] of axis) {
      expect(value.y1).toBe(210); // y0 + height
      expect(value.y2).toBe(220); // y0 + height + axisSize
    }
  });

  it('x-positions are in decreasing order from F to I (right to left)', () => {
    const f = frame();
    const proj = createHardnessWidthProjector(f);
    const axis = createHardnessAxis(f, proj);

    const xF = axis.get('F')!.x1;
    const x4F = axis.get('4F')!.x1;
    const x1F = axis.get('1F')!.x1;
    const xP = axis.get('P')!.x1;
    const xK = axis.get('K')!.x1;
    const xI = axis.get('I')!.x1;

    // Harder = wider polygon = further left on x-axis
    expect(xF).toBeGreaterThan(x4F);
    expect(x4F).toBeGreaterThan(x1F);
    expect(x1F).toBeGreaterThan(xP);
    expect(xP).toBeGreaterThan(xK);
    expect(xK).toBeGreaterThan(xI);
  });
});

// ── createTempAxis ────────────────────────────────────────

describe('createTempAxis', () => {
  it('creates axis markers between minTemp and 0', () => {
    const f = frame({ x0: 0, y0: 0, width: 500, height: 400 });
    const proj = createTempProjector(f, -10, 2);
    const axis = createTempAxis(f, -10, proj);

    expect(axis.length).toBeGreaterThan(0);
    // All temps should be between minTemp and 0
    axis.forEach((tick) => {
      expect(tick.temp).toBeGreaterThanOrEqual(-10);
      expect(tick.temp).toBeLessThanOrEqual(0);
    });
  });

  it('includes both endpoints', () => {
    const f = frame({ x0: 0, y0: 0, width: 500, height: 400 });
    const proj = createTempProjector(f, -10, 2);
    const axis = createTempAxis(f, -10, proj);

    const temps = axis.map((t) => t.temp);
    expect(temps).toContain(-10);
    expect(temps).toContain(0);
  });
});

// ── createDepthAxis ──────────────────────────────────────

describe('createDepthAxis', () => {
  it('creates axis markers from 0 to maxDepth', () => {
    const f = frame({ y0: 10, height: 400 });
    const depthProj = createDepthProjector(f, 2);
    const axis = createDepthAxis(f, 2, depthProj);

    expect(axis.length).toBeGreaterThan(0);
    // All depths as cm strings
    axis.forEach((tick) => {
      const depthCm = Number(tick.depth);
      expect(depthCm).toBeGreaterThanOrEqual(0);
      expect(depthCm).toBeLessThanOrEqual(200);
    });
  });

  it('x-values are at right edge of frame', () => {
    const f = frame({ x0: 10, width: 300 });
    const depthProj = createDepthProjector(f, 1);
    const axis = createDepthAxis(f, 1, depthProj);

    axis.forEach((tick) => {
      expect(tick.x1).toBe(310); // x0 + width
    });
  });
});

// ── offsetCriticalLayerPoints ────────────────────────────

describe('offsetCriticalLayerPointsTop', () => {
  it('shifts y-values down by 2', () => {
    const pts: PlotPoint[] = [
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ];
    const result = offsetCriticalLayerPointsTop(pts);
    expect(result[0]).toEqual({ x: 10, y: 22 });
    expect(result[1]).toEqual({ x: 30, y: 42 });
  });
});

describe('offsetCriticalLayerPointsBottom', () => {
  it('shifts y-values up by 2', () => {
    const pts: PlotPoint[] = [
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ];
    const result = offsetCriticalLayerPointsBottom(pts);
    expect(result[0]).toEqual({ x: 10, y: 18 });
    expect(result[1]).toEqual({ x: 30, y: 38 });
  });
});

// ── createCriticalLayer ──────────────────────────────────

describe('createCriticalLayer', () => {
  const dummyPolygon = {
    topEdge: [
      { x: 0, y: 10 },
      { x: 100, y: 10 },
    ],
    bottomEdge: [
      { x: 100, y: 50 },
      { x: 0, y: 50 },
    ],
    layer: layer(),
  };

  it('returns type=full for ENTIRE_LAYER', () => {
    const result = createCriticalLayer({ CriticalLayerTID: CriticalLayer.ENTIRE_LAYER }, dummyPolygon);
    expect(result).toEqual({ type: 'full' });
  });

  it('returns type=top with polyline for UPPER_PART', () => {
    const result = createCriticalLayer({ CriticalLayerTID: CriticalLayer.UPPER_PART }, dummyPolygon);
    expect(result?.type).toBe('top');
    expect(result?.points).toBeDefined();
    // Points should be offset by +2 in y
    expect(result?.points).toBe('0,12 100,12');
  });

  it('returns type=bottom with polyline for LOWER_PART', () => {
    const result = createCriticalLayer({ CriticalLayerTID: CriticalLayer.LOWER_PART }, dummyPolygon);
    expect(result?.type).toBe('bottom');
    expect(result?.points).toBeDefined();
    expect(result?.points).toBe('100,48 0,48');
  });

  it('returns undefined for NOT_GIVEN', () => {
    const result = createCriticalLayer({ CriticalLayerTID: CriticalLayer.NOT_GIVEN }, dummyPolygon);
    expect(result).toBeUndefined();
  });

  it('returns undefined for no CriticalLayerTID', () => {
    const result = createCriticalLayer({}, dummyPolygon);
    expect(result).toBeUndefined();
  });
});

// ── createCriticalLayers ─────────────────────────────────

describe('createCriticalLayers', () => {
  it('returns array matching layers length', () => {
    const polygon = {
      topEdge: [{ x: 0, y: 0 }],
      bottomEdge: [{ x: 0, y: 10 }],
      layer: layer(),
    };
    const layers = [layer({ CriticalLayerTID: CriticalLayer.ENTIRE_LAYER }), layer()];
    const polygons = [polygon, polygon];

    const result = createCriticalLayers(layers, polygons);
    expect(result.length).toBe(2);
    expect(result[0]?.type).toBe('full');
    expect(result[1]).toBeUndefined();
  });
});

// ── getLabelPositionY ────────────────────────────────────

describe('getLabelPositionY', () => {
  it('returns midpoint of y-range for simple rectangle', () => {
    const points: PlotPoint[] = [
      { x: 0, y: 10 },
      { x: 100, y: 10 },
      { x: 100, y: 30 },
      { x: 0, y: 30 },
    ];
    const y = getLabelPositionY(points);
    // Sorted by x, then y: (0,10), (0,30), (100,10), (100,30)
    // yMin=10, yMax=30, midpoint=20
    expect(y).toBe(20);
  });

  it('should return midpoint of left side, not global min/max y', () => {
    // Polygon der global yMin=5 og yMax=100, men venstre side (x=10) har y=30 og y=70.
    // Korrekt resultat er (30+70)/2 = 50 (venstre-sidens midtpunkt).
    // Feil resultat ville vært (5+100)/2 = 52.5 (globalt midtpunkt).
    const points: PlotPoint[] = [
      { x: 10, y: 30 },
      { x: 50, y: 100 }, // global max y, men ikke på venstre side
      { x: 80, y: 5 }, // global min y, men ikke på venstre side
      { x: 90, y: 40 },
      { x: 90, y: 60 },
      { x: 10, y: 70 },
    ];

    const y = getLabelPositionY(points);
    // Sjekk at vi IKKE bruker global midpoint
    expect(y).not.toBe((5 + 100) / 2);
    // Sjekk at vi bruker venstre-sidens midpoint
    expect(y).toBe((30 + 70) / 2);
  });

  const duplicateTestCases: PlotPoint[][] = [
    [
      { x: 0, y: 10 },
      { x: 0, y: 10 },
      { x: 50, y: 10 },
      { x: 80, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 5 },
      { x: 80, y: 5 },
      { x: 50, y: 30 },
      { x: 0, y: 30 },
    ],
    [
      { x: 0, y: 10 },
      { x: 50, y: 10 },
      { x: 80, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 5 },
      { x: 80, y: 5 },
      { x: 50, y: 30 },
      { x: 0, y: 30 },
      { x: 0, y: 30 },
    ],
    [
      { x: 0, y: 10 },
      { x: 0, y: 10 },
      { x: 0, y: 10 },
      { x: 50, y: 10 },
      { x: 80, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 5 },
      { x: 100, y: 5 },
      { x: 80, y: 5 },
      { x: 50, y: 30 },
      { x: 0, y: 30 },
      { x: 0, y: 30 },
    ],
  ];

  for (const points of duplicateTestCases) {
    it('should handle duplicates', () => {
      const y = getLabelPositionY(points);
      expect(y).toBe(20);
    });
  }

  const varHardnessTestCases: PlotPoint[][] = [
    [
      { x: 5, y: 10 },
      { x: 100, y: 10 },
      { x: 100, y: 30 },
      { x: 0, y: 30 },
    ],
    [
      { x: 0, y: 10 },
      { x: 100, y: 10 },
      { x: 100, y: 30 },
      { x: 5, y: 30 },
    ],
  ];

  for (const points of varHardnessTestCases) {
    it('should handle variable hardness', () => {
      const y = getLabelPositionY(points);
      expect(y).toBe(20);
    });
  }
});

// ── createLayerLabels ────────────────────────────────────

describe('createLayerLabels', () => {
  it('creates grain form labels', () => {
    const layers = [
      {
        points: [
          { x: 0, y: 0 },
          { x: 100, y: 0 },
          { x: 100, y: 20 },
          { x: 0, y: 20 },
        ],
        layer: layer({ GrainFormPrimaryTID: 1 }), // PP
      },
    ];
    const result = createLayerLabels(layers);
    expect(result.gf.length).toBe(1);
    expect(result.gf[0].value).toBeTruthy();
  });

  it('creates grain size labels from avg', () => {
    const layers = [
      {
        points: [
          { x: 0, y: 0 },
          { x: 100, y: 0 },
          { x: 100, y: 20 },
          { x: 0, y: 20 },
        ],
        layer: layer({ GrainSizeAvg: 0.015 }), // 1.5mm
      },
    ];
    const result = createLayerLabels(layers);
    expect(result.gs.length).toBe(1);
    expect(result.gs[0].value).toBe('1.5');
  });

  it('creates grain size label with range', () => {
    const layers = [
      {
        points: [
          { x: 0, y: 0 },
          { x: 100, y: 0 },
          { x: 100, y: 20 },
          { x: 0, y: 20 },
        ],
        layer: layer({ GrainSizeAvg: 0.01, GrainSizeAvgMax: 0.03 }), // 1-3mm
      },
    ];
    const result = createLayerLabels(layers);
    expect(result.gs.length).toBe(1);
    expect(result.gs[0].value).toBe('1-3');
  });

  it('creates wetness labels', () => {
    const layers = [
      {
        points: [
          { x: 0, y: 0 },
          { x: 100, y: 0 },
          { x: 100, y: 20 },
          { x: 0, y: 20 },
        ],
        layer: layer({ WetnessTID: 5 }),
      },
    ];
    const result = createLayerLabels(layers);
    expect(result.lwc.length).toBe(1);
    expect(result.lwc[0].value).toBe(5);
  });

  it('skips layers with no relevant data', () => {
    const layers = [
      {
        points: [
          { x: 0, y: 0 },
          { x: 100, y: 0 },
          { x: 100, y: 20 },
          { x: 0, y: 20 },
        ],
        layer: layer({ GrainFormPrimaryTID: undefined, GrainSizeAvg: undefined, WetnessTID: undefined }),
      },
    ];
    const result = createLayerLabels(layers);
    expect(result.gf.length).toBe(0);
    expect(result.gs.length).toBe(0);
    expect(result.lwc.length).toBe(0);
  });
});

// ── createCompressionTestPlots ───────────────────────────

describe('createCompressionTestPlots', () => {
  const mockFormatter = (test: any, opts: { includeDepth: boolean; includeFracture: boolean }) => {
    let s = 'CT';
    if (opts.includeDepth && test.FractureDepth) s += `@${(test.FractureDepth * 100).toFixed(0)}cm`;
    if (opts.includeFracture) s += '(frac)';
    return s;
  };
  const depthProj = (d: number) => d * 100;

  it('filters out tests without FractureDepth', () => {
    const tests = [{ FractureDepth: undefined, IncludeInSnowProfile: true }];
    const result = createCompressionTestPlots(tests, mockFormatter, depthProj);
    expect(result.length).toBe(0);
  });

  it('filters out tests not included in snow profile', () => {
    const tests = [{ FractureDepth: 0.5, IncludeInSnowProfile: false }];
    const result = createCompressionTestPlots(tests, mockFormatter, depthProj);
    expect(result.length).toBe(0);
  });

  it('returns label and tooltip for valid test', () => {
    const tests = [{ FractureDepth: 0.5, IncludeInSnowProfile: true }];
    const result = createCompressionTestPlots(tests, mockFormatter, depthProj);
    expect(result.length).toBe(1);
    expect(result[0].y).toBe(50); // 0.5 * 100
    expect(result[0].label).toBe('CT');
    expect(result[0].tooltip).toContain('CT');
  });

  it('appends * to label and comment to tooltip when Comment is present', () => {
    const tests = [{ FractureDepth: 0.5, IncludeInSnowProfile: true, Comment: 'Weak' }];
    const result = createCompressionTestPlots(tests, mockFormatter, depthProj);
    expect(result[0].label).toBe('CT*');
    expect(result[0].tooltip).toContain('"Weak"');
  });
});
