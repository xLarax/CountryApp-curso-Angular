import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  searchResp= output<string>();
  placeholder = input<string>("Introduzca texto a buscar");

  onSearch(value: string){
    this.searchResp.emit(value);
  }
 }
