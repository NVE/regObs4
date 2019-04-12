// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { NumericInputComponent } from './numeric-input.component';
// import { Platform } from '@ionic/angular';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { SharedModule } from '../../../shared/shared.module';
// import { of, Observable } from 'rxjs';

// describe('NumericInputComponent', () => {
//   let component: NumericInputComponent;
//   let fixture: ComponentFixture<NumericInputComponent>;
//   let platformSpy: any;
//   let translateLoader: any;
//   let platformReadySpy: any;
//   let getTranslationSpy: (lang: string) => Observable<any>;
//   let isSpy: any;
//   let platform: any;

//   beforeEach(async(() => {
//     platform = '';
//     platformReadySpy = Promise.resolve();
//     getTranslationSpy = (lang: string) => of({});
//     isSpy = (platformName: string) => platformName === platform;
//     platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy, is: isSpy });
//     translateLoader = jasmine.createSpyObj('TranslateLoader', {
//       getTranslation: getTranslationSpy
//     });
//     TestBed.configureTestingModule({
//       declarations: [NumericInputComponent],
//       providers: [
//         { provide: Platform, useValue: platformSpy },
//       ],
//       imports: [
//         SharedModule,
//         TranslateModule.forRoot({
//           loader: { provide: TranslateLoader, useValue: translateLoader },
//         }),
//       ]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(NumericInputComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('ios with decimals should give inputmode telephone', () => {
//     platform = 'ios';
//     component.decimalPlaces = 1;
//     expect(component.inputmode).toEqual('tel');
//   });
// });
