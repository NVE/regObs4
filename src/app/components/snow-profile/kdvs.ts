import { computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { KdvElement } from 'src/app/modules/common-regobs-api';

export interface KDVs {
  wetness: KdvElement[];
  propagation: KdvElement[];
  fracture: KdvElement[];
}

/**
 * Hjelpefunksjon for å hente alle snøprofil-kdver
 */
export function injectSnowProfileKdvs() {
  const kdvs = inject(KdvService);

  // grainForm = toSignal(this.kdv.getKdvRepositoryByKeyObservable('Snow_GrainFormKDV'), { initialValue: [] });
  // hardness = toSignal(this.kdv.getKdvRepositoryByKeyObservable('Snow_HardnessKDV'), { initialValue: [] });
  const lwcKdv = toSignal(kdvs.getKdvRepositoryByKeyObservable('Snow_WetnessKDV'), { initialValue: [] });
  const propagationKdv = toSignal(kdvs.getKdvRepositoryByKeyObservable('Snow_PropagationKDV'), {
    initialValue: [],
  });
  const fractureKdv = toSignal(kdvs.getKdvRepositoryByKeyObservable('Snow_ComprTestFractureKDV'), {
    initialValue: [],
  });
  return computed<KDVs>(() => ({
    wetness: lwcKdv(),
    propagation: propagationKdv(),
    fracture: fractureKdv(),
  }));
}
