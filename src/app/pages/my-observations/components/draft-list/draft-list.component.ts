import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';

@Component({
  selector: 'app-draft-list',
  templateUrl: './draft-list.component.html',
  styleUrls: ['./draft-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraftListComponent implements OnInit {
  @Output() isEmpty = new EventEmitter<boolean>();
  private ngDestroy$: Subject<void>;

  public drafts$: Observable<RegistrationDraft[]>

  constructor(
    draftService: DraftRepositoryService,
  ) {
    this.drafts$ = draftService.drafts$;
  }

  ngOnInit(): void {
    this.ngDestroy$ = new Subject();

    this.drafts$.pipe(
      takeUntil(this.ngDestroy$),
      map((drafts) => drafts.length === 0),
      distinctUntilChanged(),
    ).subscribe((isEmpty) => {
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
