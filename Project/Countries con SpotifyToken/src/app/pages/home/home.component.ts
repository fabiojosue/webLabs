import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { SpotifyService } from '../../services/spotify.service';
import { Albums, SpotifyResponse } from '../../interfaces/album.interfaces';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CardComponent } from "../../components/card/card.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HeaderComponent, MatCardModule, MatButtonModule, CardComponent]
})
export class HomeComponent {
  albums: SpotifyResponse[] = [];
  
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.spotifyService.getNewReleases().subscribe(
      (albums) => {
        if (albums) {
          this.albums.push(albums);
          console.log('List of Albums:', this.albums);
          console.log('List of Albums:', this.albums[0].albums.items[0].images[0].url);
        } else {
          console.error('Failed to fetch albums.');
        }
      }
    );
    //console.log('List of Albums:', this.albums[0].items[0].images[0].url);
  }

}
