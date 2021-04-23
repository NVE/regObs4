import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ActionSheetController, PopoverController } from '@ionic/angular';
import { ActionSheetButton } from '@ionic/core';
import { SelectOption } from './select-option.model';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { isAndroidOrIos } from '../../../../../core/helpers/ionic/platform-helper';

const TRANSLATION_KEY_CANCEL = 'DIALOGS.CANCEL';
const TRANSLATION_KEY_RESET = 'DIALOGS.RESET';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() title: string;
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

  constructor(
    private actionSheetController: ActionSheetController,
    // TODO: What is popoverController used for? Delete if not in use
    private popoverController: PopoverController,
    private translateService: TranslateService,
    public platform: Platform
  ) {}

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
      const translatedText = await firstValueFrom(this.translateService
        .get(option.text));
      buttons.push({
        text: translatedText,
        icon: option.icon,
        role: option.id === this.selectedValue ? 'selected' : undefined,
        handler: () => this.setSelectedValue(option.id)
      });
    }
    if (this.selectedValue !== undefined && this.showReset) {
      const resetTextTranslated = await firstValueFrom(this.translateService
        .get(TRANSLATION_KEY_RESET));
      buttons.splice(0, 0, {
        text: resetTextTranslated,
        handler: () => this.setSelectedValue(undefined),
        role: 'destructive'
      });
    }
    const cancelTextTranslated = await firstValueFrom(this.translateService
      .get(TRANSLATION_KEY_CANCEL));
    buttons.push({
      text: cancelTextTranslated,
      role: 'cancel'
    });
    return buttons;
  }

  async getTitleTranslations() {
    let titleTextTranslated: string;
    if (this.title) {
      titleTextTranslated = await firstValueFrom(this.translateService
        .get(this.title));
    }
    let subTitleTextTranslated: string;
    if (this.subTitle) {
      subTitleTextTranslated = await firstValueFrom(this.translateService
        .get(this.subTitle));
    }
    return {
      titleTextTranslated,
      subTitleTextTranslated
    };
  }

  async openSelect() {
    if (!this.disabled) {
      const translations = await this.getTitleTranslations();
      const buttons = await this.getActionSheetButtons();
      const actionSheet = await this.actionSheetController.create({
        header: translations.titleTextTranslated,
        subHeader: translations.subTitleTextTranslated,
        buttons
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
