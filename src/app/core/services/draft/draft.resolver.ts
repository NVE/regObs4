import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { RegistrationDraft } from './draft-model';
import { DraftRepositoryService } from './draft-repository.service';
import { inject } from '@angular/core';

export const draftResolver: ResolveFn<RegistrationDraft> = (
  route: ActivatedRouteSnapshot
  // state: RouterStateSnapshot,
) => {
  const draftRepo = inject(DraftRepositoryService);
  const id = route.params['id'];
  return draftRepo.load(id);
};
