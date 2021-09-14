import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IRegistration, SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { RegistrationService } from 'src/app/modules/registration/services/registration.service';

@Component({
  selector: 'app-draft-list',
  templateUrl: './draft-list.component.html',
  styleUrls: ['./draft-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraftListComponent implements OnInit {
  @Output() isEmpty = new EventEmitter<boolean>();
  registrations$: Observable<IRegistration[]>;
  private ngDestroy$: Subject<void>;

  constructor(private registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.ngDestroy$ = new Subject();
    this.registrations$ = this.createRegistration$();
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private createRegistration$(): Observable<IRegistration[]> {
    return this.registrationService.registrations$.pipe(
      map((regs) => regs.filter((reg) => reg.syncStatus === SyncStatus.Draft || reg.syncStatus === SyncStatus.Sync)),
      tap((regs) => this.isEmpty.emit(regs.length === 0))
    );
  }

  trackByIdFunc(_: unknown, obs: IRegistration): string {
    return obs ? obs.id : undefined;
  }
}
