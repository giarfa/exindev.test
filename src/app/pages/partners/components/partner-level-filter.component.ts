import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';
import { IPartnerLevel } from '../../../models/partner-level.model';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-partner-level-filter',
  imports: [NzButtonModule],
  template: `
    <nz-button-group>
      <button nz-button (click)="selectLevel(0)">Vedi tutti</button>
      @for (level of partnerLevels(); track level.id) {
        <button nz-button (click)="selectLevel(level.id)">{{ level.name }}</button>
      }
    </nz-button-group>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerLevelFilterComponent {
  readonly partnerLevels = input<IPartnerLevel[]>();

  readonly selected = input<IPartnerLevel | null>();

  readonly selectionChange = output<IPartnerLevel | null>();

  selectLevel(levelId: IPartnerLevel['id']) {
    this.selectionChange.emit(this.partnerLevels()?.find(level => level.id === levelId) ?? null);
  }
}
