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
     */
    getName: (tid: Signal<number | undefined>) =>
      computed(() => {
        const table = kdv();
        const typeId = tid();
        return table.find((v) => v.Id === typeId)?.Name ?? typeId?.toString();
      }),
  };
}
