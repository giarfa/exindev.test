import { ChangeDetectionStrategy, Component, model, output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-partner-search-filter',
  imports: [NzInputModule, FormsModule],
  template: `
    <form (ngSubmit)="submit()">
      <input nz-input placeholder="Cerca partner..." [(ngModel)]="searchKeyword" [ngModelOptions]="{standalone: true}" />
    </form>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerSearchFilterComponent {
  readonly searchKeyword = model<string>();

  readonly onChange = output<string>();

  submit() {
    this.onChange.emit(this.searchKeyword() ?? '');
  }
}
