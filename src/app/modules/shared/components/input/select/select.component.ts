import { Component, inject, input, model, computed, Signal } from '@angular/core';
import {
  ActionSheetController,
  IonButton,
  IonIcon,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/angular/standalone';
import { ActionSheetButton, IonSelectCustomEvent, SelectChangeEventDetail } from '@ionic/core';
import { SelectOption } from './select-option.model';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Platform } from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { caretDownSharp, closeCircleOutline } from 'ionicons/icons';
import { Capacitor } from '@capacitor/core';

const TRANSLATION_KEY_CANCEL = 'DIALOGS.CANCEL';
const TRANSLATION_KEY_RESET = 'DIALOGS.RESET';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  imports: [FormsModule, IonButton, IonIcon, IonSelect, IonSelectOption, IonText, NgFor, NgIf, TranslatePipe, IonLabel],
})
export class SelectComponent {
  private actionSheetController = inject(ActionSheetController);
  private translateService = inject(TranslateService);
  platform = inject(Platform);

  readonly label = input<string>('');
  readonly subTitle = input<string>();
  readonly selectedValue = model<SelectOption['id']>();
  readonly options = input<Array<SelectOption>>([]);
  readonly showReset = input(true);
  readonly disabled = input(false);

  isApp = Capacitor.isNativePlatform();
  filteredOptions = computed(() => this.options().filter((x) => !x.disabled));

  private selectedOption = computed(() => (this.options() || []).find((x) => x.id === this.selectedValue()));
  valueText = computed(() => this.selectedOption()?.text || '');
  valueIcon = computed(() => this.selectedOption()?.icon);
  resetEnabled = computed(() => this.showReset() && this.selectedValue() != null);
  popoverOptions = computed(() => {
    if (this.resetEnabled()) {
      return { cssClass: 'select-options-with-reset' };
    }
    return {};
  });

  constructor() {
    addIcons({ caretDownSharp, closeCircleOutline });
  }

  private async getActionSheetButtons() {
    const buttons: ActionSheetButton[] = [];
    for (const option of (this.options() || []).filter((x) => !x.disabled)) {
      const translatedText = await firstValueFrom(this.translateService.get(option.text));
      buttons.push({
        text: translatedText,
        icon: option.icon,
        role: option.id === this.selectedValue() ? 'selected' : undefined,
        handler: () => this.selectedValue.set(option.id),
      });
    }
    if (this.selectedValue() !== undefined && this.showReset()) {
      const resetTextTranslated = await firstValueFrom(this.translateService.get(TRANSLATION_KEY_RESET));
      buttons.splice(0, 0, {
        text: resetTextTranslated,
        handler: () => this.selectedValue.set(undefined),
        role: 'destructive',
      });
    }
    const cancelTextTranslated = await firstValueFrom(this.translateService.get(TRANSLATION_KEY_CANCEL));
    buttons.push({
      text: cancelTextTranslated,
      role: 'cancel',
    });
    return buttons;
  }

  async getTitleTranslations() {
    let titleTextTranslated: string | undefined;
    const label = this.label();
    if (label) {
      titleTextTranslated = await firstValueFrom(this.translateService.get(label));
    }
    let subTitleTextTranslated: string | undefined;
    const subTitle = this.subTitle();
    if (subTitle) {
      subTitleTextTranslated = await firstValueFrom(this.translateService.get(subTitle));
    }
    return {
      titleTextTranslated,
      subTitleTextTranslated,
    };
  }

  async openSelect() {
    if (!this.disabled()) {
      const translations = await this.getTitleTranslations();
      const buttons = await this.getActionSheetButtons();
      const actionSheet = await this.actionSheetController.create({
        header: translations.titleTextTranslated,
        subHeader: translations.subTitleTextTranslated,
        buttons,
      });
      await actionSheet.present();
    }
  }

  reset() {
    this.selectedValue.set(undefined);
  }
}
