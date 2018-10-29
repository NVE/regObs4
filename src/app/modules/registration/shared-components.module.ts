import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SaveAndGoBackButtonComponent } from './components/save-and-go-back-button/save-and-go-back-button.component';
import { TextCommentComponent } from './components/text-comment/text-comment.component';
import { AddPictureItemComponent } from './components/add-picture-item/add-picture-item.component';
import { KdvRadiobuttonListComponent } from './components/kdv-radiobutton-list/kdv-radiobutton-list.component';
import { NavigationButtonsComponent } from './components/navigation-buttons/navigation-buttons.component';
import { SetLocationInMapComponent } from './components/set-location-in-map/set-location-in-map.component';
import { MapModule } from '../map/map.module';

@NgModule({
    imports: [
        SharedModule,
        MapModule,
    ],
    exports: [
        SharedModule,
        MapModule,
        SaveAndGoBackButtonComponent,
        AddPictureItemComponent,
        TextCommentComponent,
        KdvRadiobuttonListComponent,
        NavigationButtonsComponent,
        SetLocationInMapComponent,
    ],
    declarations: [
        SaveAndGoBackButtonComponent,
        AddPictureItemComponent,
        TextCommentComponent,
        KdvRadiobuttonListComponent,
        NavigationButtonsComponent,
        SetLocationInMapComponent,
    ]
})
export class SharedComponentsModule { }
