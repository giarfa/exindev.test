import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-partner',
  imports: [],
  template: `
    <p>
      partner works!
    </p>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerComponent {

}
