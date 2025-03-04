import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-registration-header',
  imports: [],
  template: `<h3><ng-content /></h3>`,
  styleUrl: './registration-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationHeaderComponent {}
