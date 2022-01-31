import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  NgZone,
  OnDestroy
} from '@angular/core';
import { KdvElement } from 'src/app/modules/common-regobs-api/models';
import { Subscription } from 'rxjs';
import { KdvService } from '../../../../core/services/kdv/kdv.service';
import { SelectOption } from '../../../shared/components/input/select/select-option.model';

@Component({
  selector: 'app-kdv-select',
  templateUrl: './kdv-select.component.html',
  styleUrls: ['./kdv-select.component.scss']
})
export class KdvSelectComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() kdvKey: string;
  @Input() value: number;
  @Output() valueChange = new EventEmitter();
  @Input() showZeroValues = false;
  @Input() disabled = false;
  @Input() labelColor = 'medium';
  @Input() showResetButton = true;
  @Input() useDescription: boolean;
  @Input() filter: (number) => boolean;
  @Input() getIconFunc: (kdvElement: KdvElement) => string;

  private kdvelements: KdvElement[] = [];

  private subscription: Subscription;

  get selectOptions(): SelectOption[] {
    return this.kdvelements.map((el) => ({
      id: el.Id,
      text: this.useDescription ? el.Description : el.Name,
      disabled: !this.isVisible(el),
      icon: this.getIconFunc ? this.getIconFunc(el) : undefined
    }));
  }

  constructor(private kdvService: KdvService, private ngZone: NgZone) {}

  ngOnInit() {
    this.subscription = this.kdvService
      .getKdvRepositoryByKeyObservable(this.kdvKey)
      .subscribe((kdvelements) => {
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
