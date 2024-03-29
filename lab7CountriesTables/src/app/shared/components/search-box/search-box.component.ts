import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  standalone: true,
  imports: [],
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = '';

 @Output()
 public onValue = new EventEmitter<string>();
 
 emitValue( value: string ): void{
  localStorage.setItem('searchTerm', value);
  this.onValue.emit (value);
 }

 ngOnInit(): void {
  this.emitValue(localStorage.getItem('searchTerm') || '');
 }

}
