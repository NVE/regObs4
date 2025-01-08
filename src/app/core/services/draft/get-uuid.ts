import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export function injectUuidFromRouteParameters(): string {
  const activatedRoute = inject(ActivatedRoute);
  const id = activatedRoute.snapshot.params['id'];
  if (id == null) {
    throw new Error('No id parameter found on activated route');
  }
  return id;
}
