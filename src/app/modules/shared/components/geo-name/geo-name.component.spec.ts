import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeoNameComponent } from './geo-name.component';
import { GeoHelperService } from '../../services/geo-helper/geo-helper.service';
import { Spied, provideMock } from '../../../../core/helpers/spied';
import { of } from 'rxjs';
import { GeoHazard } from 'src/app/modules/common-core/models';

describe('GeoNameComponent', () => {
  let component: GeoNameComponent;
  let fixture: ComponentFixture<GeoNameComponent>;
  let geoHelperService: Spied<GeoHelperService>;
  const dummyname = 'dummyname';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GeoNameComponent],
      providers: [provideMock(GeoHelperService)],
    });

    geoHelperService = TestBed.inject(GeoHelperService) as unknown as Spied<GeoHelperService>;
    geoHelperService.getName$.mockReturnValue(of(dummyname));

    fixture = TestBed.createComponent(GeoNameComponent);
    fixture.componentRef.setInput('geoHazards', [GeoHazard.Snow]);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display observable name from geoHelperService', async () => {
    await fixture.whenStable();

    const htmlElement: HTMLElement = fixture.debugElement.nativeElement;
    expect(geoHelperService.getName$).toHaveBeenCalled();
    expect(geoHelperService.getName$).toHaveBeenCalledTimes(1);
    expect(component.name()).toBe(dummyname);
    expect(htmlElement.textContent).toBe(dummyname);
  });
});
