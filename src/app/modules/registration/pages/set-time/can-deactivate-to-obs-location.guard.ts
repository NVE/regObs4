import { Injectable } from '@angular/core';
import { CanDeactivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { SetTimePage } from './set-time.page';
import { NavController } from '@ionic/angular';

@Injectable()
export class CanDeactivateToObsLocationRouteGuard implements CanDeactivate<SetTimePage> {

    constructor(private navController: NavController) { }

    async canDeactivate(component: SetTimePage,
        _: ActivatedRouteSnapshot,
        __: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Promise<boolean> {
        if (nextState && nextState.url.indexOf('registration/new') >= 0 && component.registration) {
            this.navController.navigateBack(`registration/obs-location/${component.registration.id}`);
        }
        return true;
    }
}
