import { IonItem, IonButton, IonLabel } from '@ionic/angular/standalone';
import { ChangeDetectionStrategy, Component, NgZone, inject, input, model, effect } from '@angular/core';
import { map, Observable } from 'rxjs';
import { enterZone } from 'src/app/core/helpers/observable-helper';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { LangKey } from 'src/app/modules/common-core/models';
import { KdvKey } from 'src/app/modules/common-registration/registration.models';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { KdvElement } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { TranslatePipe } from '@ngx-translate/core';

const DEBUG_TAG = 'KdvIconSelectComponent';

/**
 * Use this to choose a KDV element, for example snow surface.
 * Shows a horizontal scroll with icons for all KDV elements. Click on an icon to select or deselect.
 * Expects to find one icon for each KDV element in /assets/icon/kdvElement/<kdvKey>/<KDV element ID>.svg`
 */
@Component({
  selector: 'app-kdv-icon-select',
  templateUrl: './kdv-icon-select.component.html',
  styleUrls: ['./kdv-icon-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, IonButton, IonItem, IonLabel, NgClass, NgFor, NgIf, SvgIconComponent, TranslatePipe],
})
export class KdvIconSelectComponent<T extends number | number[]> {
  private userSettings = inject(UserSettingService);
  private kdvService = inject(KdvService);
  private ngZone = inject(NgZone);
  private logger = inject(LoggingService);

  readonly label = input<string>();
  readonly kdvKey = input.required<KdvKey>();

  readonly multiSelect = input(false);

  /**
   * Bind this to the field where you want to save the selection.
   * It is the ID of the KDV element that will be stored.
   * If multiselect is set, the value field will be treated as an array.
   */
  readonly value = model<T>();
  readonly showZeroValues = input(false);

  /**
   * You may control which KDV element IDs to show with this function
   */
  readonly filter = input<(v: number) => boolean>();

  kdvElements$?: Observable<KdvElement[]>;
  lang$?: Observable<string>;

  constructor() {
    effect(() => {
      this.logger.debug(`Value change for kdv-icon-select`, DEBUG_TAG, { kdvKey: this.kdvKey(), value: this.value() });
    });
  }

  ngOnInit() {
    this.lang$ = this.userSettings.language$.pipe(map((langKey) => LangKey[langKey]));
    this.kdvElements$ = this.kdvService.getKdvRepositoryByKeyObservable(this.kdvKey()).pipe(
      map((elements) => elements.filter((element) => this.isVisible(element))),
      enterZone(this.ngZone)
    );
  }

  private isVisible(item: KdvElement): boolean {
    const filter = this.filter();
    if (filter !== undefined && !filter(item.Id)) {
      return false;
    }
    if (!this.showZeroValues()) {
      return item.Id % 100 !== 0;
    }
    return true;
  }

  getImageSrc(element: KdvElement): string {
    return `/assets/icon/kdvElement/${this.kdvKey()}/${element.Id}.svg`;
  }

  isSelected(element: KdvElement): boolean {
    const value = this.value();
    if (value == null) {
      return false;
    }
    if (Array.isArray(value)) {
      return value.includes(element.Id);
    }
    return value === element.Id;
  }

  /**
   * Select or deselect given element
   */
  onClick(element: KdvElement): void {
    this.value.update((values) => {
      const isSelected = this.isSelected(element);
      const isMultiSelect = this.multiSelect();

      if (isMultiSelect) {
        const oldValues = Array.isArray(values) ? values : typeof values === 'number' ? [values] : [];
        if (isSelected) {
          return oldValues.filter((v) => v !== element.Id) as T; // remove this element
        } else {
          return [element.Id, ...oldValues] as T; // add element to selection
        }
      } else {
        // Single select
        if (isSelected) {
          return undefined; // deselect if it was selected earlier
        } else {
          return element.Id as T;
        }
      }
    });
  }

  count(): number {
    const value = this.value();
    if (Array.isArray(value)) {
      return value.length;
    }
    if (typeof value === 'number') {
      return 1;
    }
    return 0;
  }

  clear(): void {
    this.value.set((this.multiSelect() ? [] : undefined) as T | undefined);
  }
}
