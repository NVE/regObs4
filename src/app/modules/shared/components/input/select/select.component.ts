import { Component, Input, EventEmitter, Output, OnInit, HostBinding, inject } from '@angular/core';
import {
  ActionSheetController,
  IonButton,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/angular/standalone';
import { ActionSheetButton } from '@ionic/core';
import { SelectOption } from './select-option.model';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Platform } from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { isAndroidOrIos } from '../../../../../core/helpers/ionic/platform-helper';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { caretDownSharp } from 'ionicons/icons';

const TRANSLATION_KEY_CANCEL = 'DIALOGS.CANCEL';
const TRANSLATION_KEY_RESET = 'DIALOGS.RESET';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  imports: [FormsModule, IonButton, IonIcon, IonSelect, IonSelectOption, IonText, NgFor, NgIf, TranslatePipe],
})
export class SelectComponent implements OnInit {
  private actionSheetController = inject(ActionSheetController);
  private translateService = inject(TranslateService);
  platform = inject(Platform);

  @Input() label: string;
  @Input() subTitle: string;
  @Input() selectedValue: number | string;
  @Output() selectedValueChange = new EventEmitter();
  @Input() options: Array<SelectOption> = [];
  @Input() showReset = true;
  @Input() disabled = false;
  isApp: boolean;

  filteredOptions: Array<SelectOption> = [];

  get valueText() {
    const item = (this.options || []).find((x) => x.id === this.selectedValue);
    if (item) {
      return item.text;
    }
    return '';
  }

  get valueIcon() {
    const item = (this.options || []).find((x) => x.id === this.selectedValue);
    if (item) {
      return item.icon;
    }
    return undefined;
  }

  constructor() {
    addIcons({ caretDownSharp });
  }

  ngOnInit() {
    this.isApp = isAndroidOrIos(this.platform);
    this.getFilteredOptions();
  }

  getFilteredOptions(): Array<SelectOption> {
    return (this.filteredOptions = this.options.filter((x) => !x.disabled));
  }

  private async getActionSheetButtons() {
    const buttons: ActionSheetButton[] = [];
    for (const option of (this.options || []).filter((x) => !x.disabled)) {
      const translatedText = await firstValueFrom(this.translateService.get(option.text));
      buttons.push({
        text: translatedText,
        icon: option.icon,
        role: option.id === this.selectedValue ? 'selected' : undefined,
        handler: () => this.setSelectedValue(option.id),
      });
    }
    if (this.selectedValue !== undefined && this.showReset) {
      const resetTextTranslated = await firstValueFrom(this.translateService.get(TRANSLATION_KEY_RESET));
      buttons.splice(0, 0, {
        text: resetTextTranslated,
        handler: () => this.setSelectedValue(undefined),
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
    let titleTextTranslated: string;
    if (this.label) {
      titleTextTranslated = await firstValueFrom(this.translateService.get(this.label));
    }
    let subTitleTextTranslated: string;
    if (this.subTitle) {
      subTitleTextTranslated = await firstValueFrom(this.translateService.get(this.subTitle));
    }
    return {
      titleTextTranslated,
      subTitleTextTranslated,
    };
  }

  async openSelect() {
    if (!this.disabled) {
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

  private setSelectedValue(id: number | string) {
    this.selectedValue = id;
    this.selectedValueChange.emit(id);
  }

  onChange(event): void {
    this.selectedValue = event.target.value;
    this.selectedValueChange.emit(this.selectedValue);
  }
}
