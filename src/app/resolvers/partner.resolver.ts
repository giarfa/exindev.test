import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { IPartner } from '../models/partner.model';
import { firstValueFrom } from 'rxjs';
import { PartnersDataFactory } from '../services/partners-data.factory';

export const partnerResolver: ResolveFn<IPartner | null> = async (route, state) => {
  const rawPartnerId = route.paramMap.get('id');
  const partnerId = rawPartnerId ? parseInt(rawPartnerId) : null;
  const factory = inject(PartnersDataFactory);
  const partnersSrv = factory.create(route.paramMap.get('company')!);
  const router = inject(Router);
  const notFoundPath = router.parseUrl('/not-found');
  const redirectCommand = new RedirectCommand(notFoundPath, {
    skipLocationChange: true,
  });

  if (partnerId === null || isNaN(partnerId)) {
    return redirectCommand;
  }

  const partner = await firstValueFrom(partnersSrv.getById(partnerId));

  if (!partner) {
    return redirectCommand;
  }

  return partner;
};
