import { NgModule } from '@angular/core';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    exports: [
        LoginFormComponent
    ],
    declarations: [
        LoginFormComponent
    ],
})
export class SharedLoginComponentsModule { }
