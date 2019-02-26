import { NgModule } from '@angular/core';
import { LoginModalPage } from './login-modal.page';
import { SharedModule } from '../../../../shared/shared.module';
import { SharedLoginComponentsModule } from '../../../shared-login-components.module';

@NgModule({
  imports: [SharedModule, SharedLoginComponentsModule],
  declarations: [LoginModalPage],
  exports: [LoginModalPage],
  entryComponents: [LoginModalPage],
})
export class LoginModalPageModule { }
