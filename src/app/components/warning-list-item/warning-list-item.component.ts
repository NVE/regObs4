import { Component, OnInit, Input, ViewChild, Renderer2 } from '@angular/core';
import { IonItemSliding, DomController } from '@ionic/angular';
import { WarningGroup } from '../../core/services/warning/warning-group.model';
import { ExternalLinkService } from '../../core/services/external-link/external-link.service';
import { GeoHazard, LangKey } from '@varsom-regobs-common/core';
import { settings } from '../../../settings';
import moment from 'moment';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { WarningGroupFavouriteToggleComponent } from '../warning-group-favourite-toggle/warning-group-favourite-toggle.component';
import { AnalyticService } from '../../modules/analytics/services/analytic.service';
import { AppEventCategory } from '../../modules/analytics/enums/app-event-category.enum';
import { AppEventAction } from '../../modules/analytics/enums/app-event-action.enum';
import { from, of, Subject, timer } from 'rxjs';
import { map, catchError, takeUntil, switchMap, take } from 'rxjs/operators';
import { NgDestoryBase } from '../../core/helpers/observable-helper';

@Component({
  selector: 'app-warning-list-item',
  templateUrl: './warning-list-item.component.html',
  styleUrls: ['./warning-list-item.component.scss']
})
export class WarningListItemComponent extends NgDestoryBase implements OnInit {
  @Input() warningGroup: WarningGroup;
  GeoHazard = GeoHazard;

  @ViewChild(IonItemSliding, { static: true }) itemSlide: IonItemSliding;
  @ViewChild(WarningGroupFavouriteToggleComponent, { static: true })
  favouriteToggle: WarningGroupFavouriteToggleComponent;
  private dragSubject = new Subject<void>();

  constructor(
    private externalLinkService: ExternalLinkService,
    private userSettingService: UserSettingService,
    private domCtrl: DomController,
    private analyticService: AnalyticService,
    private renderer: Renderer2
  ) {
    super();
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
        this.favouriteToggle.setOpen(opacity);
        this.domCtrl.write(() => {
          this.renderer.setStyle(
            (<any>this.itemSlide).el,
            'background-color',
            color
          );
        });
      });
    this.ngDestroy$.subscribe(() => {
      this.close();
    });
  }

  close() {
    if (this.itemSlide) {
      this.itemSlide.close();
    }
  }

  onDrag() {
    this.dragSubject.next();
  }

  private getOpenAmount() {
    return from(this.itemSlide.getOpenAmount()).pipe(
      catchError(() => of(0)),
      map((val) => (val > 0 ? val / 100.0 : 0))
    );
  }

  toggleFavourite() {
    this.favouriteToggle.toggle();
    timer(2000)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(() => {
        if (this.itemSlide) {
          this.itemSlide.close();
        }
      });
  }

  itemSwiped() {
    this.toggleFavourite();
  }

  async getUrl(group: WarningGroup, day = ''): Promise<string> {
    if (group.url) {
      return group.url;
    } else {
      const currentLang = await this.userSettingService.language$
        .pipe(take(1))
        .toPromise();
      const supportedLang = this.getSupportedLangOrFallbackToEn(currentLang);
      const url: string =
        settings.services.warning[GeoHazard[group.key.geoHazard]].webUrl[
          LangKey[supportedLang]
        ];
      if (url) {
        return encodeURI(
          url
            .replace('{regionName}', group.key.groupName)
            .replace('{regionId}', group.key.groupId)
            .replace('{day}', day)
        );
      } else {
        return null;
      }
    }
  }

  getSupportedLangOrFallbackToEn(lang: LangKey) {
    if (lang === LangKey.nb || lang === LangKey.nn) {
      return LangKey.nb;
    }
    return LangKey.en;
  }

  async navigateToWeb(event: Event, group: WarningGroup) {
    event.preventDefault();
    const url = await this.getUrl(group);
    if (url) {
      this.analyticService.trackEvent(
        AppEventCategory.Warnings,
        AppEventAction.Click,
        group.getKeyAsString()
      );
      this.externalLinkService.openExternalLink(url);
    }
  }

  async navigateToWebByDay(event: Event, group: WarningGroup, day: number) {
    event.preventDefault();
    const dateString = moment()
      .startOf('day')
      .add(day, 'days')
      .format(settings.services.warning.dateFormat);
    const url = await this.getUrl(group, dateString);
    if (url) {
      this.analyticService.trackEvent(
        AppEventCategory.Warnings,
        AppEventAction.Click,
        group.getKeyAsString()
      );
      this.externalLinkService.openExternalLink(url);
    }
  }
}
