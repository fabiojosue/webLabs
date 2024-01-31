import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
import { ByCapitalPageComponent } from './countries/pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './countries/pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './countries/pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './countries/pages/country-page/country-page.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { ByArtistComponent } from './pages/search/by-artist/by-artist.component';
import { BySongComponent } from './pages/search/by-song/by-song.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path:       '',
        component:  HomeComponent
    },
    {
        path:       'search',
        children: [
            {
                path:   'by-artists',
                component:  ByArtistComponent
            },
            {
                path:   'by-song',
                component:  BySongComponent
            }
        ]
    },
    {
        path:       'about',
        component:  AboutPageComponent
    },
    {
        path:       'contact',
        component:  ContactPageComponent
    },
    {
        path:       'artist/:artistId/:id/:type',
        component:  ArtistComponent
    },
    {
        path:       'login',
        component:  LoginComponent
    },
    {
        path:       'countries',
        children: [
            {
                path:   'by-capital',
                component:  ByCapitalPageComponent
            },
            {
                path:   'by-country',
                component:  ByCountryPageComponent
            },
            {
                path:   'by-region',
                component:  ByRegionPageComponent
            },
            {
                path:   'by/:id',
                component:  CountryPageComponent
            },
            {
                path:   '**',
                redirectTo: 'by-capital'
            }
        ]
    },
    {
        path:       '**',
        redirectTo:  ''
    },

];
