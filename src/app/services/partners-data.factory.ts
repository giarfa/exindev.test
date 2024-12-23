import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, filter, map, Observable, shareReplay, tap } from "rxjs";
import { IPartnerDTO, PartnerDTO } from "../models/partner-dto.model";
import { API_BASE_URL } from "../providers/provideApiBaseUrl";
import { IPartner, Partner } from "../models/partner.model";
import { PartnersService } from "./partners.service";

/**
 * Factory class for creating instances of `PartnersDataService`.
 */
@Injectable({
  providedIn: "root"
})
export class PartnersDataFactory {
  private readonly _http = inject(HttpClient);
  private readonly _apiBaseUrl = inject(API_BASE_URL);

  /**
   * Creates a new instance of PartnersDataService.
   *
   * @param companyName - The name of the company for which the PartnersDataService is being created.
   * @returns A new instance of PartnersDataService configured with the provided company name.
   */
  create(companyName: string): PartnersDataService {
    return new PartnersDataService(this._http, this._apiBaseUrl, companyName);
  }
}



/**
 * Service to handle operations related to partners data.
 */
export class PartnersDataService extends PartnersService {
  private readonly _data = new BehaviorSubject<PartnerDTO | null>(null)

  override readonly partners$: Observable<IPartner[]> = this._data.pipe(
    tap(data => {
      if (!data) {
        this._fetchAll();
      }
    }),
    filter(data => !!data),
    map(data => data.partners),
    shareReplay(1)
  );

  override readonly partnerLevels$ = this._data.pipe(
    tap(data => {
      if (!data) {
        this._fetchAll();
      }
    }),
    filter(data => !!data),
    map(data => data.partner_levels),
    shareReplay(1)
  );

  /**
   * Creates an instance of PartnersDataService.
   * @param _http - The HTTP client used for making API requests.
   * @param _apiBaseUrl - The base URL for the API.
   * @param _companyName - The name of the company.
   */
  constructor(
    private readonly _http: HttpClient,
    _apiBaseUrl: string,
    _companyName: string
  ) {
    super(_apiBaseUrl, _companyName);
  }

  /**
   * Retrieves all partners data.
   */
  private _fetchAll(): void {
    this._http.get<IPartnerDTO>(this.baseUrl).pipe(
      map(data => new PartnerDTO(data))
    ).subscribe(data => this._data.next(data));
  }

  /**
   * Retrieves partner data by the partner's ID.
   * @param id - The ID of the partner.
   * @returns An Observable of IPartner.
   */
  getById(id: IPartner['id']): Observable<IPartner> {
    const url = `${this.baseUrl}/${id}`;
    return this._http.get<IPartner>(url).pipe(map(data => new Partner(data)));
  }
}