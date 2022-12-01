import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { DataMarshallService } from 'src/app/core/services/data-marshall/data-marshall.service';
import { ObservationService } from 'src/app/core/services/observation/observation.service';
import { IDataLoad } from 'src/app/modules/data-load/models/data-load.interface';
import { TestModule } from '../../../test/test.module';
import { ObservationsDaysBackComponent } from '../observations-days-back/observations-days-back.component';
import { UpdateObservationsComponent } from '../update-observations/update-observations.component';
import { FilterMenuComponent } from './filter-menu.component';

describe('FilterMenuComponent', () => {
  let component: FilterMenuComponent;
  let fixture: ComponentFixture<FilterMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterMenuComponent, ObservationsDaysBackComponent, UpdateObservationsComponent],
      providers: [
        {
          provide: ObservationService,
          useValue: {
            getLastUpdatedForCurrentGeoHazardAsObservable: () => of(new Date()),
            dataLoad$: of('test'),
          },
        },
        {
          provide: DataMarshallService,
          useValue: {
            getStateAsObservable: () => of({} as IDataLoad),
          },
        },
      ],
      imports: [IonicModule.forRoot(), TestModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
