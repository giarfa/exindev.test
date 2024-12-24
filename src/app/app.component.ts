import { Component, computed, inject } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzIconModule],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ],
  template: `
    <router-outlet></router-outlet>

    @if(loading()) {
      <div @fadeInOut class="overlay fixed z-50 top-0 bottom-0 w-full bg-slate-50/50 flex items-center justify-center">
        <nz-icon class="text-2xl" nzType="loading" nzSpin nzTheme="outline"></nz-icon>
      </div>
    }
  `,
})
export class AppComponent {
  private readonly _router = inject(Router);

  private readonly _isNavigating = toSignal(this._router.events.pipe(
    filter(event => event instanceof NavigationStart || event instanceof NavigationEnd || event instanceof NavigationError),
    map(event => event instanceof NavigationStart),
  ), { initialValue: false });

  readonly loading = computed(() => this._isNavigating());
}
