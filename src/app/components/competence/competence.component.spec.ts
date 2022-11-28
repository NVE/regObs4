import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CompetenceComponent } from './competence.component';
import { TranslateService } from '@ngx-translate/core';

import { TestModule } from '../../modules/test/test.module';

xdescribe('CompetenceComponent', () => {
  let component: CompetenceComponent;
  let fixture: ComponentFixture<CompetenceComponent>;
  let translate: TranslateService;
  const unknownCopetenceNO = '(Ukjent kompetanse)';
  const unknownCopetenceEN = '(Competence unknown)';
  const filledStarSelector = 'svg-icon[src=\'/assets/icon/star-selected.svg\']';
  const emptyStarSelector = 'svg-icon[src=\'/assets/icon/star-empty.svg\']';
  const smallTextSelector = '.small-text';

  function getElementCount(element: HTMLElement, selector: string) {
    return element.querySelectorAll(selector).length;
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TestModule]
      }).compileComponents();
      translate = TestBed.inject(TranslateService);
      // translate.addLangs(['nb', 'en']);
      // translate.setDefaultLang('nb');
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when competence is undefined, return unknown competence', () => {
    component.competenceLevel = undefined;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const text = compiled.querySelector(smallTextSelector);
    expect(text).not.toBeNull();
    if (text && text.textContent) {
      expect(text.textContent).toEqual(unknownCopetenceNO);
    }
  });

  it('when competence is undefined, return unknown competence EN', async (done) => {
    component.competenceLevel = undefined;
    await translate.use('en').toPromise(); // Waits for translation file to load
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const text = compiled.querySelector(smallTextSelector);
    expect(text).not.toBeNull();
    if (text && text.textContent) {
      expect(text.textContent).toEqual(unknownCopetenceEN);
    }
    done();
  });

  it('when competence is 0, return unknown competence', () => {
    component.competenceLevel = 0;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const text = compiled.querySelector(smallTextSelector);
    expect(text).not.toBeNull();
    if (text && text.textContent) {
      expect(text.textContent).toEqual(unknownCopetenceNO);
    }
  });

  it('when competence is 1, return one filled stars and 4 empty stars', () => {
    component.competenceLevel = 1;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement as HTMLElement;
    expect(getElementCount(compiled, emptyStarSelector)).toEqual(4);
    expect(getElementCount(compiled, filledStarSelector)).toEqual(1);
  });

  it('when competence is 5, return 5 filled stars and 0 empty stars', () => {
    component.competenceLevel = 5;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement as HTMLElement;
    expect(getElementCount(compiled, emptyStarSelector)).toEqual(0);
    expect(getElementCount(compiled, filledStarSelector)).toEqual(5);
  });

  it('when competence is 6, return 5 filled stars and 0 empty stars', () => {
    component.competenceLevel = 6;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement as HTMLElement;
    expect(getElementCount(compiled, emptyStarSelector)).toEqual(0);
    expect(getElementCount(compiled, filledStarSelector)).toEqual(5);
  });
});
