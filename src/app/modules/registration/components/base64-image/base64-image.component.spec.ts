import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Base64ImageComponent } from './base64-image.component';

describe('Base64ImageComponent', () => {
  let component: Base64ImageComponent;
  let fixture: ComponentFixture<Base64ImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Base64ImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Base64ImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
