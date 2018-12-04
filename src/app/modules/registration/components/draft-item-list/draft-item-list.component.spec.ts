import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftItemListComponent } from './draft-item-list.component';

describe('DraftItemListComponent', () => {
  let component: DraftItemListComponent;
  let fixture: ComponentFixture<DraftItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
