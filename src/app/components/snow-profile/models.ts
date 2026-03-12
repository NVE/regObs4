export interface PlotPoint {
  x: number;
  y: number;
}
export interface TempPoint extends PlotPoint {
  temp: number;
}

export interface LayerPolygon {
  points: PlotPoint[];
  /**
   * SVG <title> tooltip text
   */
  tooltip: string;
}

export interface PolylineAttributes {
  points: string;
  /**
   * SVG <title> tooltip text
   */
  tooltip: string;
}

export interface PlotFrame {
  width: number;
  height: number;
  x0: number;
  y0: number;
  axisSize: number;
}

export type HardnessScaleMode = 'linear' | 'exponential';

export type HardnessProjectorConfig = {
  mode: HardnessScaleMode;
  minWidthPx: number;
  exponent: number;
}; /**
 * Structured polygon data for a single layer, before conversion to polyline string.
 * Coordinates are absolute SVG coordinates (includes x0/y0 offsets).
 */

export interface LayerPolygonData {
  /** Left x-coordinate at the top edge (determined by top hardness) */
  leftTopX: number;
  /** Left x-coordinate at the bottom edge (determined by bottom hardness) */
  leftBottomX: number;
  /** Right edge x-coordinate (always frame.x0 + frame.width) */
  rightEdgeX: number;
  /** Y-coordinate of the top edge */
  topY: number;
  /** Y-coordinate of the bottom edge */
  bottomY: number;
  /** Original height in pixels (bottomY - topY) */
  originalHeight: number;

  tooltip: string;
  criticalLayer?: CriticalLayer;
}

export interface LayerExpansionConfig {
  /** Minimum height in pixels for each layer on the left (expanded) side */
  minHeight: number;
  /** Offset from right edge where the transition zone ends and original thickness begins */
  transitionEndOffsetFromRight: number;
  /** Width of the transition ramp in pixels */
  transitionWidth: number;
}

export type Label<T> = { y: number; value: T };

/**
 * Hardhet
 *
 * Hardness code -> Regobs KDV ID. Bør tilsvare det som finnes i databasen.
 */
export enum Hardness {
  ' - ' = 0,
  'F-' = 1,
  'F' = 2,
  'F+' = 3,
  'F-4F' = 4,
  '4F-' = 5,
  '4F' = 6,
  '4F+' = 7,
  '4F-1F' = 8,
  '1F-' = 9,
  '1F' = 10,
  '1F+' = 11,
  '1F-P' = 12,
  'P-' = 13,
  'P' = 14,
  'P+' = 15,
  'P-K' = 16,
  'K-' = 17,
  'K' = 18,
  'K+' = 19,
  'K-I' = 20,
  'I' = 21,
}

export enum CriticalLayer {
  UPPER_PART = 11,
  LOWER_PART = 12,
  ENTIRE_LAYER = 13,
  NOT_GIVEN = 0,
}
