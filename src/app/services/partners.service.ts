import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IPartner } from "../models/partner.model";
import { IPartnerLevel } from "../models/partner-level.model";

@Injectable({
  providedIn: "root"
})
export abstract class PartnersService {
  protected readonly baseUrl: string;

  /**
   * Creates an instance of PartnersDataService.
   * @param _http - The HTTP client used for making API requests.
   * @param _apiBaseUrl - The base URL for the API.
   * @param _companyName - The name of the company.
   */
  constructor(
    private readonly _apiBaseUrl: string,
    private readonly _companyName: string
  ) {
    this.baseUrl = `${this._apiBaseUrl}desk/partners/${this._companyName}`;
  }

  abstract readonly partners$: Observable<IPartner[]>;
  abstract readonly partnerLevels$: Observable<IPartnerLevel[]>;

  abstract getById(id: IPartner['id']): Observable<IPartner | undefined>;
}