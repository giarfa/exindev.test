import { Routes } from '@angular/router';
import { partnersResolver } from './resolvers/partners.resolver';
import { partnerLevelsResolver } from './resolvers/partnerLevels.resolver';
import { PartnersComponent } from './pages/partners/partners.component';
import { partnerResolver } from './resolvers/partner.resolver';

export const routes: Routes = [
  {
    path: ':company/partners',
    children: [
      {
        path: '',
        pathMatch: 'full',
        resolve: {
          partners: partnersResolver,
          partnerLevels: partnerLevelsResolver
        },
        component: PartnersComponent
      },
      {
        path: ':id',
        pathMatch: 'full',
        resolve: {
          partner: partnerResolver
        },
        loadComponent: () => import('./pages/partner/partner.component').then(m => m.PartnerComponent)
      }
    ]
  },

  /** Redirects to the partners page. */
  {
    path: '**',
    redirectTo: 'fideuram/partners'
  }
];
