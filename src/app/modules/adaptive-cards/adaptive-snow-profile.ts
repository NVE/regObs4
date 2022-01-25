import { AdaptiveElement } from '@varsom-regobs-common/regobs-api';

/**
 * We need a custom component for SnowProfile plots,
 * as it should be possible to open an interactive version.
 */
export interface SnowProfileData extends AdaptiveElement {
  pngUrl: string;
  svgUrl: string;
  interactiveUrl: string;
  altText: string;
}