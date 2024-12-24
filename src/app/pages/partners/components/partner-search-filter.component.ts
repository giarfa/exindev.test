import { ChangeDetectionStrategy, Component, model, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-partner-search-filter',
  imports: [NzInputModule, FormsModule, NzInputModule, NzIconModule],
  template: `
    <nz-input-group class="w-full" [nzPrefix]="prefixIconSearch" [nzSuffix]="suffixClearSearch">
      <input type="search" nz-input placeholder="Cerca partner..." [(ngModel)]="searchKeyword" />
    </nz-input-group>
    <ng-template #prefixIconSearch>
      <nz-icon nzType="search" />
    </ng-template>
    <ng-template #suffixClearSearch>
      @if(searchKeyword()) {
        <nz-icon class="cursor-pointer" nzType="close-circle" nzTheme="fill" (click)="searchKeyword.set('')" />
      }
    </ng-template>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerSearchFilterComponent {
  readonly searchKeyword = model<string>();
}
