import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftListComponent } from './draft-list.component';

describe('DraftListComponent', () => {
  let component: DraftListComponent;
  let fixture: ComponentFixture<DraftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
