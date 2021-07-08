import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { BlobImageComponent } from './blob-image.component';

describe('BlobImageComponent', () => {
  let component: BlobImageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlobImageComponent, DomSanitizer]
    });
    component = TestBed.inject(BlobImageComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
