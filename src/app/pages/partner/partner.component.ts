import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { IPartner } from '../../models/partner.model';

@Component({
  selector: 'app-partner',
  imports: [],
  template: `
    <p>
      {{ partner().name }}
    </p>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerComponent {
  partner = input.required<IPartner>();
}
