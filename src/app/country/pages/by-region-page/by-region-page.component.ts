import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { Region } from '../../interfaces/region.interface';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam ( queryParam: string): Region{

  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> ={
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic',
  };

  return validRegions[queryParam] ?? 'Africa';

}


@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  queryParam= this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  query = linkedSignal<Region>(()=> validateQueryParam(this.queryParam));

  countryService = inject(CountryService);

  countryResource = rxResource({
    request: ()=>({ query: this.query() }),
    loader: ({ request })=>{
      if (!request.query) return of([]);

      this.router.navigate(['/country/by-region'],{
        queryParams: {
          region: request.query,
        }
      });

      return this.countryService.searchByRegion(request.query);
    },
  });

}
