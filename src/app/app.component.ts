import { Component, HostListener, Injector, inject } from '@angular/core';
import { IonApp, IonMenu, IonRouterOutlet, Platform, isPlatform } from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';
import { UserSettingService } from './core/services/user-setting/user-setting.service';
import { DataMarshallService } from './core/services/data-marshall/data-marshall.service';
import { SwipeBackService } from './core/services/swipe-back/swipe-back.service';
import { Observable, Subject, firstValueFrom } from 'rxjs';
import { LoggingService } from './modules/shared/services/logging/logging.service';
import { DbHelperService } from './core/services/db-helper/db-helper.service';
import { ShortcutService } from './core/services/shortcut/shortcut.service';
import { UserSetting } from './core/models/user-settings.model';
import { FileLoggingService } from './modules/shared/services/logging/file-logging.service';
import { AuthService } from 'ionic-appauth';
import { DraftToRegistrationService } from './core/services/draft/draft-to-registration.service';
import { BreakpointService } from './core/services/breakpoint.service';
import { Keyboard } from '@capacitor/keyboard';
import { SqliteService } from './core/services/sqlite/sqlite.service';
import { SideMenuComponent } from './modules/side-menu/components/side-menu.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { FilterMenuComponent } from './modules/side-menu/components/filter-menu/filter-menu.component';
import { GpsDebugComponent } from './modules/gps-debug/components/gps-debug/gps-debug.component';

const DEBUG_TAG = 'AppComponent';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    AsyncPipe,
    FilterMenuComponent,
    GpsDebugComponent,
    IonApp,
    IonMenu,
    IonRouterOutlet,
    NgIf,
    SideMenuComponent,
  ],
})
export class AppComponent {
  private platform = inject(Platform);
  private userSettings = inject(UserSettingService);
  private dataMarshallService = inject(DataMarshallService);
  // private offlineImageService = inject(OfflineImageService);
  private swipeBackService = inject(SwipeBackService);
  private loggingService = inject(LoggingService);
  private dbHelperService = inject(DbHelperService);
  private shortcutService = inject(ShortcutService);
  private fileLoggingService = inject(FileLoggingService);
  private auth = inject(AuthService);
  private draftToRegService = inject(DraftToRegistrationService);
  private breakpointService = inject(BreakpointService);
  private injector = inject(Injector);

  swipeBackEnabled$: Observable<boolean>;
  isDesktop?: boolean;

  private filterMenuOpened = new Subject<boolean>();
  filterMenuOpened$ = this.filterMenuOpened.asObservable();

  constructor() {
    this.swipeBackEnabled$ = this.swipeBackService.swipeBackEnabled$;
    this.initializeApp();
    this.breakpointService.isDesktopView().subscribe((isDesktop) => {
      this.isDesktop = isDesktop;
    });
  }

  private async initializeApp(): Promise<void> {
    await this.platform.ready();

    // Set up file logging first if native app
    await this.fileLoggingService.init({});

    if (this.platform.is('ios')) {
      Keyboard.setAccessoryBarVisible({ isVisible: true });
    }

    const userSettings = await firstValueFrom(this.userSettings.userSetting$);
    const result = await Promise.allSettled(this.initServices(userSettings));
    this.logIfError(result);

    this.breakpointService.onResize(this.platform.width());

    this.afterAppInitialized();
  }

  filterMenuWillOpen() {
    this.filterMenuOpened.next(true);
  }

  private afterAppInitialized() {
    SplashScreen.hide();
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event: any) {
    this.breakpointService.onResize(event.target.innerWidth);
  }

  private async logIfError(results: PromiseSettledResult<unknown>[]) {
    for (const result of results) {
      if (result.status === 'rejected') {
        this.loggingService.error(result.reason, DEBUG_TAG, 'Failed in app.component initServices');
      }
    }
  }

  private initSqliteIfNative() {
    if (isPlatform('hybrid')) {
      const sqliteService = this.injector.get<SqliteService>(SqliteService);
      return sqliteService.init();
    }
    return Promise.resolve();
  }

  private initServices(userSettings: UserSetting): Promise<unknown>[] {
    const nonPromiseServices = [
      () => this.shortcutService.init(),
      () => this.loggingService.configureLogging(userSettings.appMode),
      () => this.dataMarshallService.init(),
      () => this.draftToRegService.createSubscriptions(),
    ];

    for (const initFunc of nonPromiseServices) {
      try {
        initFunc();
      } catch (error) {
        this.loggingService.error(error, DEBUG_TAG, 'Failed in app.component initServices');
      }
    }

    return [this.dbHelperService.init(), this.auth.init(), this.initSqliteIfNative()];
  }
}
