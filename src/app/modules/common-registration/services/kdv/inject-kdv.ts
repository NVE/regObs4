import { computed, inject, Signal } from '@angular/core';
import { KdvKey } from '../../registration.models';
import { KdvService } from './kdv.service';
import { toSignal } from '@angular/core/rxjs-interop';

/**
 * Hjelpefunksjon for å bruke KDV-tabell-verdier i komponenter.
 */
export function injectKdv(key: KdvKey) {
  const kdvService = inject(KdvService);
  const kdv = toSignal(kdvService.getKdvRepositoryByKeyObservable(key), { initialValue: [] });

  return {
    /**
     * KDV-tabell-verdien for valgt språk.
     */
    table: kdv,

    /**
     * Returnerer en computed som henter navnet / teksten til en type id (Tid).
     * Verdier med TID = 0 eller x00 betyr vanligvis "ikke gitt" e.l., så de filtrerer vi vekk ved å returnere undefined
     * @param showAlsoNotGiven Sett denne til true for å ta med verdier med TID = 0 eller x00 (100, 200 osv.)
     */
    getName: (tid: Signal<number | undefined>, showAlsoNotGiven = false) =>
      computed(() => {
        const table = kdv();
        const typeId = tid();
        if (typeId === undefined || (!showAlsoNotGiven && (typeId === 0 || typeId % 100 === 0))) {
          return undefined; // filtrer vekk verdier som ikke skal vises
        }
        return table.find((v) => v.Id === typeId)?.Name ?? typeId?.toString();
      }),
  };
}
