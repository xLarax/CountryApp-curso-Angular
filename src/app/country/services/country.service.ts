import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.interface';


const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query : string): Observable<Country[]>{

    query = query.toLowerCase();

    if(this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http
    .get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map((resp)=> CountryMapper.mapRestCountryItemstoCountryArray(resp)),
      tap((countries)=>this.queryCacheCapital.set(query, countries)),
      catchError( (error) => {
        console.log('Error fetching ', error);

        return throwError(()=> new Error(`No se pudo obtener resultados con esta búsqueda: ${query}.`));
      })
    );
  };

  searchByCountry(query: string): Observable<Country[]>{

    query = query.toLowerCase();

    if(this.queryCacheCountry.has(query)){
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http
    .get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map((resp)=> CountryMapper.mapRestCountryItemstoCountryArray(resp)),
      tap((countries)=>this.queryCacheCountry.set(query,countries)),
      delay(2000),
      catchError( (error) => {
        console.log('Error fetching ', error);

        return throwError(()=> new Error(`No se pudo obtener resultados con esta búsqueda: ${query}.`));
      }));
  };

  searchByRegion(query: Region): Observable<Country[]>{

    if(this.queryCacheRegion.has(query)){
      return of(this.queryCacheRegion.get(query) ?? []);
    }

    return this.http
    .get<RESTCountry[]>(`${API_URL}/region/${query}`)
    .pipe(
      map((resp)=> CountryMapper.mapRestCountryItemstoCountryArray(resp)),
      tap((countries)=>this.queryCacheRegion.set(query,countries)),
      catchError( (error) => {
        console.log('Error fetching ', error);

        return throwError(()=> new Error(`No se pudo obtener resultados con esta búsqueda: ${query}.`));
      }));
  };

  searchCountryByAlphaCode(code: string) {

    return this.http
    .get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
    .pipe(
      map((resp)=> CountryMapper.mapRestCountryItemstoCountryArray(resp)),
      map(countries => countries.at(0) ),
      catchError( (error) => {
        console.log('Error fetching ', error);

        return throwError(()=> new Error(`No se pudo obtener resultados con el código: ${code}.`));
      }));
  };

}
