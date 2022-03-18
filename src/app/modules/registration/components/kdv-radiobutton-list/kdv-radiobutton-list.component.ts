import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  NgZone
} from '@angular/core';
import { KdvElement } from 'src/app/modules/common-regobs-api/models';
import { Observable } from 'rxjs';
import { enterZone } from '../../../../core/helpers/observable-helper';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { KdvKey } from 'src/app/modules/common-registration/registration.models';

@Component({
  selector: 'app-kdv-radiobutton-list',
  templateUrl: './kdv-radiobutton-list.component.html',
  styleUrls: ['./kdv-radiobutton-list.component.scss']
})
export class KdvRadiobuttonListComponent implements OnInit {
  @Input() title: string;
  @Input() kdvKey: KdvKey;
  @Input() value: number;
  @Input() useDescription: boolean;
  @Input() showZeroValues = false;
  @Output() valueChange = new EventEmitter();

  kdvelements$: Observable<KdvElement[]>;

  constructor(private kdvService: KdvService, private ngZone: NgZone) {}

  ngOnInit() {
    this.kdvelements$ = this.kdvService
      .getKdvRepositoryByKeyObservable(this.kdvKey)
      .pipe(enterZone(this.ngZone));
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
