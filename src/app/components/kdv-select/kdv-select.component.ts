import { Component, ChangeDetectionStrategy, inject, input, model, computed, Signal } from '@angular/core';
import { KdvElement } from 'src/app/modules/common-regobs-api/models';
import { SelectOption } from '../../modules/shared/components/input/select/select-option.model';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { KdvKey } from 'src/app/modules/common-registration/registration.models';
import { NgIf } from '@angular/common';
import { SelectComponent } from '../../modules/shared/components/input/select/select.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { IonItemOption, IonList } from '@ionic/angular/standalone';

type FilterFunc = (value: number) => boolean;

/**
 * Select med options fra KDV-tabell.
 * Inneholder en ion-item og SKAL derfor bruker i en ion-list.
 */
@Component({
  selector: 'app-kdv-select',
  templateUrl: './kdv-select.component.html',
  styleUrls: ['./kdv-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, SelectComponent],
})
export class KdvSelectComponent {
  private kdvService = inject(KdvService);

  readonly label = input.required<string>();
  readonly kdvKey = input.required<KdvKey>();
  readonly value = model<number>();
  readonly showZeroValues = input(false);
  readonly disabled = input(false);
  readonly showResetButton = input(true);
  readonly useDescription = input<boolean>();
  readonly filter = input<FilterFunc>();
  readonly getIconFunc = input<(kdvElement: KdvElement) => string>();

  /**
   * Videresendes til IonItem.
   *
   * Se https://ionicframework.com/docs/api/item#color
   */
  readonly ionItemColor = input<undefined | IonItemOption['color']>(undefined, { alias: 'color' });

  /**
   * Om IonItem som wrapper select komponent skal vise linjer, evt hva slags type linjer.
   *
   * Se https://ionicframework.com/docs/api/item#lines
   */
  readonly ionItemLines = input<undefined | IonList['lines']>(undefined, { alias: 'lines' });

  selectOptionsResource = rxResource({
    params: () => this.kdvKey(),
    stream: ({ params }) => this.kdvService.getKdvRepositoryByKeyObservable(params),
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
