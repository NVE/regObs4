import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumericInputComponent } from './numeric-input.component';
import { ModalController, provideIonicAngular } from '@ionic/angular';
import { provideTranslateService } from '@ngx-translate/core';

describe('NumericInputComponent', () => {
  let component: NumericInputComponent;
  let fixture: ComponentFixture<NumericInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideIonicAngular(), provideTranslateService()],
    });
    fixture = TestBed.createComponent(NumericInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displayValue should handle null values', () => {
    fixture.componentRef.setInput('value', undefined);
    expect(component.displayValue()).toBeUndefined();

    fixture.componentRef.setInput('value', null);
    expect(component.displayValue()).toBeUndefined();

    fixture.componentRef.setInput('value', 0);
    expect(component.displayValue()).toEqual('0');

    fixture.componentRef.setInput('value', 0);
    fixture.componentRef.setInput('convertRatio', 10);
    expect(component.displayValue()).toEqual('0');
    fixture.componentRef.setInput('value', 1);
    expect(component.displayValue()).toEqual('10');
  });

  it('opens a dismissible sheet and saves the converted result', async () => {
    const modal = jasmine.createSpyObj<HTMLIonModalElement>('modal', ['present', 'onDidDismiss']);
    modal.present.and.resolveTo();
    modal.onDidDismiss.and.resolveTo({ data: { ok: true, value: 30 } });
    const create = spyOn(TestBed.inject(ModalController), 'create').and.resolveTo(modal);
    fixture.componentRef.setInput('value', 2);
    fixture.componentRef.setInput('convertRatio', 10);

    await component.openPicker();

    const options = create.calls.mostRecent().args[0];
    expect(options.breakpoints).toContain(0);
    expect(options.initialBreakpoint).toBeLessThan(1);
    expect(options.breakpoints).toContain(options.initialBreakpoint!);
    expect(options.expandToScroll).toBeFalse();
    expect(options.componentProps?.['value']).toBe(20);
    expect(modal.present).toHaveBeenCalled();
    expect(component.value()).toBe(3);
  });

  it('keeps the existing value when the sheet is dismissed without saving', async () => {
    const modal = jasmine.createSpyObj<HTMLIonModalElement>('modal', ['present', 'onDidDismiss']);
    modal.present.and.resolveTo();
    modal.onDidDismiss.and.resolveTo({ role: 'gesture' });
    spyOn(TestBed.inject(ModalController), 'create').and.resolveTo(modal);
    fixture.componentRef.setInput('value', 2);

    await component.openPicker();

    expect(component.value()).toBe(2);
  });
});
