import { Component, inject, input, model, computed, Signal } from '@angular/core';
import {
  ActionSheetController,
  IonIcon,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText,
  IonItem,
} from '@ionic/angular/standalone';
import { ActionSheetButton, PopoverOptions, SelectCustomEvent } from '@ionic/core';
import { SelectOption } from './select-option.model';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Platform } from '@ionic/angular/standalone';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { caretDownSharp, chevronExpand } from 'ionicons/icons';

const TRANSLATION_KEY_CANCEL = 'DIALOGS.CANCEL';
const TRANSLATION_KEY_RESET = 'DIALOGS.RESET';
const CSS_RESET_CLASS = 'app-select-with-reset';

/**
 * En wrapper rundt ion-select eller ion-action-sheet avhengig av mobil / desktop.
 * Inneholder en ion-item og SKAL derfor bruker i en ion-list.
 */
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  imports: [IonItem, FormsModule, IonIcon, IonSelect, IonSelectOption, IonText, TranslatePipe, IonLabel, UpperCasePipe],
})
export class SelectComponent {
  private actionSheetController = inject(ActionSheetController);
  private translateService = inject(TranslateService);
  private platform = inject(Platform);

  readonly label = input<string>('');
  readonly subTitle = input<string>();
  readonly selectedValue = model<SelectOption['id']>();
  readonly options = input<Array<SelectOption>>([]);
  readonly showReset = input(true);
  readonly disabled = input(false);
  readonly color = input<undefined | string>(undefined);
  readonly lines = input<'full' | 'inset' | 'none' | undefined>();

  selectIcon = this.platform.is('ios') ? 'chevron-expand' : 'caret-down-sharp';
  useActionSheet = computed(() => {
    if (this.platform.is('mobileweb') || this.platform.is('hybrid')) {
      return true;
    }

    // Hvis en eller flere options har ikon, bruk action sheet
    return this.options().some((x) => !!x.icon);
  });

  filteredOptions = computed(() => this.options().filter((x) => !x.disabled));

  private selectedOption = computed(() => (this.options() || []).find((x) => x.id === this.selectedValue()));
  valueText = computed(() => this.selectedOption()?.text || '');
  valueIcon = computed(() => this.selectedOption()?.icon);
  resetEnabled = computed(() => this.showReset() && this.selectedValue() != null);
  readonly resetValue = 'RESET';

  popoverOptions: Signal<Partial<PopoverOptions>> = computed(() => {
    if (this.resetEnabled()) {
      return { cssClass: CSS_RESET_CLASS, size: 'auto' };
    }
    return { size: 'auto' };
  });

  constructor() {
    addIcons({ caretDownSharp, chevronExpand });
  }

  private getActionSheetButtons() {
    const buttons: ActionSheetButton[] = [];

    // Reset button
    if (this.resetEnabled()) {
      buttons.push({
        text: this.translateService.instant(TRANSLATION_KEY_RESET),
        handler: () => this.reset(),
        role: 'destructive',
      });
    }

    // Options
    for (const option of this.filteredOptions()) {
      buttons.push({
        text: this.translateService.instant(option.text),
        icon: option.icon,
        role: option.id === this.selectedValue() ? 'selected' : undefined,
        handler: () => this.selectedValue.set(option.id),
      });
    }

    // Cancel button
    buttons.push({
      text: this.translateService.instant(TRANSLATION_KEY_CANCEL),
      role: 'cancel',
    });

    return buttons;
  }

  private getTitleTranslations() {
    let titleTextTranslated: string | undefined;
    const label = this.label();
    if (label) {
      titleTextTranslated = this.translateService.instant(label);
    }
    let subTitleTextTranslated: string | undefined;
    const subTitle = this.subTitle();
    if (subTitle) {
      subTitleTextTranslated = this.translateService.instant(subTitle);
    }

    return {
      titleTextTranslated,
      subTitleTextTranslated,
    };
  }

  async openActionSheet() {
    const cssClass = ['action-sheet-white-bg'];
    if (this.resetEnabled()) {
      cssClass.push(CSS_RESET_CLASS);
    }

    if (!this.disabled()) {
      const translations = this.getTitleTranslations();
      const buttons = this.getActionSheetButtons();
      const actionSheet = await this.actionSheetController.create({
        header: translations.titleTextTranslated,
        subHeader: translations.subTitleTextTranslated,
        buttons,
        cssClass,
      });
      await actionSheet.present();
    }
  }

  private reset() {
    this.selectedValue.set(undefined);
  }

  savePopoverSelectValue(event: SelectCustomEvent<string>) {
    if (event.detail.value === this.resetValue) {
      this.reset();
    } else {
      this.selectedValue.set(event.detail.value);
    }
  }
}
