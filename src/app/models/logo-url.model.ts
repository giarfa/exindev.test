/**
 * Interface representing a logo URL.
 */
export interface ILogoUrl {
  src: string;
  srcset: string;
}


/**
 * Represents a logo URL with its source and source set.
 * 
 * @implements {ILogoUrl}
 */
export class LogoUrl implements ILogoUrl {
  src: ILogoUrl['src'] = '';
  srcset: ILogoUrl['srcset'] = '';

  /**
   * Creates an instance of LogoUrl.
   * 
   * @param {Partial<ILogoUrl>} init - An optional object to initialize the LogoUrl instance.
   */
  constructor(init?: Partial<ILogoUrl>) {
    if (init) {
      for (const key in init) {
        if (!this.hasOwnProperty(key)) continue;
        const value = Reflect.get(init, key);
        Reflect.set(this, key, value);
      }
    }
  }
}