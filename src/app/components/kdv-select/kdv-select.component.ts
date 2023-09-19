import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { KdvElement } from 'src/app/modules/common-regobs-api/models';
import { Observable, map } from 'rxjs';
import { SelectOption } from '../../modules/shared/components/input/select/select-option.model';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { KdvKey } from 'src/app/modules/common-registration/registration.models';

@Component({
  selector: 'app-kdv-select',
  templateUrl: './kdv-select.component.html',
  styleUrls: ['./kdv-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KdvSelectComponent implements OnInit {
  @Input() label: string;
  @Input() kdvKey: KdvKey;
  @Input() value: number;
  @Output() valueChange = new EventEmitter();
  @Input() showZeroValues = false;
  @Input() disabled = false;
  @Input() labelColor = 'medium';
  @Input() showResetButton = true;
  @Input() useDescription: boolean;
  @Input() filter: (number) => boolean;
  @Input() getIconFunc: (kdvElement: KdvElement) => string;
  @Input() obsLocMode = false;

  selectOptions$: Observable<SelectOption[]>;

  constructor(private kdvService: KdvService) {}

  ngOnInit() {
    this.selectOptions$ = this.kdvService.getKdvRepositoryByKeyObservable(this.kdvKey).pipe(
      map((kdvs) =>
        kdvs.map((kdv) => ({
          id: kdv.Id,
          text: this.useDescription ? kdv.Description : kdv.Name,
          disabled: !this.isVisible(kdv),
          icon: this.getIconFunc ? this.getIconFunc(kdv) : undefined,
        }))
      )
    );
  }

  private isVisible(item: KdvElement) {
    if (this.filter !== undefined && !this.filter(item.Id)) {
      return false;
    }
    if (!this.showZeroValues) {
      return item.Id % 100 !== 0;
    }
    return true;
  }
}
