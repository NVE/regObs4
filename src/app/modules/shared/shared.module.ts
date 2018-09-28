import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShadowCssDirective } from '../../directives/shadow-css.directive';
import { AddMenuComponent } from '../../components/add-menu/add-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OfflineImageComponent } from '../../components/offline-image/offline-image.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
    ],
    declarations: [
        ShadowCssDirective,
        AddMenuComponent,
        OfflineImageComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        TranslateModule,
        ShadowCssDirective,
        AddMenuComponent,
        OfflineImageComponent
    ]
})
export class SharedModule { }
