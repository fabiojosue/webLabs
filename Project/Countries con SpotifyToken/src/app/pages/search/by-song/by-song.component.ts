import { Component } from '@angular/core';
import { Tracks } from '../../../interfaces/several-songs.interfaces';
import { SpotifyService } from '../../../services/spotify.service';
import { SearchBoxComponent } from "../../../shared/components/search-box/search-box.component";
import { CardComponent } from "../../../components/card/card.component";

@Component({
    selector: 'app-by-song',
    standalone: true,
    templateUrl: './by-song.component.html',
    styleUrl: './by-song.component.css',
    imports: [SearchBoxComponent, CardComponent]
})
export class BySongComponent {
  tracks? : Tracks;

  constructor(private spotifyService: SpotifyService) { }

  getSongs( artist: string ): void {
      this.spotifyService.searchTracks('track', artist, 'CR', 10, 0 )
          .subscribe( tracks => {
            console.log("newww", tracks.tracks.items);
            this.tracks = tracks!.tracks;
              
          });
  }
}
