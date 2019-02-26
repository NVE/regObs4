import { NgModule } from '@angular/core';
import { ModalSearchPage } from './modal-search.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [ModalSearchPage],
    entryComponents: [ModalSearchPage],
})
export class ModalSearchPageModule { }
