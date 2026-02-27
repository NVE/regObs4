import { Directive, inject, computed } from '@angular/core';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { getHeaderThemeColor } from 'src/app/utils/color-utils';

/**
 * Directive som kan brukes på ion-header for å sette farge etter miljø (prod, demo, test)
 */
@Directive({
  selector: '[appHeaderColor]',
  host: {
    '[attr.color]': 'color()', // Setter color attributt på ion-header
  },
})
export class HeaderColorDirective {
  private userSettingService = inject(UserSettingService);

  private appMode = toSignal(this.userSettingService.appMode$);
  color = computed(() => {
    return getHeaderThemeColor(this.appMode());
  });
}
