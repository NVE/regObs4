import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api/models';
import { PopupInfoService } from '../../core/services/popup-info/popup-info.service';
import { NgDestoryBase } from '../../core/helpers/observable-helper';
import { takeUntil, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EditMode } from 'src/app/modules/registration/edit-registration-helper-functions';
import { SearchService } from 'src/app/modules/common-regobs-api';

@Component({
  selector: 'app-view-observation',
  templateUrl: './view-observation.page.html',
  styleUrls: ['./view-observation.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewObservationPage extends NgDestoryBase implements OnInit {
  editMode$: Observable<EditMode>;
  registrationViewModel$: Observable<RegistrationViewModel>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private popupInfoService: PopupInfoService,
    private searchService: SearchService
  ) {
    super();
  }

  ngOnInit() {
    this.popupInfoService.checkObservationInfoPopup().pipe(takeUntil(this.ngDestroy$)).subscribe();
    const regId = parseInt(this.activatedRoute.snapshot.params['id'], 10);
    this.registrationViewModel$ = this.searchService
      .SearchSearch({
        RegId: regId,
      })
      .pipe(map((result) => result[0]));
  }
}
