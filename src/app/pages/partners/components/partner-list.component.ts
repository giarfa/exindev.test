import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { IPartner } from '../../../models/partner.model';
import { PartnerWidgetComponent } from './partner-widget/partner-widget.component';
import { RouterLink } from '@angular/router';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-partner-list',
  imports: [PartnerWidgetComponent, RouterLink, NzEmptyModule],
  template: `
    <div class="grid grid-cols-12 gap-4">
    @for (partner of partners(); track partner.id) {
      @defer(on viewport) {
        <app-partner-widget
          class="cursor-pointer aspect-square overflow-hidden col-span-2 border rounded bg-white"
          [partner]="partner"
          [routerLink]="['.', partner.id]"
        ></app-partner-widget>
      } @placeholder {
        <div class="aspect-square col-span-2 border rounded">
          <div class="animate-pulse bg-gray-200" style="height: 100%"></div>
        </div>
      }
    }
    @empty {
      <div class="col-span-12 row-span-3 flex justify-center items-center">
        <nz-empty nzNotFoundImage="simple"  [nzNotFoundContent]="null"></nz-empty>
      </div>
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
