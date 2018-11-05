import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SaveAndGoBackButtonComponent } from './components/save-and-go-back-button/save-and-go-back-button.component';
import { TextCommentComponent } from './components/text-comment/text-comment.component';
import { AddPictureItemComponent } from './components/add-picture-item/add-picture-item.component';
import { KdvRadiobuttonListComponent } from './components/kdv-radiobutton-list/kdv-radiobutton-list.component';
import { NavigationButtonsComponent } from './components/navigation-buttons/navigation-buttons.component';
import { SetLocationInMapComponent } from './components/set-location-in-map/set-location-in-map.component';
import { MapModule } from '../map/map.module';
import { Base64ImageComponent } from './components/base64-image/base64-image.component';
import { SyncItemComponent } from './components/sync-item/sync-item.component';
import { SyncItemListComponent } from './components/sync-item-list/sync-item-list.component';
import { IceLayerPage } from './pages/ice/ice-thickness/ice-layer/ice-layer.page';
import { KdvDescriptionPipe } from './pipes/kdv-description.pipe';
import { KdvDropdownComponent } from './components/kdv-dropdown/kdv-dropdown.component';
import { SetAvalanchePositionPage } from './pages/set-avalanche-position/set-avalanche-position.page';
import { AddWebUrlItemComponent } from './components/add-web-url-item/add-web-url-item.component';
import { AddWebUrlModalPage } from './components/add-web-url-item/add-web-url-modal/add-web-url-modal.page';
import { ModalSaveOrDeleteButtonsComponent } from './components/modal-save-or-delete-buttons/modal-save-or-delete-buttons.component';

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
        Base64ImageComponent,
        SyncItemComponent,
        SyncItemListComponent,
        KdvDescriptionPipe,
        KdvDropdownComponent,
        AddWebUrlItemComponent,
        ModalSaveOrDeleteButtonsComponent,
    ],
    declarations: [
        IceLayerPage,
        SetAvalanchePositionPage,
        AddWebUrlModalPage,
        SaveAndGoBackButtonComponent,
        AddPictureItemComponent,
        TextCommentComponent,
        KdvRadiobuttonListComponent,
        NavigationButtonsComponent,
        SetLocationInMapComponent,
        Base64ImageComponent,
        SyncItemComponent,
        SyncItemListComponent,
        KdvDescriptionPipe,
        KdvDropdownComponent,
        AddWebUrlItemComponent,
        ModalSaveOrDeleteButtonsComponent
    ],
    entryComponents: [
        IceLayerPage,
        SetAvalanchePositionPage,
        AddWebUrlModalPage,
    ]
})
export class SharedComponentsModule { }
