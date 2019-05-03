import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompressionTestComponent } from './compression-test.component';

describe('CompressionTestComponent', () => {
  let component: CompressionTestComponent;
  let fixture: ComponentFixture<CompressionTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompressionTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompressionTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
