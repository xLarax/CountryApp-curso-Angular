import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { Region } from '../../interfaces/region.interface';


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

  query = signal<Region|null>(null);

  countryService = inject(CountryService);

  countryResource = rxResource({
    request: ()=>({ query: this.query() }),
    loader: ({ request })=>{
      if (!request.query) return of([]);

      return this.countryService.searchByRegion(request.query);
    },
  });

}
