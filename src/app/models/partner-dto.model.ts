import { IPartnerLevel, PartnerLevel } from "./partner-level.model";
import { IPartner, Partner } from "./partner.model";

/**
 * Interface representing the Data Transfer Object (DTO) for a partner.
 */
export interface IPartnerDTO {
  partner_levels: IPartnerLevel[];
  partners: IPartner[];
}


/**
 * Data Transfer Object (DTO) for Partner.
 * This class is used to transfer partner-related data between different layers of the application.
 * 
 * @implements {IPartnerDTO}
 */
export class PartnerDTO implements IPartnerDTO {
  partner_levels: IPartnerLevel[] = [];
  partners: IPartner[] = [];

  constructor(init?: Partial<IPartnerDTO>) {
    if (init) {
      for (const key in init) {
        if (!this.hasOwnProperty(key)) continue;
        const value = this.sanitizeValue(Reflect.get(init, key), key);
        Reflect.set(this, key, value);
      }
    }
  }

  private sanitizeValue(value: any, key: string): any {
    return key === "partners_level" ? this.sanitizePartnerLevels(value) :
      key === "partners" ? this.sanitizePartners(value) : value;
  }

  private sanitizePartnerLevels(partnerLevels: IPartnerLevel[] = []): IPartnerLevel[] {
    return partnerLevels.map((partnerLevel) => new PartnerLevel(partnerLevel));
  }

  private sanitizePartners(partners: IPartner[] = []): IPartner[] {
    return partners.map((partner) => new Partner(partner));
  }
}