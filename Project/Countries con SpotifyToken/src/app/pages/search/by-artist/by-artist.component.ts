import { Component } from '@angular/core';
import { SearchBoxComponent } from "../../../shared/components/search-box/search-box.component";
import { AlbumsResponse } from '../../../interfaces/several-albums.interfaces';
import { SpotifyService } from '../../../services/spotify.service';
import { CardComponent } from "../../../components/card/card.component";

@Component({
    selector: 'app-by-artist',
    standalone: true,
    templateUrl: './by-artist.component.html',
    styleUrl: './by-artist.component.css',
    imports: [SearchBoxComponent, CardComponent]
})
export class ByArtistComponent {
    albums? : AlbumsResponse;

    constructor(private spotifyService: SpotifyService) { }

    getAlbums( artist: string ): void {
        this.spotifyService.getAlbums('album', artist, 'CR', 10, 0 )
            .subscribe( albums => {
                this.albums = albums!;
                console.log( albums?.albums.items );
            });
    }

}
