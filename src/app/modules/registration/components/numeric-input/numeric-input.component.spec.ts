import { NumericInputComponent } from './numeric-input.component';

describe('NumericInputComponent', () => {
  let component: NumericInputComponent;

  beforeEach(() => {
    component = new NumericInputComponent(null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displayValue should handle null values', () => {
    // component.value = undefined;
    // expect(component.displayValue).toBeUndefined();
    component.value = 3.14;
    expect(component.displayValue).toEqual('3,14');

    component.value = null;
    expect(component.displayValue).toBeUndefined();
  });

});
