import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CompressionTestListModalPage } from './compression-test-list-modal.page';

describe('CompressionTestListModalPage', () => {
  let component: CompressionTestListModalPage;
  let fixture: ComponentFixture<CompressionTestListModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompressionTestListModalPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompressionTestListModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
