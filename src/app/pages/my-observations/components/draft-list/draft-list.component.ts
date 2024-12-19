import { IonGrid, IonItemDivider, IonRow, IonList, IonLabel } from '@ionic/angular/standalone';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { SyncItemComponent } from '../sync-item/sync-item.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-draft-list',
  templateUrl: './draft-list.component.html',
  styleUrls: ['./draft-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    IonGrid,
    IonItemDivider,
    IonLabel,
    IonList,
    IonRow,
    NgFor,
    NgIf,
    SyncItemComponent,
    TranslatePipe,
  ],
})
export class DraftListComponent implements OnInit {
  @Output() isEmpty = new EventEmitter<boolean>();
  private ngDestroy$: Subject<void>;

  public drafts$: Observable<RegistrationDraft[]>;

  constructor() {
    const draftService = inject(DraftRepositoryService);

    this.drafts$ = draftService.drafts$;
  }

  ngOnInit(): void {
    this.ngDestroy$ = new Subject();

    this.drafts$
      .pipe(
        takeUntil(this.ngDestroy$),
        map((drafts) => drafts.length === 0),
        distinctUntilChanged()
      )
      .subscribe((isEmpty) => {
        this.isEmpty.emit(isEmpty);
      });
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  trackByIdFunc(_: unknown, draft: RegistrationDraft): string {
    return draft.uuid;
  }
}
