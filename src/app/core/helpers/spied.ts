import { Type } from '@angular/core';

// https://netbasal.com/testing-observables-in-angular-a2dbbfaf5329
// https://dev.to/lysofdev/an-angular-testing-cheatsheet-5hj2
// See geo-name.component.spec.ts for example of testing observable with async

export type Spied<T> = {
  [Method in keyof T]: jasmine.Spy;
};

export function spyOnClass<T>(spiedClass: Type<T>) {
  const prototype = spiedClass.prototype;

  const methods = Object.getOwnPropertyNames(prototype)
    // Object.getOwnPropertyDescriptor is required to filter functions
    .map((name) => [name, Object.getOwnPropertyDescriptor(prototype, name)])
    .filter(([name, descriptor]) => {
      // select only functions
      return (descriptor as PropertyDescriptor).value instanceof Function;
    })
    .map(([name]) => name);
  // return spy object
  return jasmine.createSpyObj('spy', [...methods]);
}

export function provideMock<T>(spiedClass: Type<T>) {
  return {
    provide: spiedClass,
    useValue: spyOnClass(spiedClass),
  };
}
