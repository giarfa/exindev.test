import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { IPartner } from '../../../../../models/partner.model';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { PartnerBudgetDetailComponent } from './partner-budget-detail.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-partner-widget-detail',
  imports: [NzIconModule, NzProgressModule, PartnerBudgetDetailComponent, NzButtonModule],
  host: {
    class: 'partner-widget-detail flex flex-col gap-2 overflow-hidden'
  },
  template: `
    @let allocato = budgetStats().allocato;
    @let fatturato = budgetStats().fatturato;
    @let residuo = budgetStats().residuo;

    <header class="flex flex-col">
      <div class="flex justify-between font-bold">
        <h3>Budget</h3>
        <nz-icon class="font-bold" nzType="search" />
      </div>
      
      <nz-progress
        class="w-full"
        [nzStrokeWidth]="6"
        [nzShowInfo]="false"
        [nzPercent]="allocato + fatturato"
        [nzSuccessPercent]="fatturato"
        nzStrokeColor="{{strokeColor}}"
      ></nz-progress>
    </header>

    <app-partner-budget-detail
      class="mb-1"
      [allocato]="allocato"
      [fatturato]="fatturato"
      [residuo]="residuo"
    ></app-partner-budget-detail>

    <button nz-button class="w-full font-semibold rounded" nzType="default" nzSize="large">Vedi profilo</button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerWidgetDetailComponent {
  readonly strokeColor = getComputedStyle(document.documentElement).getPropertyValue('--color-allocato');
  readonly partner = input.required<IPartner>();

  readonly budgetStats = computed(() => {
    const partner = this.partner();
    const stats = {
      fatturato: 0,
      allocato: 0,
      residuo: 0
    };

    if (partner) {
      stats.fatturato = Number(partner.partner_events_invoiced) / Number(partner.partner_budget) * 100;
      stats.allocato = Number(partner.partner_events_not_invoiced) / Number(partner.partner_budget) * 100;
      stats.residuo = Number(partner.partner_budget) - stats.fatturato - stats.allocato;
    }

    return stats;
  });
}
