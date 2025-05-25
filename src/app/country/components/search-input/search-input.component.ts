import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  searchResp= output<string>();
  placeholder = input<string>("Introduzca texto a buscar");
  initialValue = input<string>();

  inputValue = linkedSignal<string>(()=> this.initialValue() ?? '');
  debounceTime = input(1000);


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
