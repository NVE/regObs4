import { RegistrationViewModel, MyPageData } from 'src/app/modules/common-regobs-api/models';
import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import moment from 'moment';

export type EditMode = 'EDIT_AS_MODERATOR' | 'EDIT_OWN_REGISTRATION';

export function isSameObserver(reg: RegistrationViewModel, observer: MyPageData): boolean {
  if (!observer) {
    return false;
  }
  return observer.NickName === reg.Observer.NickName; // TODO: Change to ObserverID, when implemented in API model (MyPageData)
}

export function isInGroup(reg: RegistrationViewModel, observer: MyPageData): boolean {
  if (
    observer &&
    reg.ObserverGroupID > 0 &&
    observer.MemberOfGroups &&
    observer.MemberOfGroups.length > 0 &&
    observer.MemberOfGroups.map((g) => g.Id).indexOf(reg.ObserverGroupID) >= 0
  ) {
    return true;
  }
  return false;
}

function isModerator(reg: RegistrationViewModel, observer: MyPageData): boolean {
  if (observer && reg.GeoHazardTID) {
    return observer.Roles?.includes(`ModeratorForGeoHazard${reg.GeoHazardTID}`);
  }
  return false;
}

export function getObserverEditCheckObservable(reg: RegistrationViewModel, observer: MyPageData): Observable<EditMode> {
  if (isModerator(reg, observer)) {
    return of('EDIT_AS_MODERATOR');
  }
  if (isSameObserver(reg, observer) || isInGroup(reg, observer)) {
    return getWithin48HoursCheckUntilFalseObservable(reg).pipe(
      map((within48hours) => (within48hours ? 'EDIT_OWN_REGISTRATION' : undefined))
    );
  }
  return of(undefined);
}

export function getWithin48HoursCheckUntilFalseObservable(reg: RegistrationViewModel): Observable<boolean> {
  const completeWith =
    <T>(predicate: (arg: T) => boolean) =>
      (source: Observable<T>) =>
        new Observable<T>((observer) =>
          source.subscribe(
            (value) => {
              observer.next(value);
              if (predicate(value)) {
                observer.complete();
              }
            },
            (error) => observer.error(error),
            () => observer.complete()
          )
        );

  const forthyEightHoursInMS = 48 * 60 * 60 * 1000;
  const timerCheckEveryMinuteMS = 60 * 1000;
  return timer(0, timerCheckEveryMinuteMS).pipe(
    map(() => isWithinMilliseconds(moment(reg.DtRegTime), forthyEightHoursInMS)),
    completeWith((val) => !val)
  );
}

export function isWithinMilliseconds(m: moment.Moment, msLimit: number, now: moment.Moment = moment()): boolean {
  if (!m) {
    return false;
  }
  return m.isSameOrAfter(now.subtract(msLimit, 'milliseconds'));
}
