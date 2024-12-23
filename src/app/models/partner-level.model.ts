/**
 * Interface representing a partner level.
 */
export interface IPartnerLevel {
  id: number;
  name: string;
  color: string;
}


/**
 * Represents a partner level with an id, name, and color.
 * 
 * @implements {IPartnerLevel}
 */
export class PartnerLevel implements IPartnerLevel {
  id: IPartnerLevel['id'] = 0;
  name: IPartnerLevel['name'] = '';
  color: IPartnerLevel['color'] = '';

  constructor(init: Partial<IPartnerLevel>) {
    if (init) {
      for (const key in init) {
        if (this.hasOwnProperty(key)) continue;
        const value = Reflect.get(init, key);
        Reflect.set(this, key, value);
      }
    }
  }
}