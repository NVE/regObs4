import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverMenuComponent } from '../popover-menu/popover-menu.component';
import { Fab, PopoverController } from '@ionic/angular';
import { CustomAnimation } from '../../core/animations/custom.animation';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent implements OnInit {
  @ViewChild('menuFab') menuFab: Fab;
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }

  async showFabMenu(event: Event) {
    console.log(event.srcElement);
    const ev = {
      ...event, target: {
        ...event.target, getBoundingClientRect: () => {
          return {
            top: (event.target as any).getBoundingClientRect().top - 110,
            left: (<any>event).pageX
          };
        }
      }
    };
    const popover = await this.popoverController.create({
      component: PopoverMenuComponent,
      translucent: false,
      mode: 'md',
      event: ev,
      showBackdrop: true,
      cssClass: 'menu-popover',
    });
    popover.onWillDismiss().then(() => {
      console.log('dismissed');
      this.menuFab.close();
    });
    return await popover.present();
  }

}
