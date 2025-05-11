import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {

  static mapRestCountryItemtoCountry(item: RESTCountry): Country{

    return{

        cca2: item.cca2,
        flag: item.flag,
        flagSVG: item.flags.svg,
        name: item.name.common,
        capital: item.capital.join(','),
        population: item.population,
    }

  }

  static mapRestCountryItemstoCountryArray(items: RESTCountry []): Country[]{
    return items.map(this.mapRestCountryItemtoCountry)
  }


}
