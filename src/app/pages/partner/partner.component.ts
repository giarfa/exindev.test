import { ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { IPartner } from '../../models/partner.model';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partner',
  imports: [NzPageHeaderModule],
  template: `
    <nz-page-header (nzBack)="onBack()" nzBackIcon [nzTitle]="partner().name"></nz-page-header>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerComponent {
  readonly partner = input.required<IPartner>();

  private readonly router = inject(Router);

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.router.routerState.root });
  }
}
