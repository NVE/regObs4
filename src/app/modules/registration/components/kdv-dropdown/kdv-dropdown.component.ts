import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  NgZone,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { KdvElement } from '../../../regobs-api/models';
import { KdvService } from '../../../../core/services/kdv/kdv.service';
import { SelectInterface } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { IonSelect } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-kdv-dropdown',
  templateUrl: './kdv-dropdown.component.html',
  styleUrls: ['./kdv-dropdown.component.scss'],
})
export class KdvDropdownComponent implements OnInit, OnDestroy, OnChanges {
  @Input() title: string;
  @Input() placeholder: string;
  @Input() kdvKey: string;
  @Input() value: number;
  @Input() interface: SelectInterface = 'action-sheet';
  @Input() interfaceOptions;
  @Input() useDescription: boolean;
  @Output() valueChange = new EventEmitter();
  @Input() showZeroValues = false;
  @Input() disabled = false;
  @Input() labelColor = 'medium';
  @Input() showResetButton = true;
  @Input() filter: (number) => boolean;

  private kdvelements: KdvElement[];
  private subscription: Subscription;
  filteredKdvElements: KdvElement[];

  get hasValue() {
    return this.value !== undefined && this.value !== null;
  }

  get selectedText() {
    if (this.hasValue && this.kdvelements) {
      const kdvElement = this.kdvelements.find((x) => x.Id === this.value);
      if (kdvElement) {
        return this.useDescription ? kdvElement.Description : kdvElement.Name;
      }
    }
    return ' ';
  }

  @ViewChild(IonSelect) select: IonSelect;
  constructor(
    private kdvService: KdvService,
    private ngZone: NgZone,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.subscription = this.kdvService.getKdvRepositoryByKeyObservable(this.kdvKey).subscribe((val) => {
      this.ngZone.run(() => {
        this.kdvelements = val;
        this.filteredKdvElements = this.getFilteredKdvElements();
      });
    });
    this.translateService.get([this.title || '', this.placeholder || '', 'DIALOGS.CANCEL']).subscribe((translations) => {
      this.ngZone.run(() => {
        if (!this.interfaceOptions) {
          this.interfaceOptions = {};
          if (translations[this.title]) {
            this.interfaceOptions.header = translations[this.title];
          }
          if (translations[this.placeholder]) {
            this.interfaceOptions.subHeader = translations[this.placeholder];
          }
        }
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const filterChanges = changes['filter'];
    const valueChanges = changes['value'];
    if ((filterChanges && !filterChanges.firstChange) || (valueChanges && !valueChanges.firstChange)) {
      this.recreateDropdown();
    }
  }

  private recreateDropdown() {
    if (this.kdvelements) {
      setTimeout(() => {
        this.filteredKdvElements = undefined;
        setTimeout(() => {
          this.filteredKdvElements = this.getFilteredKdvElements();
        });
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  isVisible(item: KdvElement) {
    if (this.filter !== undefined && !this.filter(item.Id)) {
      return false;
    }
    if (!this.showZeroValues) {
      return item.Id % 100 !== 0;
    }
    return true;
  }

  private getFilteredKdvElements() {
    if (!this.kdvelements) {
      return [];
    }
    return this.kdvelements.filter((x) => this.isVisible(x));
  }

}
