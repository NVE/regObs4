import { OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Subject, from } from 'rxjs';
import { takeUntil, filter, tap, map, concatMap } from 'rxjs/operators';

export abstract class RouterPage implements OnDestroy {

    public ngUnsubscribe: Subject<void> = new Subject();
    private isActive = false;

    constructor(private router: Router, private route: ActivatedRoute) {
        router.events.pipe(
            takeUntil(this.ngUnsubscribe),
            filter(event => event instanceof NavigationEnd),
            concatMap(() => from(Promise.resolve(this.detectEnterOrLeave())))
        ).subscribe();
    }

    private isComponentActive(path: ActivatedRouteSnapshot[], component: any): boolean {
        let isActive = false;
        path.forEach((ss: ActivatedRouteSnapshot) => {
            if (ss.component === component) {
                isActive = true;
            } else {
                isActive = this.isComponentActive(ss.children, component);
            }
        });
        return isActive;
    }

    private async detectEnterOrLeave() {
        const isActiveNow = this.isComponentActive(this.router.routerState.snapshot.root.pathFromRoot, this.route.snapshot.component);
        if (!this.isActive && isActiveNow) {
            this.isActive = true;
            await this.onEnter();
        } else if (this.isActive && !isActiveNow) {
            this.isActive = false;
            await this.onLeave();
        }
    }

    abstract onEnter(): void | Promise<unknown>;
    abstract onLeave(): void | Promise<unknown>;

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
