import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { enterZone } from 'src/app/core/helpers/observable-helper';
import { KdvKey } from 'src/app/modules/common-registration/registration.models';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { KdvElement } from 'src/app/modules/common-regobs-api';

@Component({
  selector: 'app-kdv-icon-select',
  templateUrl: './kdv-icon-select.component.html',
  styleUrls: ['./kdv-icon-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KdvIconSelectComponent {
  @Input() title: string;
  @Input() kdvKey: KdvKey;
  @Input() values: number[];
  // @Input() availableKdvElements: KdvElement[];
  // @Input() selectedKdvElements: KdvElement[];
  @Input() multiSelect = false;
  @Output() valueChange = new EventEmitter<KdvElement[]>();

  kdvElements$: Observable<KdvElement[]>;

  constructor(private kdvService: KdvService, private ngZone: NgZone) {}

  ngOnInit() {
    this.kdvElements$ = this.kdvService
      .getKdvRepositoryByKeyObservable(this.kdvKey)
      .pipe(enterZone(this.ngZone));
  }

  getImageSrc(element: KdvElement): string {
    return `/assets/icon/kdvElement/${this.kdvKey}/${element.Id}.svg`;
  }

}