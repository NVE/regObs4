import { AppMode } from '../modules/common-core/models';

/**
 * Returnerer siste del av CSS-variabel-navn på bakgrunnsfarge i header på bakgrunn av valgt appmodus.
 * Så hvis appMode er Demo, returneres 'danger', slik at CSS-variabelen blir --ion-color-danger.
 */
export const getHeaderBackgroundColorCssVariablePostfix = (appMode: AppMode | undefined): string => {
  switch (appMode) {
    case AppMode.Demo:
      return 'danger';
    case AppMode.Test:
      return 'success';
  }
  return 'primary';
};
