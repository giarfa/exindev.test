import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { IPartner } from '../../../models/partner.model';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NgOptimizedImage } from '@angular/common'
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'app-partner-widget',
  imports: [NzCardModule, NzTagModule, NgOptimizedImage, NzIconModule, NzProgressModule],
  template: `
    <div style="w-full p-4 border rounded flex flex-col gap-4">
      <div>
        <nz-tag [nzColor]="partner().partner_level_color">{{partner().partner_level_name}}</nz-tag>
      </div>

      <div class="relative w-full border-radius aspect-video overflow-hidden">
        <img [ngSrc]="partner().logo_url.src" fill priority />
      </div>

      <div>
        <div class="flex justify-between font-bold">
          <h3>Budget</h3>
          <nz-icon nzType="search" />
        </div>

        <nz-progress
          class="w-full"
          [nzPercent]="allocato()"
          [nzSuccessPercent]="fatturato()"
        ></nz-progress>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerWidgetComponent {
  readonly partner = input.required<IPartner>();

  fatturato = computed(() => {
    if (!this.partner()) {
      return 0;
    }
    return Number(this.partner().partner_events_invoiced) / Number(this.partner().partner_budget) * 100;
  });

  allocato = computed(() => {
    if (!this.partner()) {
      return 0;
    }
    return Number(this.partner().partner_events_not_invoiced) / Number(this.partner().partner_budget) * 100;
  });
}
