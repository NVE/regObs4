import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KdvDropdownComponent } from './kdv-dropdown.component';

describe('KdvDropdownComponent', () => {
  let component: KdvDropdownComponent;
  let fixture: ComponentFixture<KdvDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KdvDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KdvDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
