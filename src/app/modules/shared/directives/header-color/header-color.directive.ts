import { Directive, inject, computed } from '@angular/core';
import { AppMode } from 'src/app/modules/common-core/models';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { toSignal } from '@angular/core/rxjs-interop';

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
    switch (this.appMode()) {
      case AppMode.Demo:
        return 'danger';
      case AppMode.Test:
        return 'success';
    }
    return 'primary';
  });
}
