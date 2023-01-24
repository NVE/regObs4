import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { RemoteImageComponent } from './remote-image.component';

xdescribe('BlobImageComponent', () => {
  let component: RemoteImageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoteImageComponent, DomSanitizer],
    });
    component = TestBed.inject(RemoteImageComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
