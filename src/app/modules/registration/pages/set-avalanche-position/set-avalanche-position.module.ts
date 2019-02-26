import { NgModule } from '@angular/core';
import { SharedComponentsModule } from '../../shared-components.module';
import { SetAvalanchePositionPage } from './set-avalanche-position.page';

@NgModule({
    imports: [
        SharedComponentsModule,
    ],
    declarations: [SetAvalanchePositionPage],
    entryComponents: [SetAvalanchePositionPage],
})
export class SetAvalanchePositionPageModule { }
