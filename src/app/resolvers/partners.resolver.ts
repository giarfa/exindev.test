import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IPartner } from '../models/partner.model';
import { take } from 'rxjs';
import { PartnersDataFactory } from '../services/partners-data.factory';

export const partnersResolver: ResolveFn<IPartner[]> = (route, state) => {
  const factory = inject(PartnersDataFactory);
  const partnersSrv = factory.create(route.paramMap.get('company')!);
  return partnersSrv.partners$.pipe(take(1));
};
