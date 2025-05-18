import { Currency } from './rest-countries.interface';

export interface Country{

  cca2: string;
  flag: string;
  flagSVG: string;
  flagDescr: string;
  name: string;
  officialName: string;
  capital: string;
  population: number;
  languages: Languages;
  area: number;
  timeZones: number;

}

export interface Languages {
  eng?: string;
  hin?: string;
  tam?: string;
  ber?: string;
  mey?: string;
  spa?: string;
  fra?: string;
  nrf?: string;
  deu?: string;
  nld?: string;
  mri?: string;
  nzs?: string;
  cat?: string;
  srp?: string;
  fin?: string;
  swe?: string;
  bjz?: string;
}
