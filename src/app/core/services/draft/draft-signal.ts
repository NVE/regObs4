import { inject, Signal } from '@angular/core';
import { RegistrationDraft } from './draft-model';
import { DraftRepositoryService } from './draft-repository.service';
import { rxResource } from '@angular/core/rxjs-interop';

export function getDraftSignal(uuid: Signal<RegistrationDraft['uuid']>) {
  const draftRepo = inject(DraftRepositoryService);
  const resource = rxResource({
    request: () => uuid(),
    loader: ({ request: uuid }) => draftRepo.getDraft$(uuid),
  });
  return resource.value.asReadonly();
}
