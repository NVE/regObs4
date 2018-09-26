import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShadowCssDirective } from '../../directives/shadow-css.directive';

@NgModule({
    declarations: [
        ShadowCssDirective
    ],
    exports: [
        CommonModule,
        TranslateModule,
        ShadowCssDirective
    ]
})
export class SharedModule { }
