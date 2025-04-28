import { RegistrationViewModel, MyPageData } from 'src/app/modules/common-regobs-api/models';

export type EditMode = 'EDIT_AS_MODERATOR' | 'EDIT_OWN_REGISTRATION';

export function isSameObserver(reg: RegistrationViewModel, observer: MyPageData): boolean {
  if (!observer) {
    return false;
  }
  return observer.NickName === reg.Observer.NickName; // TODO: Change to ObserverID, when implemented in API model (MyPageData)
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
