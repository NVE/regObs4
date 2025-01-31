import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { Component, ChangeDetectionStrategy, inject, input, model, computed, Signal } from '@angular/core';
import { KdvElement } from 'src/app/modules/common-regobs-api/models';
import { SelectOption } from '../../modules/shared/components/input/select/select-option.model';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { KdvKey } from 'src/app/modules/common-registration/registration.models';
import { NgClass, NgIf, AsyncPipe } from '@angular/common';
import { SelectComponent } from '../../modules/shared/components/input/select/select.component';
import { TranslatePipe } from '@ngx-translate/core';
import { rxResource } from '@angular/core/rxjs-interop';

type FilterFunc = (value: number) => boolean;

@Component({
  selector: 'app-kdv-select',
  templateUrl: './kdv-select.component.html',
  styleUrls: ['./kdv-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, IonItem, IonLabel, NgClass, NgIf, SelectComponent, TranslatePipe],
})
export class KdvSelectComponent {
  private kdvService = inject(KdvService);

  readonly label = input.required<string>();
  readonly kdvKey = input.required<KdvKey>();
  readonly value = model<number>();
  readonly showZeroValues = input(false);
  readonly disabled = input(false);
  readonly labelColor = input('medium');
  readonly showResetButton = input(true);
  readonly useDescription = input<boolean>();
  readonly filter = input<FilterFunc>();
  readonly getIconFunc = input<(kdvElement: KdvElement) => string>();
  readonly obsLocMode = input(false);

  selectOptionsResource = rxResource({
    request: () => this.kdvKey(),
    loader: ({ request }) => this.kdvService.getKdvRepositoryByKeyObservable(request),
  });

  selectOptions: Signal<SelectOption[]> = computed(() => {
    const kdvs = this.selectOptionsResource.value() || [];
    const getIconFunc = this.getIconFunc();
    const useDesc = this.useDescription();
    const filterFunc = this.filter();
    const showZeros = this.showZeroValues();

    return kdvs.map((kdv) => ({
      id: kdv.Id,
      text: (useDesc ? kdv.Description : kdv.Name) || kdv.Id.toString(),
      disabled: !isVisible(kdv, filterFunc, showZeros),
      icon: getIconFunc ? getIconFunc(kdv) : undefined,
    }));
  });
}

function isVisible(item: KdvElement, filter: FilterFunc | undefined, showZeroValues: boolean) {
  if (filter != null && !filter(item.Id)) {
    return false;
  }
  if (!showZeroValues) {
    return item.Id % 100 !== 0;
  }
  return true;
}
