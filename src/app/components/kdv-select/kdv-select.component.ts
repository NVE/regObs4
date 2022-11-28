import { Component, OnInit, Input, Output, EventEmitter, NgZone, OnDestroy } from '@angular/core';
import { KdvElement } from 'src/app/modules/common-regobs-api/models';
import { Subscription } from 'rxjs';
import { SelectOption } from '../../modules/shared/components/input/select/select-option.model';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { KdvKey } from 'src/app/modules/common-registration/registration.models';

@Component({
  selector: 'app-kdv-select',
  templateUrl: './kdv-select.component.html',
  styleUrls: ['./kdv-select.component.scss'],
})
export class KdvSelectComponent implements OnInit, OnDestroy {
  @Input() title: string;
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
  private kdvelements: KdvElement[] = [];

  private subscription: Subscription;

  get selectOptions(): SelectOption[] {
    return this.kdvelements.map((el) => ({
      id: el.Id,
      text: this.useDescription ? el.Description : el.Name,
      disabled: !this.isVisible(el),
      icon: this.getIconFunc ? this.getIconFunc(el) : undefined,
    }));
  }

  constructor(private kdvService: KdvService, private ngZone: NgZone) {}

  ngOnInit() {
    this.subscription = this.kdvService.getKdvRepositoryByKeyObservable(this.kdvKey).subscribe((kdvelements) => {
      this.ngZone.run(() => {
        this.kdvelements = kdvelements;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  isVisible(item: KdvElement) {
    if (this.filter !== undefined && !this.filter(item.Id)) {
      return false;
    }
    if (!this.showZeroValues) {
      return item.Id % 100 !== 0;
    }
    return true;
  }
}
