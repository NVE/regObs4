import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShadowCssDirective } from '../../directives/shadow-css.directive';
import { AddMenuComponent } from '../../components/add-menu/add-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OfflineImageComponent } from '../../components/offline-image/offline-image.component';
import { ExternalLinkComponent } from '../../components/external-link/external-link.component';
import { GeoIconComponent } from '../../components/geo-icon/geo-icon.component';
import { AngularSvgIconModule, SvgIconComponent } from 'angular-svg-icon';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        AngularSvgIconModule,
    ],
    declarations: [
        ShadowCssDirective,
        AddMenuComponent,
        OfflineImageComponent,
        ExternalLinkComponent,
        GeoIconComponent,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        TranslateModule,
        ShadowCssDirective,
        AddMenuComponent,
        OfflineImageComponent,
        ExternalLinkComponent,
        GeoIconComponent,
    ]
})
export class SharedModule { }
