import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api/models';
import { PopupInfoService } from '../../core/services/popup-info/popup-info.service';
import { NgDestoryBase } from '../../core/helpers/observable-helper';
import { takeUntil, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { EditMode } from 'src/app/modules/registration/edit-registration-helper-functions';
import { SearchService } from 'src/app/modules/common-regobs-api';
import { TranslateService } from '@ngx-translate/core';

interface RegistrationResult {
  reg?: RegistrationViewModel;
  err?: Error;
}

@Component({
  selector: 'app-view-observation',
  templateUrl: './view-observation.page.html',
  styleUrls: ['./view-observation.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewObservationPage extends NgDestoryBase implements OnInit {
  editMode$: Observable<EditMode>;
  registrationViewModel$: Observable<RegistrationResult>;

  lang: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private popupInfoService: PopupInfoService,
    private searchService: SearchService,
    translateService: TranslateService
  ) {
    super();
    this.lang = translateService.currentLang;
  }

  ngOnInit() {
    this.popupInfoService.checkObservationInfoPopup().pipe(takeUntil(this.ngDestroy$)).subscribe();
    const id = this.activatedRoute.snapshot.params['id'];
    const regId = parseInt(id, 10);

    if (isNaN(regId)) {
      this.registrationViewModel$ = of({ err: new Error(`Invalid registration id: "${id}"`) });
    } else {
      this.registrationViewModel$ = this.searchService
        .SearchSearch({
          RegId: regId,
        })
        .pipe(
          map((result) => ({ reg: result[0] })),
          catchError((err) => of({ err }))
        );
    }
  }
}
