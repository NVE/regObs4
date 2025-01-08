import { inject, Signal } from '@angular/core';
import { ConfirmationModalService } from 'src/app/core/services/confirmation-modal/confirmation-modal.service';
import { DraftRepositoryService } from '../services/draft/draft-repository.service';
import { RegistrationDraft } from '../services/draft/draft-model';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

type ShouldConfirm = boolean;
type ShouldConfirmCheck = (draft?: RegistrationDraft) => ShouldConfirm;
interface BackupHandlerOptions {
  doBackup?: false;
  uuid?: string | Signal<string | undefined>;
  shouldConfirm?: ShouldConfirmCheck;
}

/**
 * En hjelpefunksjon for å håndtere backup i komponenter som ønsker det.
 * Typisk for skjemaside, feks legg til lag i snøprofil.
 *
 * Bør enkelt kunne konverteres til en service hvis vi trenger det ift testing eller lignende.
 */
export function injectBackupHandler(opts?: BackupHandlerOptions) {
  const modal = inject(ConfirmationModalService);
  const draftRepo = inject(DraftRepositoryService);
  const logger = inject(LoggingService);

  const doBackup = opts?.doBackup !== false;
  let backup: Promise<RegistrationDraft> | undefined;
  if (doBackup) {
    logger.debug('Loading backup draft to memory', 'BackupHandler', { opts });
    backup = draftRepo.load(opts?.uuid);
  }

  let draft: RegistrationDraft | undefined;

  const confirmCancel = async (shouldConfirm?: ShouldConfirmCheck) => {
    logger.debug('Confirm cancel', 'BackupHandler', { opts, hasShouldConfirmArg: shouldConfirm != null });

    if (backup != null && draft == null) {
      draft = await backup;
    }

    let shouldConfirmResult = true;
    if (shouldConfirm) {
      shouldConfirmResult = shouldConfirm(draft);
    } else if (opts?.shouldConfirm) {
      shouldConfirmResult = opts.shouldConfirm(draft);
    }

    if (!shouldConfirmResult) {
      return true; // No need to ask user, continue with backup
    }

    return await modal.askForConfirmation({
      header: 'DIALOGS.ARE_YOU_SURE',
      message: 'REGISTRATION.SNOW.SNOW_PROFILE.CONFIRM_CANCEL',
    });
  };

  const restoreBackup = async () => {
    if (!doBackup) {
      throw new Error('doBackup was set to false');
    }
    if (draft == null) {
      draft = await backup;
    }
    if (draft == null) {
      throw new Error('No draft to restore');
    }

    logger.debug('Restoring backup', 'BackupHandler', { opts, uuid: draft.uuid });
    await draftRepo.save(draft);
  };

  return {
    confirmCancel,
    restoreBackup,
  };
}
