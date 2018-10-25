import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SaveAndGoBackButtonComponent } from './components/save-and-go-back-button/save-and-go-back-button.component';
import { TextCommentComponent } from './components/text-comment/text-comment.component';
import { AddPictureItemComponent } from './components/add-picture-item/add-picture-item.component';

@NgModule({
    imports: [
        SharedModule,
    ],
    exports: [
        SharedModule,
        SaveAndGoBackButtonComponent,
        AddPictureItemComponent,
        TextCommentComponent,
    ],
    declarations: [SaveAndGoBackButtonComponent, AddPictureItemComponent, TextCommentComponent]
})
export class SharedComponentsModule { }
