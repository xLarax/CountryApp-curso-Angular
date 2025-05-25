import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import {  rxResource} from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';


  query = signal(this.queryParam);

  countryResource = rxResource({
    request: ()=>({ query: this.query() }),
    loader: ({ request })=>{

      if (!request.query) return of([]);

      this.router.navigate(['/country/by-capital'],{
        queryParams: {
          query: request.query
        }
      });

      return this.countryService.searchByCapital(request.query);
    },
  });

  /*countryResource = resource({
    request: ()=>({ query: this.query() }),
    loader: async({ request })=>{
      if (!request.query) return [];

      return await firstValueFrom(
        this.countryService.searchByCapital(request.query)
      );

    },
  });*/

  /*isLoading = signal(false);
  isError = signal<string|null>(null);

  countries = signal<Country[]>([])

  onSearch(query: string){

    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCapital(query)
    .subscribe({
      next: (infoCountries) =>{

        this.isLoading.set(false);
        this.countries.set(infoCountries);

      },
      error: (err)=>{
        this.isLoading.set(false);
        this.countries.set([]);
        this.isError.set(err);
      },
    });
  }*/

}
