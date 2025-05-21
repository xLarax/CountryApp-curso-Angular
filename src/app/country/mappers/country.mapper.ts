import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {

  static mapRestCountryItemtoCountry(item: RESTCountry): Country{

    return{

        cca2: item.cca2,
        flag: item.flag,
        flagSVG: item.flags.svg,
        flagDescr: item.flags.alt ?? 'No hay descripción disponible',
        name: item.translations['spa'].common ?? 'No Spanish name',
        officialName: item.translations['spa'].official ?? 'No Spanish name',
        capital: item.capital?.join(','),
        population: item.population,
        languages: item.languages,
        area: item.area,
        timeZones: item.timezones.length,

    };

  }

  static mapRestCountryItemstoCountryArray(items: RESTCountry []): Country[]{
    return items.map(this.mapRestCountryItemtoCountry);
  }


}
