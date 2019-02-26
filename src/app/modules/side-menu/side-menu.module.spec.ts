import { SideMenuModule } from './side-menu.module';

describe('SideMenuModule', () => {
  let sideMenuModule: SideMenuModule;

  beforeEach(() => {
    sideMenuModule = new SideMenuModule();
  });

  it('should create an instance', () => {
    expect(sideMenuModule).toBeTruthy();
  });
});
