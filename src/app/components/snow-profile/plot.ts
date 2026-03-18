import {
  CompressionTestEditModel,
  SnowTempObsModel,
  StratProfileLayerEditModel,
} from 'src/app/modules/common-regobs-api';
import {
  Hardness,
  Label,
  LayerExpansionConfig,
  SimplePolygon,
  PlotFrame,
  PlotPoint,
  ExpandedPolygon,
  TempPoint,
  CriticalLayer,
  CriticalLayerPoints,
} from './models';
import { formatGrainFormSymbol, formatGrainSizeMm } from './formatters';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function createTempProjector(
  frame: PlotFrame,
  minTemp: number,
  maxDepth: number
): (p: SnowTempObsModel) => PlotPoint {
  const { x0, y0, height, width } = frame;
  const tempRange = Math.abs(minTemp);

  return ({ SnowTemp, Depth }: SnowTempObsModel): PlotPoint => {
    if (SnowTemp == null) throw new Error('Temp required');
    if (Depth == null) throw new Error('Depth required');

    const normalizedX = (SnowTemp - minTemp) / tempRange;
    const normalizedY = Depth / maxDepth;

    return {
      x: fmt(x0 + clamp(normalizedX, 0, 1) * width),
      y: fmt(y0 + clamp(normalizedY, 0, 1) * height),
    };
  };
}

function fmt(value: number, decimals = 2): number {
  // Rounds and trims trailing zeros, e.g. 1.2300 -> 1.23, 1.000 -> 1
  return Number(value.toFixed(decimals));
}

export function pointsToPath(points: readonly PlotPoint[]): string {
  if (points.length === 0) return '';

  if (points.length === 1) {
    const p = points[0];
    return `M ${p.x} ${p.y}`;
  }

  const [first, ...rest] = points;
  return `M ${first.x} ${first.y} ` + rest.map((p) => `L ${p.x} ${p.y}`).join(' ');
}

export function pointsToPolyline(points: readonly PlotPoint[]): string {
  return [...points, points[0]].map((point) => `${point.x},${point.y}`).join(' ');
}

export function pointsToOpenPolyline(points: readonly PlotPoint[]): string {
  return points.map((point) => `${point.x},${point.y}`).join(' ');
}

export function createDepthProjector(frame: PlotFrame, maxDepth: number): (depth: number) => number {
  return (depth: number): number => {
    if (!Number.isFinite(depth) || depth < 0) {
      throw new Error('Depth må være et tall >= 0');
    }

    const normalizedY = depth / maxDepth;
    return frame.y0 + clamp(normalizedY, 0, 1) * frame.height;
  };
}

export function createHardnessWidthProjector(
  frame: PlotFrame
  // config: HardnessProjectorConfig
): (hardnessTid: number) => number {
  return (hardnessTid: number): number => {
    const linearFraction = getLinearHardnessFraction(hardnessTid);

    // if (config.mode === 'linear') {
    //   return fmt(frame.width * linearFraction);
    // }
    // return fmt(config.minWidthPx + (frame.width - config.minWidthPx) * Math.pow(linearFraction, config.exponent));
    return fmt(frame.width * linearFraction);
  };
}

// function getRamHardnessFraction(hardnessTid: number): number {
//   // https://cryosphericsciences.org/wp-content/uploads/2019/02/snowclass_2009-11-23-tagged-highres.pdf
//   // Side 6 og side 43
//   // Formel (ca): 19.3 * HHI**2.4
//   // Claude mener HHI for - og + verdiene skal være feks 1.33, 1.67 osv, men kanskje feks 1.25, 1.75 osv er bedre?
//   const anchors = [
//     { tid: Hardness['F-'], newton: 10 }, // 0.75
//     { tid: Hardness.F, newton: 20 }, // HHI (Hand Hardness Index) = 1
//     { tid: Hardness['F-4F'], newton: 50 }, // 1.5
//     { tid: Hardness['F-4F'], newton: 50 }, // 1.5
//     { tid: Hardness['4F'], newton: 100 }, // 2
//     { tid: Hardness['4F-1F'], newton: 175 }, // 2.5
//     { tid: Hardness['1F'], newton: 250 }, // 3
//     { tid: Hardness['1F-P'], newton: 390 },
//     { tid: Hardness.P, newton: 500 },
//     { tid: Hardness['P-K'], newton: 715 },
//     { tid: Hardness.K, newton: 1000 },
//     { tid: Hardness['K-I'], newton: 1200 },
//     { tid: Hardness.I, newton: 1200 },
//   ];
// }

function getLinearHardnessFraction(hardnessTid: number): number {
  const anchors = [
    { tid: Hardness[' - '], fraction: 1 },
    { tid: Hardness.F, fraction: 1 / 6 },
    { tid: Hardness['4F'], fraction: 2 / 6 },
    { tid: Hardness['1F'], fraction: 3 / 6 },
    { tid: Hardness.P, fraction: 4 / 6 },
    { tid: Hardness.K, fraction: 5 / 6 },
    { tid: Hardness.I, fraction: 6 / 6 },
  ];

  if (hardnessTid === Hardness['F-']) {
    return 3 / 24;
  }

  for (let i = 0; i < anchors.length; i++) {
    const current = anchors[i];

    if (hardnessTid === current.tid) {
      return current.fraction;
    }

    const next = anchors[i + 1];
    if (!next) {
      break;
    }

    if (hardnessTid > current.tid && hardnessTid < next.tid) {
      const t = (hardnessTid - current.tid) / (next.tid - current.tid);
      return current.fraction + (next.fraction - current.fraction) * t;
    }
  }

  throw new Error(`HardnessTID ${hardnessTid} støttes ikke i lineær skala`);
}

export function createLayerPolygons(
  frame: PlotFrame,
  layers: readonly StratProfileLayerEditModel[],
  hardnessProjector: (hardness: Hardness) => number,
  depthProjector: (depth: number) => number
): SimplePolygon[] {
  if (layers.length === 0) {
    return [];
  }

  const { x0, width } = frame;
  const rightEdgeX = fmt(x0 + width);

  let currentDepth = 0;

  return layers.map((layer) => {
    const hardness = layer.HardnessTID ?? Hardness[' - ']; // TODO: Merke lag på noe måte ?
    const thickness = layer.Thickness || 0.001;
    const topDepth = currentDepth;
    const bottomDepth = currentDepth + thickness;

    const topWidth = hardnessProjector(hardness);
    const hardnessBottomTid = layer.HardnessBottomTID ?? hardness;
    const bottomWidth = hardnessProjector(hardnessBottomTid as number);

    const leftTopX = fmt(x0 + width - topWidth);
    const leftBottomX = fmt(x0 + width - bottomWidth);
    const topY = fmt(depthProjector(topDepth));
    const bottomY = fmt(depthProjector(bottomDepth));

    currentDepth = bottomDepth;

    return {
      topLeft: { x: leftTopX, y: topY },
      topRight: { x: rightEdgeX, y: topY },
      bottomRight: { x: rightEdgeX, y: bottomY },
      bottomLeft: { x: leftBottomX, y: bottomY },
      layer,
    };
  });
}

const CRITICAL_LAYER_OFFSET = 2;

export function offsetCriticalLayerPointsTop(points: PlotPoint[]): PlotPoint[] {
  return points.map(({ x, y }) => ({ x, y: y + CRITICAL_LAYER_OFFSET }));
}

export function offsetCriticalLayerPointsBottom(points: PlotPoint[]): PlotPoint[] {
  return points.map(({ x, y }) => ({ x, y: y - CRITICAL_LAYER_OFFSET }));
}

export function createCriticalLayer(
  layer: StratProfileLayerEditModel,
  polygon: ExpandedPolygon
): CriticalLayerPoints | undefined {
  if (layer.CriticalLayerTID === CriticalLayer.ENTIRE_LAYER) {
    return { type: 'full' };
  }
  if (layer.CriticalLayerTID === CriticalLayer.UPPER_PART) {
    return { type: 'top', points: pointsToOpenPolyline(offsetCriticalLayerPointsTop(polygon.topEdge)) };
  }
  if (layer.CriticalLayerTID === CriticalLayer.LOWER_PART) {
    return { type: 'bottom', points: pointsToOpenPolyline(offsetCriticalLayerPointsBottom(polygon.bottomEdge)) };
  }
  return undefined;
}

/**
 * Hvis et lag er markert som et "kritisk lag", trekkes det ut linje fra overkant / underkant av lag-polygonet for å
 * markere kritisk lag.
 */
export function createCriticalLayers(layers: StratProfileLayerEditModel[], polygons: ExpandedPolygon[]) {
  const result = [];
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    const polygon = polygons[i];
    result.push(createCriticalLayer(layer, polygon));
  }
  return result;
}

/**
 * Computes expanded layer heights (list B) from original heights (list A).
 *
 * Algorithm:
 * 1. B = copy of A, with each height clamped to at least `minHeight`.
 * 2. Compute excess = sum(B) - sum(A).
 * 3. For each expanded layer, absorb its deficit from nearest neighbours first,
 *    spreading outward. Each neighbour can give at most `B[j] - minHeight`.
 * 4. Any remaining excess means the plot must grow (all absorption exhausted).
 *
 * Returns the adjusted B heights array.
 */
export function computeExpandedHeights(originalHeights: readonly number[], minHeight: number): number[] {
  const n = originalHeights.length;
  const B = originalHeights.map((h) => Math.max(h, minHeight));

  let excess = B.reduce((s, h) => s + h, 0) - originalHeights.reduce((s, h) => s + h, 0);
  if (excess <= 0) {
    return B;
  }

  // For each layer that was expanded, try to absorb its deficit from neighbours
  for (let i = 0; i < n && excess > 0.01; i++) {
    const deficit = B[i] - originalHeights[i];
    if (deficit <= 0) continue;

    let remaining = deficit;

    // Spread outward from layer i, preferring the thickest neighbour at each radius
    let radius = 1;
    while (remaining > 0.01 && radius < n) {
      const neighbours: number[] = [];
      if (i - radius >= 0) neighbours.push(i - radius);
      if (i + radius < n) neighbours.push(i + radius);
      radius++;

      if (neighbours.length === 0) continue;

      // Sort neighbours so the thickest (most capacity) is consumed first
      neighbours.sort((a, b) => B[b] - B[a]);

      for (const j of neighbours) {
        const canGive = B[j] - minHeight;
        if (canGive <= 0 || remaining <= 0.01) continue;

        const give = Math.min(remaining, canGive);
        B[j] -= give;
        remaining -= give;
        excess -= give;
      }
    }
  }

  return B;
}

/**
 * Stacks expanded heights from an anchor Y to compute expanded top/bottom Y-coordinates.
 */
export function computeExpandedYCoordinates(
  anchorTop: number,
  expandedHeights: readonly number[]
): { tops: number[]; bottoms: number[] } {
  const n = expandedHeights.length;
  const tops: number[] = new Array(n);
  const bottoms: number[] = new Array(n);

  let currentTop = anchorTop;
  for (let i = 0; i < n; i++) {
    tops[i] = fmt(currentTop);
    bottoms[i] = fmt(currentTop + expandedHeights[i]);
    currentTop += expandedHeights[i];
  }

  return { tops, bottoms };
}

/**
 * Expands layers that are thinner than `config.minHeight` on the left side,
 * while keeping the right side at the original thickness.
 *
 * Uses two height lists:
 * - A (original): used for the right side of polygons.
 * - B (expanded): used for the left side, where every layer is at least `minHeight` px tall.
 *   Deficit is absorbed from nearest neighbours first to keep distortion local.
 *
 * The transition between A and B heights happens in a configurable zone along the X-axis.
 *
 * Returns polygon points ready for SVG rendering.
 */
export function expandLayerPolygons(
  layers: readonly SimplePolygon[],
  expandedHeights: readonly number[],
  config: LayerExpansionConfig
): ExpandedPolygon[] {
  if (layers.length === 0) {
    return [];
  }

  const { transitionEndOffsetFromRight, transitionWidth } = config;
  const rightEdge = layers[0].topRight.x;
  const transitionEndX = fmt(rightEdge - transitionEndOffsetFromRight);
  const transitionStartX = fmt(transitionEndX - transitionWidth);

  const { tops: expandedTops, bottoms: expandedBottoms } = computeExpandedYCoordinates(
    layers[0].topRight.y,
    expandedHeights
  );

  // Build polygon points for each layer
  return layers.map(({ topLeft, topRight, bottomLeft, bottomRight, layer }, i) => {
    const topDiff = Math.abs(expandedTops[i] - topRight.y);
    const bottomDiff = Math.abs(expandedBottoms[i] - bottomRight.y);
    const expandsTop = topDiff > 0.5;
    const expandsBottom = bottomDiff > 0.5;

    if (!expandsTop && !expandsBottom) {
      // No expansion needed: 4-point polygon
      return {
        topEdge: [topLeft, topRight],
        bottomEdge: [bottomRight, bottomLeft],
        layer,
      };
    }

    if (expandsTop && !expandsBottom) {
      // Expansion upward only: 6-point polygon
      const p0 = { x: topLeft.x, y: expandedTops[i] };
      const p1 = { x: transitionStartX, y: expandedTops[i] };
      const p2 = { x: transitionEndX, y: topRight.y };
      const p3 = { x: bottomRight.x, y: topRight.y };
      const p4 = { x: bottomRight.x, y: bottomRight.y };
      const p5 = { x: bottomLeft.x, y: bottomRight.y };
      return {
        topEdge: [p0, p1, p2, p3],
        bottomEdge: [p4, p5],
        layer,
      };
    }

    if (!expandsTop && expandsBottom) {
      // Expansion downward only: 6-point polygon
      const p0 = { x: topLeft.x, y: topRight.y };
      const p1 = { x: bottomRight.x, y: topRight.y };
      const p2 = { x: bottomRight.x, y: bottomRight.y };
      const p3 = { x: transitionEndX, y: bottomRight.y };
      const p4 = { x: transitionStartX, y: expandedBottoms[i] };
      const p5 = { x: bottomLeft.x, y: expandedBottoms[i] };
      return {
        topEdge: [p0, p1],
        bottomEdge: [p2, p3, p4, p5],
        layer,
      };
    }

    // Expansion both directions: 8-point polygon
    const p0 = { x: topLeft.x, y: expandedTops[i] };
    const p1 = { x: transitionStartX, y: expandedTops[i] };
    const p2 = { x: transitionEndX, y: topRight.y };
    const p3 = { x: bottomRight.x, y: topRight.y };
    const p4 = { x: bottomRight.x, y: bottomRight.y };
    const p5 = { x: transitionEndX, y: bottomRight.y };
    const p6 = { x: transitionStartX, y: expandedBottoms[i] };
    const p7 = { x: bottomLeft.x, y: expandedBottoms[i] };
    return {
      topEdge: [p0, p1, p2, p3],
      bottomEdge: [p4, p5, p6, p7],
      layer,
    };
  });
}

export function createHardnessAxis(frame: PlotFrame, hardnessProjector: (hardness: Hardness) => number) {
  const { x0, y0, height, width, axisSize } = frame;
  const y1 = y0 + height;
  const y2 = y1 + axisSize;
  return new Map(
    [Hardness.F, Hardness['4F'], Hardness['1F'], Hardness.P, Hardness.K, Hardness.I].map((h) => {
      const x = x0 + (width - hardnessProjector(h));
      return [
        // Key
        Hardness[h],
        // Value = svg line attributes
        {
          x1: x,
          y1,
          x2: x,
          y2,
        },
      ];
    })
  );
}

export function createTempPoints(
  temps: SnowTempObsModel[],
  tempProjector: (temp: SnowTempObsModel) => PlotPoint
): TempPoint[] {
  return temps.map((x) => {
    const point = tempProjector(x);
    return {
      ...point,
      temp: x.SnowTemp as number,
    };
  });
}

export function createTempAxis(
  frame: PlotFrame,
  minTemp: number,
  tempProjector: (temp: SnowTempObsModel) => PlotPoint
) {
  const y1 = frame.y0;
  const y2 = frame.y0 - frame.axisSize;
  const nTicks = frame.width < 500 ? 5 : 8;
  const step = niceStep(minTemp, nTicks, [2, 4, 5, 10]);
  const temps = generateStepList(minTemp, 0, step);
  return temps.map((temp) => {
    const point = tempProjector({ SnowTemp: temp, Depth: 0 });
    return {
      x1: point.x,
      x2: point.x,
      y1,
      y2,
      temp,
    };
  });
}

export function createDepthAxis(frame: PlotFrame, maxDepth: number, depthProjector: (depth: number) => number) {
  const nTicks = frame.height < 1000 ? 8 : 15;
  const step = niceStep(maxDepth, nTicks, [0.1, 0.2, 0.5, 1, 2]);
  const steps = generateStepList(0, maxDepth, step);
  const x1 = frame.x0 + frame.width;
  const x2 = x1 + frame.axisSize;
  return steps.map((depth) => {
    const y = fmt(depthProjector(depth));
    return {
      x1,
      x2,
      y1: y,
      y2: y,
      depth: (depth * 100).toFixed(0),
    };
  });
}

function niceStep(range: number, maxTicks: number, steps: number[]): number {
  const minStep = Math.abs(range) / maxTicks;
  return steps.find((s) => s >= minStep) ?? minStep;
}

export function generateStepList(min: number, max: number, step: number): number[] {
  if (step <= 0) throw new Error('Step must be positive');
  if (max < min) throw new Error('Max must be greater than or equal to min');
  const result: number[] = [];
  // Oppover
  if (min >= 0) {
    for (let value = min; value < max; value += step) {
      result.push(Number(value.toFixed(6)));
    }
    result.push(Number(max.toFixed(6)));
  }
  // Nedover (min < 0, max = 0 eller max < 0)
  else {
    for (let value = max; value > min; value -= step) {
      result.push(Number(value.toFixed(6)));
    }
    result.push(Number(min.toFixed(6)));
  }
  return result;
}

export function getLabelPositionY(polygon: readonly PlotPoint[]): number {
  const sortedY = [...polygon].sort((a, b) => a.x - b.x || a.y - b.y).map(({ y }) => y);
  const [yMin, yMax] = sortedY;
  const diff = yMax - yMin;
  return yMin + diff / 2;
}

export function createLayerLabels(layers: { points: readonly PlotPoint[]; layer: StratProfileLayerEditModel }[]) {
  const labels = {
    gf: [] as Label<string>[],
    gs: [] as Label<string>[],
    lwc: [] as Label<number>[],
  };

  // Grain form, grain size, wetness, density?
  for (let i = 0; i < layers.length; i++) {
    const { layer, points } = layers[i];
    const { GrainFormPrimaryTID, GrainFormSecondaryTID, WetnessTID, GrainSizeAvg, GrainSizeAvgMax } = layer;

    const shouldHaveLabel = !!(
      GrainFormPrimaryTID ||
      GrainFormSecondaryTID ||
      WetnessTID ||
      GrainSizeAvg ||
      GrainSizeAvgMax
    );

    if (!shouldHaveLabel) continue;

    const y = getLabelPositionY(points);

    if (GrainFormPrimaryTID != null) {
      labels.gf.push({ y, value: formatGrainFormSymbol(GrainFormPrimaryTID, GrainFormSecondaryTID) });
    }

    if (WetnessTID != null) {
      labels.lwc.push({ y, value: WetnessTID });
    }

    if (GrainSizeAvg != null) {
      labels.gs.push({ y, value: formatGrainSizeMm(GrainSizeAvg, GrainSizeAvgMax) });
    }
  }

  return labels;
}

export function createCompressionTestPlots(
  tests: CompressionTestEditModel[],
  testFormatter: (test: CompressionTestEditModel, opts: { includeDepth: boolean; includeFracture: boolean }) => string,
  depthProjector: (depth: number) => number
) {
  return tests
    .filter((x) => x.FractureDepth != null)
    .filter((x) => x.IncludeInSnowProfile)
    .map((test) => {
      let label = testFormatter(test, { includeDepth: false, includeFracture: false });
      const y = depthProjector(test.FractureDepth as number);
      let tooltip = testFormatter(test, { includeDepth: true, includeFracture: true });
      if (test.Comment) {
        tooltip += ` "${test.Comment}"`;
        label += '*';
      }
      return {
        label,
        y,
        tooltip,
      };
    });
}
