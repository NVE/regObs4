import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { map, Observable } from 'rxjs';
import { enterZone } from 'src/app/core/helpers/observable-helper';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { LangKey } from 'src/app/modules/common-core/models';
import { KdvKey } from 'src/app/modules/common-registration/registration.models';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { KdvElement } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KdvIconSelectComponent {
  @Input() title: string;
  @Input() kdvKey: KdvKey;

  /**
   * Bind this to the field where you want to save the selection.
   * It is the ID of the KDV element that will be stored.
   * If multiselect is set, the value field will be treated as an array.
   */
  @Input() value: number|number[];
  @Input() multiSelect = false;
  @Input() showZeroValues = false;

  /**
   * You may control which KDV element IDs to show with this function
   */
  @Input() filter: (number) => boolean;
  @Output() valueChange = new EventEmitter<number|number[]>();

  kdvElements$: Observable<KdvElement[]>;
  lang$: Observable<string>;

  constructor(
    private userSettings: UserSettingService,
    private kdvService: KdvService,
    private ngZone: NgZone,
    private logger: LoggingService
  ) {}

  ngOnInit() {
    this.lang$ = this.userSettings.language$
      .pipe(map(langKey => LangKey[langKey]));
    this.kdvElements$ = this.kdvService
      .getKdvRepositoryByKeyObservable(this.kdvKey)
      .pipe(
        map(elements => elements.filter(element => this.isVisible(element))),
        enterZone(this.ngZone)
      );
  }

  private isVisible(item: KdvElement): boolean {
    if (this.filter !== undefined && !this.filter(item.Id)) {
      return false;
    }
    if (!this.showZeroValues) {
      return item.Id % 100 !== 0;
    }
    return true;
  }

  getImageSrc(element: KdvElement): string {
    return `/assets/icon/kdvElement/${this.kdvKey}/${element.Id}.svg`;
  }

  isSelected(element: KdvElement): boolean {
    if (this.multiSelect) {
      const values = this.value as number[];
      return values.includes(element.Id);
    } else {
      return this.value == element.Id;
    }
  }

  /**
   * Select or deselect given element
   */
  onClick(element: KdvElement): void {
    if (this.multiSelect) {
      let values = this.value as number[]; //redefine value as array
      if (this.isSelected(element)) {
        //remove this element
        const index = values.indexOf(element.Id);
        if (index > -1) {
          values.splice(index, 1);
        }
      } else {
        values = [element.Id, ...values]; //add element to selection
      }
      this.value = values;
    } else { //single select
      if (this.isSelected(element)) {
        this.value = undefined; //deselect if it was selected earlier
      } else {
        this.value = element.Id;
      }
    }
    this.logger.debug(`Value change on ${this.kdvKey}: ${this.value}`, DEBUG_TAG);
    this.valueChange.emit(this.value);
  }

  count(): number {
    if (this.multiSelect) {
      const values = this.value as number[];
      return values.length;
    }
    if (this.value == null) {
      return 0;
    }
    return 1;
  }

  clear(): void {
    if (this.multiSelect) {
      this.value = [];
    } else {
      this.value = null;
    }
    this.valueChange.emit(this.value);
  }
}