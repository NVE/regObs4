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
import { AngularSvgIconModule } from 'angular-svg-icon';
import { GeoSelectComponent } from '../../components/geo-select/geo-select.component';
import { FormatDatePipe } from '../../core/pipes/format-date.pipe';
import { ObservationListCardComponent } from '../../components/observation/observation-list-card/observation-list-card.component';
import { StartsWithHighlightPipe } from '../../core/pipes/starts-with-highlight.pipe';
import { LegalTermsComponent } from '../../components/legal-terms/legal-terms.component';
import { ImgSwiperComponent } from '../../components/img-swiper/img-swiper.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterModule } from '@angular/router';
import { RefreshWithCancelComponent } from '../../components/refresh-with-cancel/refresh-with-cancel.component';
import { SummaryComponent } from '../../components/observation/summary/summary.component';
import { HeaderColorDirective } from '../../directives/header-color.directive';
import { InputPatternFilterDirective } from '../../directives/input-pattern-filter.directive';
import { AutoResizeDirective } from '../../directives/auto-resize.directive';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        AngularSvgIconModule,
        TranslateModule,
        RouterModule,
    ],
    declarations: [
        ShadowCssDirective,
        AutoResizeDirective,
        AddMenuComponent,
        OfflineImageComponent,
        ExternalLinkComponent,
        GeoIconComponent,
        GeoSelectComponent,
        FormatDatePipe,
        StartsWithHighlightPipe,
        ObservationListCardComponent,
        LegalTermsComponent,
        ImgSwiperComponent,
        HeaderComponent,
        RefreshWithCancelComponent,
        SummaryComponent,
        HeaderColorDirective,
        InputPatternFilterDirective,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        TranslateModule,
        RouterModule,
        ShadowCssDirective,
        AutoResizeDirective,
        AngularSvgIconModule,
        AddMenuComponent,
        OfflineImageComponent,
        ExternalLinkComponent,
        GeoIconComponent,
        GeoSelectComponent,
        FormatDatePipe,
        StartsWithHighlightPipe,
        ObservationListCardComponent,
        LegalTermsComponent,
        ImgSwiperComponent,
        HeaderComponent,
        RefreshWithCancelComponent,
        SummaryComponent,
        HeaderColorDirective,
        InputPatternFilterDirective,
    ]
})
export class SharedModule { }
