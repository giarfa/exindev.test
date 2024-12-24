import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-partner-budget-detail',
  imports: [DecimalPipe],
  template: `
    <dl class="flex flex-col w-full text-xs gap-2">
      <div class="fatturato">
        <dt>fatturato</dt>
        <dd>{{fatturato() | number:'1.0-0'}}%</dd>
      </div>
      <div class="allocato">
        <dt>allocato</dt>
        <dd>{{allocato() | number:'1.0-0'}}%</dd>
      </div>
      <div class="residuo">
        <dt>residuo</dt>
        <dd>{{allocato() | number:'1.0-0'}}%</dd>
      </div>
    </dl>
  `,
  styles: `
    dl > div { display: flex; justify-content: space-between; }
    dt { font-weight: normal; display: flex; align-items: center; gap: 0.5rem; }
    dt::before {
      content: ' ';
      display: inline-block;
      position: relative;
      width: .4rem;
      height: .4rem;
      border-radius: 50%;
    }
    .fatturato dt::before { background-color: var(--color-fatturato); }
    .allocato dt::before { background-color: var(--color-allocato); }
    .residuo dt::before { background-color: var(--color-residuo); }
    dd { font-weight: bold; }
  `,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerBudgetDetailComponent {
  readonly fatturato = input.required<number>();
  readonly allocato = input.required<number>();
  readonly residuo = input.required<number>();
}
