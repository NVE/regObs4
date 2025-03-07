import { Component, OnInit, Renderer2, inject, viewChild, input, computed } from '@angular/core';
import {
  DomController,
  IonBadge,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonRow,
} from '@ionic/angular/standalone';
import { WarningGroup } from '../../core/services/warning/warning-group.model';
import { ExternalLinkService } from '../../core/services/external-link/external-link.service';
import { GeoHazard, LangKey } from 'src/app/modules/common-core/models';
import { settings } from '../../../settings';
import moment from 'moment';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { WarningGroupFavouriteToggleComponent } from '../warning-group-favourite-toggle/warning-group-favourite-toggle.component';
import { AnalyticService } from '../../modules/analytics/services/analytic.service';
import { AppEventCategory } from '../../modules/analytics/enums/app-event-category.enum';
import { AppEventAction } from '../../modules/analytics/enums/app-event-action.enum';
import { from, of, Subject, timer } from 'rxjs';
import { map, catchError, takeUntil, switchMap } from 'rxjs/operators';
import { NgDestoryBase } from '../../core/helpers/observable-helper';
import { GeoIconComponent } from '../../modules/shared/components/geo-icon/geo-icon.component';
import { addIcons } from 'ionicons';
import { alert } from 'ionicons/icons';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-warning-list-item',
  templateUrl: './warning-list-item.component.html',
  styleUrls: ['./warning-list-item.component.scss'],
  imports: [
    GeoIconComponent,
    IonBadge,
    IonCol,
    IonGrid,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonRow,
    WarningGroupFavouriteToggleComponent,
  ],
})
export class WarningListItemComponent extends NgDestoryBase implements OnInit {
  private externalLinkService = inject(ExternalLinkService);
  private userSettingService = inject(UserSettingService);
  private domCtrl = inject(DomController);
  private analyticService = inject(AnalyticService);
  private renderer = inject(Renderer2);

  readonly warningGroup = input.required<WarningGroup>();
  readonly isIceGeoHazard = computed(() => this.warningGroup().key.geoHazard === GeoHazard.Ice);

  readonly itemSlide = viewChild.required(IonItemSliding);
  readonly favouriteToggle = viewChild(WarningGroupFavouriteToggleComponent);
  private dragSubject = new Subject<void>();
  language = toSignal(this.userSettingService.language$);

  constructor() {
    super();
    addIcons({ alert });
  }

  ngOnInit() {
    this.dragSubject
      .pipe(
        takeUntil(this.ngDestroy$),
        switchMap(() => this.getOpenAmount())
      )
      .subscribe((openAmount) => {
        const opacity = openAmount > 1 ? 1 : openAmount > 0 ? openAmount : 0;
        const color = `rgba(186,196,204,${opacity})`;
        this.favouriteToggle()?.setOpen(opacity);
        this.domCtrl.write(() => {
          this.renderer.setStyle((<any>this.itemSlide()).el, 'background-color', color);
        });
      });
    this.ngDestroy$.subscribe(() => {
      this.close();
    });
  }

  close() {
    this.itemSlide().close();
  }

  onDrag() {
    this.dragSubject.next();
  }

  private getOpenAmount() {
    return from(this.itemSlide().getOpenAmount()).pipe(
      catchError(() => of(0)),
      map((val) => (val > 0 ? val / 100.0 : 0))
    );
  }

  toggleFavourite() {
    this.favouriteToggle()?.toggle();
    timer(2000)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(() => {
        this.close();
      });
  }

  itemSwiped() {
    this.toggleFavourite();
  }

  getUrl(group: WarningGroup, day?: number): string | null {
    let dateString = '';
    if (day !== undefined) {
      dateString = moment().startOf('day').add(day, 'days').format(settings.services.warning.dateFormat);
    }
    const supportedLang = this.getSupportedLangOrFallbackToEn(this.language());
    const url: string = settings.services.warning[GeoHazard[group.key.geoHazard]].webUrl[LangKey[supportedLang]];
    if (url) {
      return encodeURI(
        url
          .replace('{regionName}', group.key.groupName)
          .replace('{regionId}', group.key.groupId)
          .replace('{day}', dateString)
      );
    } else {
      return null;
    }
  }

  getSupportedLangOrFallbackToEn(lang?: LangKey) {
    if (lang === LangKey.nb || lang === LangKey.nn) {
      return LangKey.nb;
    }
    return LangKey.en;
  }

  trackAnalytics(group: WarningGroup) {
    this.analyticService.trackEvent(AppEventCategory.Warnings, AppEventAction.Click, group.getKeyAsString());
  }
}
