import { Directive, inject, computed } from '@angular/core';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { getHeaderThemeColor } from 'src/app/utils/color-utils';

@Directive({
  selector: '[appHeaderColor]',
  host: {
    '[color]': 'color()',
  },
})
export class HeaderColorDirective {
  private userSettingService = inject(UserSettingService);

  private appMode = toSignal(this.userSettingService.appMode$);
  color = computed(() => {
    return getHeaderThemeColor(this.appMode());
  });
}
