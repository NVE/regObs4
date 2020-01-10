import { Component, OnInit, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { KdvService } from '../../../../core/services/kdv/kdv.service';
import { KdvElement } from '../../../regobs-api/models';
import { Subscription, Observable } from 'rxjs';
import { enterZone } from '../../../../core/helpers/observable-helper';

@Component({
  selector: 'app-kdv-radiobutton-list',
  templateUrl: './kdv-radiobutton-list.component.html',
  styleUrls: ['./kdv-radiobutton-list.component.scss'],
})
export class KdvRadiobuttonListComponent implements OnInit {
  @Input() title: string;
  @Input() kdvKey: string;
  @Input() value: number;
  @Input() useDescription: boolean;
  @Input() showZeroValues = false;
  @Output() valueChange = new EventEmitter();

  kdvelements$: Observable<KdvElement[]>;

  constructor(
    private kdvService: KdvService,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.kdvelements$ = this.kdvService.getKdvRepositoryByKeyObservable(this.kdvKey).pipe(enterZone(this.ngZone));
  }

  onChange(value: number) {
    this.valueChange.emit(value);
  }

  isVisible(item: KdvElement) {
    if (this.showZeroValues) {
      return true;
    } else {
      return item.Id % 100 !== 0;
    }
  }
}
