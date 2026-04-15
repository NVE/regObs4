import { Component, computed, inject, input, model, viewChild } from '@angular/core';
import { NveSelectComponent } from '../designsystem/nve-select.component';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { KdvKey } from 'src/app/modules/common-registration/registration.models';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormValueControl } from '@angular/forms/signals';

/**
 * Select komponent med KDV-verdier
 *
 * implementerer deler av FormValueControl for å fjøre det enkelt å bruke signal forms.
 */
@Component({
  selector: 'app-kdv-nve-select',
  imports: [NveSelectComponent],
  template: `<app-nve-select
    [label]="label()"
    [options]="options()"
    [value]="selectValue()"
    (valueChange)="updateModel($event)"
  ></app-nve-select>`,
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class KdvNveSelectComponent implements FormValueControl<number | null> {
  private kdvService = inject(KdvService);

  readonly label = input.required<string>();
  readonly kdvKey = input.required<KdvKey>();
  readonly value = model<number | null>(null);
  readonly disabled = input(false);
  readonly required = input(false);
  readonly clearable = input(true);

  readonly selectValue = computed(() => this.value()?.toString() || '');
  private readonly selectElement = viewChild.required(NveSelectComponent);

  private kdvResource = rxResource({
    params: () => this.kdvKey(),
    stream: ({ params }) => this.kdvService.getKdvRepositoryByKeyObservable(params),
  });

  readonly options = computed(() => {
    const kdvs = this.kdvResource.value() || [];
    return kdvs.map((kdv) => ({ value: kdv.Id.toString(), label: kdv.Name ?? kdv.Id.toString() }));
  });

  focus(): void {
    this.selectElement().focus();
  }

  updateModel(value: string) {
    if (!value) {
      this.value.set(null);
      return;
    }

    try {
      this.value.set(Number.parseInt(value));
    } catch (error) {
      this.value.set(null);
    }
  }
}
