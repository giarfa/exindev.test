import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, ViewEncapsulation } from '@angular/core';
import { IPartner } from '../../models/partner.model';
import { IPartnerLevel } from '../../models/partner-level.model';
import { PartnerLevelFilterComponent } from './components/partner-level-filter.component';
import { PartnerListComponent } from './components/partner-list.component';
import { PartnerSearchFilterComponent } from './components/partner-search-filter.component';

@Component({
  selector: 'app-partners',
  imports: [PartnerLevelFilterComponent, PartnerSearchFilterComponent, PartnerListComponent],
  template: `
    <div class="flex justify-between p-4">
      <app-partner-level-filter [partnerLevels]="partnerLevels()" [selected]="selectedLevel()" (selectionChange)="selectedLevel.set($event)"></app-partner-level-filter>
      <app-partner-search-filter (onChange)="searchKeyword.set($event)"></app-partner-search-filter>
    </div>
    <app-partner-list class="w-full" [partners]="filteredPartners()"></app-partner-list>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnersComponent {
  readonly selectedLevel = linkedSignal({
    source: () => this.partnerLevels,
    computation: (): IPartnerLevel | null => null
  });

  readonly searchKeyword = linkedSignal({
    source: () => this.partners,
    computation: () => ''
  });

  readonly partners = input<IPartner[]>();

  readonly partnerLevels = input<IPartnerLevel[]>();

  readonly filteredPartners = computed(() => {
    const selectedLevel = this.selectedLevel() ?? null;
    const searchKeyword = this.searchKeyword() ?? '';
    return this.partners()?.filter(partner => {
      if (selectedLevel && partner.partner_level_id !== selectedLevel.id) {
        return false;
      }

      if (searchKeyword && !partner.name.toLowerCase().includes(searchKeyword.toLowerCase())) {
        return false;
      }

      return true;
    });
  });
}
