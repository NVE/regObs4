import { CanDeactivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { OverviewPage } from './overview/overview.page';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import {
  ConfirmationModalService,
  PopupResponse,
} from '../../../core/services/confirmation-modal/confirmation-modal.service';

const isInWhitelist = (url: string) => {
  const whiteList = ['registration/', 'my-observations'];
  return whiteList.some((w) => url.indexOf(w) >= 0);
};

const askToSaveOrNot = (modalService: ConfirmationModalService) => {
  return modalService.askForConfirmation({
    message: 'REGISTRATION.SAVE_ALERT.MESSAGE',
    header: 'REGISTRATION.SAVE_ALERT.HEADER',
    buttons: [
      {
        text: 'REGISTRATION.SAVE_ALERT.NO',
        role: PopupResponse.CANCEL,
      },
      {
        text: 'REGISTRATION.SAVE_ALERT.YES',
        role: PopupResponse.CONFIRM,
      },
    ],
  });
};

const saveAsDraftGuardAsync = async (
  draftService: DraftRepositoryService,
  modalService: ConfirmationModalService,
  component,
  currentRoute,
  currentState,
  nextState
) => {
  const uuid = currentRoute.params['id'];
  if (nextState && !isInWhitelist(nextState.url) && uuid != null) {
    const draft = await draftService.load(uuid);
    if (draft && draft.syncStatus === SyncStatus.Draft) {
      const save = await askToSaveOrNot(modalService);
      if (!save) {
        await draftService.delete(draft.uuid);
      }
    }
  }
  return true;
};

export const saveAsDraftGuard: CanDeactivateFn<OverviewPage> = (component, currentRoute, currentState, nextState) => {
  // Inject kan ikke brukes i async funksjoner, derfor er dette satt opp med en async hjelpefunksjon
  const draftService = inject(DraftRepositoryService);
  const modalService = inject(ConfirmationModalService);
  return saveAsDraftGuardAsync(draftService, modalService, component, currentRoute, currentState, nextState);
};
