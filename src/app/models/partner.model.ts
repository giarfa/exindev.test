import { ILogoUrl, LogoUrl } from "./logo-url.model";

/**
 * Represents a partner entity with various attributes.
 */
export interface IPartner {
  id: number;
  name: string;
  partner_level_id: number;
  partner_level_name: string;
  partner_level_color: string;
  partner_budget: string;
  logo_id: number;
  partner_events_invoiced: string;
  partner_events_not_invoiced: string | null;
  logo_url: ILogoUrl;
}


/**
 * Represents a Partner entity with various properties such as id, name, partner level details, budget, logo, and events information.
 * 
 * @implements {IPartner}
 */
export class Partner implements IPartner {
  id: IPartner['id'] = 0;
  name: IPartner['name'] = '';
  partner_level_id: IPartner['partner_level_id'] = 0;
  partner_level_name: IPartner['partner_level_name'] = '';
  partner_level_color: IPartner['partner_level_color'] = '';
  partner_budget: IPartner['partner_budget'] = '';
  logo_id: IPartner['logo_id'] = 0;
  partner_events_invoiced: IPartner['partner_events_invoiced'] = '';
  partner_events_not_invoiced: IPartner['partner_events_not_invoiced'] = null;
  logo_url: IPartner['logo_url'] = new LogoUrl({ src: '', srcset: '' });

  constructor(init?: Partial<IPartner>) {
    if (init) {
      for (const key in init) {
        if (!this.hasOwnProperty(key)) continue;
        const value = this.sanitizeValue(Reflect.get(init, key), key);
        Reflect.set(this, key, value);
      }
    }
  }

  private sanitizeValue(value: any, key: string): any {
    return key === 'logo_url' ? new LogoUrl(value) : value;
  }
}