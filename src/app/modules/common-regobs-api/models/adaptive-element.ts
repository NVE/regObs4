/* tslint:disable */
import { AdaptiveHeight } from './adaptive-height';
import { AdaptiveFallbackElement } from './adaptive-fallback-element';
export interface AdaptiveElement {
  type?: string;
  id?: string;
  spacing?: 'default' | 'none' | 'small' | 'medium' | 'large' | 'extraLarge' | 'padding';
  separator?: boolean;
  speak?: string;
  height?: AdaptiveHeight;
  isVisible?: boolean;
  fallback?: AdaptiveFallbackElement;
  requires?: {[key: string]: string};
}
