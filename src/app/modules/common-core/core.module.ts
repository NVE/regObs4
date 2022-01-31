import { NgModule } from '@angular/core';
import { APP_CONFIG, DEFAULT_APP_CONFIG } from './models/app-config.interface';
import { RegobsCorePipesModule } from './pipes';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    RegobsCorePipesModule
  ],
  providers: [{ provide: APP_CONFIG, useValue: DEFAULT_APP_CONFIG }]
})
export class CoreModule { }
