import { DataLoadModule } from './data-load.module';

describe('DataLoadModule', () => {
  let dataLoadModule: DataLoadModule;

  beforeEach(() => {
    dataLoadModule = new DataLoadModule();
  });

  it('should create an instance', () => {
    expect(dataLoadModule).toBeTruthy();
  });
});
