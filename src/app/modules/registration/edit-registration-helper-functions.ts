import { WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationViewModel, MyPageData } from 'src/app/modules/common-regobs-api/models';
import { RegistrationService } from '../common-regobs-api';

export type EditMode = 'EDIT_AS_MODERATOR' | 'EDIT_OWN_REGISTRATION';

export function isSameObserver(reg: RegistrationViewModel, observer: MyPageData): boolean {
  if (!observer) {
    return false;
  }
  return observer.ObserverId === reg.Observer.ObserverID;
}

export function isInGroup(reg: RegistrationViewModel, observer: MyPageData): boolean {
  if (
    reg.ObserverGroupID != null &&
    (observer.MemberOfGroups || []).map((g) => g.Id).indexOf(reg.ObserverGroupID) >= 0
  ) {
    return true;
  }
  return false;
}

function isModerator(reg: RegistrationViewModel, observer: MyPageData): boolean {
  if (observer && reg.GeoHazardTID) {
    if (observer.Roles == null) {
      return false;
    }
    return observer.Roles.includes(`ModeratorForGeoHazard${reg.GeoHazardTID}`);
  }
  return false;
}

export function checkEditPriviliges(reg: RegistrationViewModel, observer: MyPageData): EditMode | undefined {
  if (isModerator(reg, observer)) {
    return 'EDIT_AS_MODERATOR';
  }
  if (isSameObserver(reg, observer) || isInGroup(reg, observer)) {
    return 'EDIT_OWN_REGISTRATION';
  }
  return undefined;
}

function isRegistrationOlderThan2days(reg: RegistrationViewModel): boolean {
  const now = new Date();
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const registrationDate = new Date(reg?.DtRegTime);
  return registrationDate && registrationDate < twoDaysAgo;
}

/**
 * TRUE hvis observatør har lov til å endre angitt observasjon.
 * En "vanlig" observatør kan kun endre egne observasjoner som er yngre enn 2 dager.
 * Moderator kan endre alle observasjoner uansett.
 */
export function canEditRegistration(reg?: RegistrationViewModel, observer?: MyPageData): boolean {
  if (!observer || !reg) {
    return false;
  }
  const editMode = checkEditPriviliges(reg, observer);
  return (
    (editMode === 'EDIT_OWN_REGISTRATION' && !isRegistrationOlderThan2days(reg)) || editMode === 'EDIT_AS_MODERATOR'
  );
}
