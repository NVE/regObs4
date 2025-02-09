import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumericInputComponent } from './numeric-input.component';
import { provideIonicAngular } from '@ionic/angular/standalone';

describe('NumericInputComponent', () => {
  let component: NumericInputComponent;
  let fixture: ComponentFixture<NumericInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideIonicAngular()],
    });
    fixture = TestBed.createComponent(NumericInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displayValue should handle null values', () => {
    fixture.componentRef.setInput('value', undefined);
    expect(component.displayValue).toBeUndefined();

    fixture.componentRef.setInput('value', null);
    expect(component.displayValue).toBeUndefined();

    fixture.componentRef.setInput('value', 0);
    expect(component.displayValue).toEqual('0');

    fixture.componentRef.setInput('value', 0);
    fixture.componentRef.setInput('convertRatio', 20);
    expect(component.displayValue).toEqual('0');
    fixture.componentRef.setInput('value', 1);
    expect(component.displayValue).toEqual('10');
  });
});
