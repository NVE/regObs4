import { CapModule } from './cap.module';

describe('CapModule', () => {
  let capModule: CapModule;

  beforeEach(() => {
    capModule = new CapModule();
  });

  it('should create an instance', () => {
    expect(capModule).toBeTruthy();
  });
});
