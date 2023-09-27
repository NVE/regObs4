import { Component, HostListener, Injector } from '@angular/core';
import { isPlatform, Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { UserSettingService } from './core/services/user-setting/user-setting.service';
import { DataMarshallService } from './core/services/data-marshall/data-marshall.service';
import { OfflineImageService } from './core/services/offline-image/offline-image.service';
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

const DEBUG_TAG = 'AppComponent';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  swipeBackEnabled$: Observable<boolean>;
  isDesktop: boolean;

  private filterMenuOpened = new Subject<boolean>();
  filterMenuOpened$ = this.filterMenuOpened.asObservable();

  constructor(
    private platform: Platform,
    private userSettings: UserSettingService,
    private dataMarshallService: DataMarshallService,
    private offlineImageService: OfflineImageService,
    private swipeBackService: SwipeBackService,
    private loggingService: LoggingService,
    private dbHelperService: DbHelperService,
    private shortcutService: ShortcutService,
    private fileLoggingService: FileLoggingService,
    private auth: AuthService,
    private draftToRegService: DraftToRegistrationService,
    private breakpointService: BreakpointService,
    private injector: Injector
  ) {
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
  private onResize(event) {
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
  }

  private initServices(userSettings: UserSetting): Promise<unknown>[] {
    return [
      this.dbHelperService.init(),
      this.loggingService.configureLogging(userSettings.appMode),
      this.shortcutService.init(),
      this.auth.init(),
      this.dataMarshallService.init(),
      this.draftToRegService.createSubscriptions(),
      this.initSqliteIfNative(),
    ];
  }
}
