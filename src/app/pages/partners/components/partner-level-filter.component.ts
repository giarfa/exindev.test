import { ChangeDetectionStrategy, Component, input, model, ViewEncapsulation } from '@angular/core';
import { IPartnerLevel } from '../../../models/partner-level.model';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-partner-level-filter',
  imports: [NzSegmentedModule, FormsModule],
  template: `
    <nz-segmented [(ngModel)]="selected">
      <label nz-segmented-item [nzValue]="0">
        <div>Vedi tutti</div>
      </label>
      @for (level of partnerLevels(); track level.id) {
        <label nz-segmented-item [nzValue]="level.id">
          <div>{{ level.name }}</div>
        </label>
      }
    </nz-segmented>
  `,
  styles: `
    .ant-segmented { background-color: transparent !important; }
    .ant-segmented:hover { background-color: transparent !important; }
    label { border: 1px solid #e9e9e9; border-radius: 4px; font-weight: 500; color: var(--color-fatturato); }
    label:not(:last-child) { margin-right: 1rem; }
    label:hover { color: var(--color-allocato); }
  `,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerLevelFilterComponent {
  readonly partnerLevels = input<IPartnerLevel[]>();

  readonly selected = model<IPartnerLevel['id'] | null>();
}
