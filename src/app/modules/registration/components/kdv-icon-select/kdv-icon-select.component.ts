import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { enterZone } from 'src/app/core/helpers/observable-helper';
import { KdvKey } from 'src/app/modules/common-registration/registration.models';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { KdvElement } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'KdvIconSelectComponent';

/**
 * Use this to choose a KDV element, for example snow surface.
 * Shows a horizontal scroll with icons for all KDV elements. Click on an icon to select or deselect.
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
   * If multiselect is set, the value field will be handled as an array.
   */
  @Input() value: number|number[];
  @Input() multiSelect = false;
  @Output() valueChange = new EventEmitter();

  kdvElements$: Observable<KdvElement[]>;

  constructor(private kdvService: KdvService, private ngZone: NgZone, private logger: LoggingService) {}

  ngOnInit() {
    this.kdvElements$ = this.kdvService
      .getKdvRepositoryByKeyObservable(this.kdvKey)
      .pipe(enterZone(this.ngZone));
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
    this.valueChange.emit();
  }

}