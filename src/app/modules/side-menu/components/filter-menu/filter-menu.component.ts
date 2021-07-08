import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SelectInterface } from '@ionic/core';
import { isAndroidOrIos } from '../../../../core/helpers/ionic/platform-helper';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss'],
})
export class FilterMenuComponent implements OnInit {

  popupType: SelectInterface;
  isIosOrAndroid: boolean;
  isMobileWeb: boolean;
  showObservationTypes = false;
  isIndeterminate: boolean;
  masterCheck: boolean;

  observationTypes = [
    {
      value: "Ulykker",
      isChecked: false
    },
    {
      value: "Skredhendelser",
      isChecked: false
    },
    {
      value: "Snødekke",
      isChecked: false
    },
    {
      value: "Skredaktiviter",
      isChecked: false
    },
    {
      value: "Vær",
      isChecked: false
    },
    {
      value: "Tester",
      isChecked: false
    },
    {
      value: "Snøprofil",
      isChecked: false
    },
    {
      value: "Skredproblem",
      isChecked: false
    },
    {
      value: "Skredfarevurdering",
      isChecked: false
    },
    {
      value: "Notater",
      isChecked: false
    }
  ];


  constructor(private platform: Platform) { }

  async ngOnInit() {
    this.popupType = isAndroidOrIos(this.platform) ? 'action-sheet' : 'popover';
    this.isIosOrAndroid = isAndroidOrIos(this.platform);
    this.isMobileWeb = this.platform.is('mobileweb');
  }

  toggleAllObservationTypes() {
    this.showObservationTypes = !this.showObservationTypes;
  }

  checkMaster(event){
    setTimeout(() => {
      this.observationTypes.forEach(obj => {
        obj.isChecked = this.masterCheck;
      })
    })
  }

  checkEvent() {
    const totalItems = this.observationTypes.length;
    let checked = 0;
    this.observationTypes.map(obj => {
      if (obj.isChecked) checked++;
    });
    if (checked > 0 && checked < totalItems) {
      //If even one item is checked but not all
      this.isIndeterminate = true;
      this.masterCheck = false;
    } else if (checked == totalItems) {
      //If all are checked
      this.masterCheck = true;
      this.isIndeterminate = false;
    } else {
      //If none is checked
      this.isIndeterminate = false;
      this.masterCheck = false;
    }
  }


}
