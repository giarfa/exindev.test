import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { IPartner } from '../../../../models/partner.model';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NgOptimizedImage } from '@angular/common'
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { PartnerWidgetDetailComponent } from './components/partner-widget-detail.component';

@Component({
  selector: 'app-partner-widget',
  imports: [NzCardModule, NzTagModule, NgOptimizedImage, NzProgressModule, PartnerWidgetDetailComponent],
  host: {
    class: 'px-4 py-3 relative flex flex-col gap-4 overflow-hidden'
  },
  template: `
    <div>
      @let textColor = partner().partner_level_color;
      @let bgColor = partner().partner_level_color+'11';
      <span class="px-[6px] py-[2px] rounded-full inline-block text-xs"
        [style.color]="textColor"
        [style.backgroundColor]="bgColor"
      >{{ partner().partner_level_name }}</span>
    </div>

    <div class="relative w-full border-radius aspect-[2/1] overflow-hidden">
      <img [ngSrc]="partner().logo_url.src" class="object-contain" fill priority />
    </div>

    <app-partner-widget-detail class="absolute z-10 p-2 w-full left-0 bg-white shadow-sm" [partner]="partner()"></app-partner-widget-detail>
  `,
  styles: `
    .partner-widget-detail {
      bottom: -8rem;
      box-shadow: -.25rem 0 .5rem rgba(0, 0, 0, 0.15);
      transition: all .3s;
    }

    :host:hover .partner-widget-detail {
      bottom: 0;
      box-shadow: -.5rem 0 1rem rgba(0, 0, 0, 0.15);
    }
  `,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerWidgetComponent {
  readonly partner = input.required<IPartner>();
}