import { Component } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent {
  public country?: Country;
  //public country?: Country | null = null;

  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService
  ){}

  ngOnInit(): void {
    
    this.activedRoute.params
      .pipe(
        switchMap(({id}) => this.countriesService.searchCountryByAlphaCode(id))
      )
      .subscribe (country => {
        if(!country) return this.router.navigateByUrl('');
        else return this.country = country;
      });

    // this.activedRoute.params.subscribe(
    //   parametros => {
    //     console.log(parametros['id']);
    //     this.countriesService.searchCountryByAlphaCode(parametros['id'])
    //       .subscribe(country =>{
    //         if (!country){
    //           console.log('null');
    //           return;
    //         }else{
    //           console.log(country);
    //           this.country = country;
    //           return;
    //         }
    //       })
    //   }
    // );



    
  }

  goBack() {
    window.history.back();
  }



}
