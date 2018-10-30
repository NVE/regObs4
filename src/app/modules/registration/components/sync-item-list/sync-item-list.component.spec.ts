import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncItemListComponent } from './sync-item-list.component';

describe('SyncItemListComponent', () => {
  let component: SyncItemListComponent;
  let fixture: ComponentFixture<SyncItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyncItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
