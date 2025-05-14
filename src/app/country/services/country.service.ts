import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';


const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital(query : string): Observable<Country[]>{

    query = query.toLowerCase();

    return this.http
    .get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map((resp)=> CountryMapper.mapRestCountryItemstoCountryArray(resp)),
      catchError( (error) => {
        console.log('Error fetching ', error);

        return throwError(()=> new Error(`No se pudo obtener resultados con esta búsqueda: ${query}.`));
      })
    );
  };

  searchByCountry(query: string): Observable<Country[]>{

    query = query.toLowerCase();

    return this.http
    .get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map((resp)=> CountryMapper.mapRestCountryItemstoCountryArray(resp)),
      catchError( (error) => {
        console.log('Error fetching ', error);

        return throwError(()=> new Error(`No se pudo obtener resultados con esta búsqueda: ${query}.`));
      }));
  };

}
