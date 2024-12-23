import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { IPartner } from '../../../models/partner.model';
import { PartnerWidgetComponent } from './partner-widget.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-partner-list',
  imports: [PartnerWidgetComponent, NzGridModule, RouterLink],
  template: `
    <div nz-row [nzGutter]="[16, 16]">
    @for (partner of partners(); track partner.id) {
      <app-partner-widget class="cursor-pointer" nz-col [nzSpan]="2" [partner]="partner" [routerLink]="['.', partner.id]"></app-partner-widget>
    }
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerListComponent {
  readonly partners = input<IPartner[]>();
}
