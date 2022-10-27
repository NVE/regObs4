/* tslint:disable */
import { AdaptiveFallbackElement } from './adaptive-fallback-element';
import { AdaptiveHeight } from './adaptive-height';
export interface AdaptiveElement {
  fallback?: AdaptiveFallbackElement;
  height?: AdaptiveHeight;
  id?: string;
  isVisible?: boolean;
  requires?: {[key: string]: string};
  separator?: boolean;
  spacing?: 'default' | 'none' | 'small' | 'medium' | 'large' | 'extraLarge' | 'padding';
  speak?: string;
  type?: string;
}
