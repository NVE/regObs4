import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  private width = new Subject<number>();
  isDesktop$ = this.width.pipe(
    debounceTime(500),
    map((w) => this.checkIfDesktop(w)),
    distinctUntilChanged()
  );
  isDesktop = toSignal(this.isDesktop$, { initialValue: false });

  private checkIfDesktop(width: number) {
    return width >= 900;
  }

  onResize(width: number) {
    this.width.next(width);
  }

  onResizeEvent(event: UIEvent): void {
    const target = event.target as Window;
    this.onResize(target.innerWidth);
  }
}
