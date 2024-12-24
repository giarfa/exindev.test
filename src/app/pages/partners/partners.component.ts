import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, ViewEncapsulation } from '@angular/core';
import { IPartner } from '../../models/partner.model';
import { IPartnerLevel } from '../../models/partner-level.model';
import { PartnerLevelFilterComponent } from './components/partner-level-filter.component';
import { PartnerListComponent } from './components/partner-list.component';
import { PartnerSearchFilterComponent } from './components/partner-search-filter.component';

@Component({
  selector: 'app-partners',
  imports: [PartnerLevelFilterComponent, PartnerSearchFilterComponent, PartnerListComponent],
  host: {
    class: 'flex flex-col py-14 px-20 grow'
  },
  template: `
    <div class="filters-container flex justify-between sticky top-0 bg- z-20 py-4">
      <app-partner-level-filter [partnerLevels]="partnerLevels()" [(selected)]="selectedLevelId"></app-partner-level-filter>
      <app-partner-search-filter class="w-72" [(searchKeyword)]="searchKeyword"></app-partner-search-filter>
    </div>
    <app-partner-list class="w-full grow" [partners]="filteredPartners()"></app-partner-list>
  `,
  styles: `.filters-container{ background-color: #f5f5f5; }`,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnersComponent {
  readonly selectedLevelId = linkedSignal({
    source: () => this.partnerLevels,
    computation: (): IPartnerLevel['id'] => 0
  });

  readonly searchKeyword = linkedSignal({
    source: () => this.partners(),
    computation: () => ''
  });

  readonly partners = input<IPartner[]>();

  readonly partnerLevels = input<IPartnerLevel[]>();

  readonly filteredPartners = computed(() => {
    const selectedLevel = this.selectedLevelId() ?? null;
    const searchKeyword = this.searchKeyword() ?? '';
    return this.partners()?.filter(partner => {
      if (selectedLevel && partner.partner_level_id !== selectedLevel) {
        return false;
      }

      if (searchKeyword && !partner.name.toLowerCase().includes(searchKeyword.toLowerCase())) {
        return false;
      }

      return true;
    });
  });
}
