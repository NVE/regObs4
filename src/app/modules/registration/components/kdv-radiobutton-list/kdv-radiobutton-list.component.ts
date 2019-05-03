import { Component, OnInit, Input, Output, EventEmitter, NgZone, OnDestroy } from '@angular/core';
import { KdvService } from '../../../../core/services/kdv/kdv.service';
import { KdvElement } from '../../../regobs-api/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-kdv-radiobutton-list',
  templateUrl: './kdv-radiobutton-list.component.html',
  styleUrls: ['./kdv-radiobutton-list.component.scss']
})
export class KdvRadiobuttonListComponent implements OnInit, OnDestroy {

  @Input() title: string;
  @Input() kdvKey: string;
  @Input() value: number;
  @Input() useDescription: boolean;
  @Input() showZeroValues = false;
  @Output() valueChange = new EventEmitter();

  kdvelements: KdvElement[];

  private subscription: Subscription;

  constructor(
    private kdvService: KdvService,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.subscription = this.kdvService.getKdvRepositoryByKeyObservable(this.kdvKey).subscribe((val) => {
      this.ngZone.run(() => {
        this.kdvelements = val;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onChange() {
    this.ngZone.run(() => {
      this.valueChange.emit(this.value);
    });
  }

  setSelected(value: number) {
    this.ngZone.run(() => {
      this.value = value;
      this.valueChange.emit(this.value);
    });
  }

  isVisible(item: KdvElement) {
    if (this.showZeroValues) {
      return true;
    } else {
      return item.Id % 100 !== 0;
    }
  }
}
