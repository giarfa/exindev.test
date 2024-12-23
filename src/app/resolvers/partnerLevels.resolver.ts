import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { take } from 'rxjs';
import { IPartnerLevel } from '../models/partner-level.model';
import { PartnersDataFactory } from '../services/partners-data.factory';

export const partnerLevelsResolver: ResolveFn<IPartnerLevel[]> = (route, state) => {
  const factory = inject(PartnersDataFactory);
  const partnersSrv = factory.create(route.paramMap.get('company')!);
  return partnersSrv.partnerLevels$.pipe(take(1));
};
