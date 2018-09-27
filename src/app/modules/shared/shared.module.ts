import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShadowCssDirective } from '../../directives/shadow-css.directive';
import { AddMenuComponent } from '../../components/add-menu/add-menu.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    declarations: [
        ShadowCssDirective,
        AddMenuComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule,
        ShadowCssDirective,
        AddMenuComponent
    ]
})
export class SharedModule { }
