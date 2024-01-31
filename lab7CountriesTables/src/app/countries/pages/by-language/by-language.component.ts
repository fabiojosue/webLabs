import { Component } from '@angular/core';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { CountriesTableComponent } from '../../components/countries-table/countries-table.component';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/countries.interface';

@Component({
  selector: 'app-by-language',
  standalone: true,
  imports: [SearchBoxComponent, CountriesTableComponent],
  templateUrl: './by-language.component.html',
  styles: ``
})
export class ByLanguageComponent {
  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) { }

  searchByCapital( term: string ): void{
    this.countriesService.searchLanguage(term)
      .subscribe( countries => {
        this.countries = countries;
      });
  }

  ngOnInit(): void {
  }

}
