import { OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Subject, from } from 'rxjs';
import { takeUntil, filter, tap, map, concatMap } from 'rxjs/operators';

export abstract class RouterPage implements OnDestroy {

    public ngUnsubscribe: Subject<void> = new Subject();

    constructor(router: Router, route: ActivatedRoute) {
        router.events.pipe(
            takeUntil(this.ngUnsubscribe),
            filter(event => event instanceof NavigationEnd),
            map(_ => this._isComponentActive(
                router.routerState.snapshot.root.pathFromRoot,
                route.snapshot.component
            )),
            concatMap((isActive) => from(Promise.resolve(isActive ? this.onEnter() : this.onLeave())))
        ).subscribe();
    }

    private _isComponentActive(path: ActivatedRouteSnapshot[], component: any): boolean {
        let isActive = false;
        path.forEach((ss: ActivatedRouteSnapshot) => {
            if (ss.component === component) {
                isActive = true;
            } else {
                isActive = this._isComponentActive(ss.children, component);
            }
        });
        return isActive;
    }

    abstract onEnter(): void | Promise<unknown>;
    abstract onLeave(): void | Promise<unknown>;

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
