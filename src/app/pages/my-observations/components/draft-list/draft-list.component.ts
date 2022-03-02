import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { IRegistration, SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'DraftListComponent';

@Component({
  selector: 'app-draft-list',
  templateUrl: './draft-list.component.html',
  styleUrls: ['./draft-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraftListComponent implements OnInit {
  @Output() isEmpty = new EventEmitter<boolean>();
  // registrations$: Observable<IRegistration[]>;
  private ngDestroy$: Subject<void>;

  constructor(
    public draftService: DraftRepositoryService,
    private loggingService: LoggingService
  ) {}

  ngOnInit(): void {
    this.ngDestroy$ = new Subject();
    // this.registrations$ = this.createRegistration$();
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  // TODO: Remove if not needed, but do we need error handling?
  // private createRegistration$(): Observable<IRegistration[]> {
  //   return this.registrationService.registrations$.pipe(
  //     map((regs) => regs.filter((reg) => reg.syncStatus === SyncStatus.Draft || reg.syncStatus === SyncStatus.Sync)),
  //     tap((regs) => {
  //       regs.forEach(reg => {
  //         if (reg.syncError) {
  //           this.loggingService.debug(`Sync error '${reg.syncError}' on reg with ID '${reg.id}'`, DEBUG_TAG, reg);
  //         }
  //       });
  //     }),
  //     tap((regs) => this.isEmpty.emit(regs.length === 0))
  //   );
  // }

  trackByIdFunc(_: unknown, draft: RegistrationDraft): string {
    return draft.uuid;
  }
}
