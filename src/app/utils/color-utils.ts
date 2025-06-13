import { AppMode } from '../modules/common-core/models';

/**
 * Returnerer tema-fargenavn for header på bakgrunn av valgt appmodus.
 * Vi har CSS-variable for bakgrunnsfarge i header som passer med tema-fargenavnet.
 * Eksempel: Hvis appMode er Demo, returneres 'danger'. CSS-variabelen som styrer fargen blir da --ion-color-danger.
 */
export const getHeaderThemeColor = (appMode: AppMode | undefined): string => {
  switch (appMode) {
    case AppMode.Demo:
      return 'danger';
    case AppMode.Test:
      return 'success';
  }
  return 'primary';
};
