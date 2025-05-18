import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  searchResp= output<string>();
  placeholder = input<string>("Introduzca texto a buscar");

  inputValue = signal<string>('');
  debounceTime = input(100);

  debounceEffect = effect((onCleanup)=>{
    const value = this.inputValue();

    const timeout = setTimeout(()=>{
      this.searchResp.emit(value);
    }, this.debounceTime());

    onCleanup(()=>{
      clearTimeout(timeout)
    });

  });

  onSearch(value: string){
    this.searchResp.emit(value);
  }
 }
