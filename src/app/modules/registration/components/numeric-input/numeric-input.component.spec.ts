import { TestBed } from '@angular/core/testing';
import { NumericInputComponent } from './numeric-input.component';
import { provideIonicAngular } from '@ionic/angular/standalone';

describe('NumericInputComponent', () => {
  let component: NumericInputComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideIonicAngular()],
    });
    const fixture = TestBed.createComponent(NumericInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displayValue should handle null values', () => {
    component.value = undefined;
    expect(component.displayValue).toBeUndefined();

    component.value = null;
    expect(component.displayValue).toBeUndefined();

    component.value = 0;
    expect(component.displayValue).toEqual('0');

    component.convertRatio = 10;
    component.value = 0;
    expect(component.displayValue).toEqual('0');
    component.value = 1;
    expect(component.displayValue).toEqual('10');
  });
});
