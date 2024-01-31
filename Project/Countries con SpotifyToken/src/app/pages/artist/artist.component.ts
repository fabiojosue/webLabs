import { Component, Input } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { ArtistTopTracks } from '../../interfaces/artistTopTracks.interfaces';
import { Artist } from '../../interfaces/artist.interfaces';
import { SongsTableComponent } from "../../shared/components/songs-table/songs-table.component";
import { AlbumSolo } from '../../interfaces/get-album.interfaces';

@Component({
    selector: 'app-artist',
    standalone: true,
    templateUrl: './artist.component.html',
    styleUrl: './artist.component.css',
    imports: [SongsTableComponent]
})
export class ArtistComponent {
  artist? : Artist;
  topTracks : ArtistTopTracks[] = [];
  albumTracks? : AlbumSolo;
  type:any;
  constructor(private route: ActivatedRoute,private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('artistId');
    const idAlbum = this.route.snapshot.paramMap.get('id');
    this.type = this.route.snapshot.paramMap.get('type');
    console.log(id);

    this.spotifyService.getArtist(id!).subscribe(
      (artist) => {
        if (artist) {
          this.artist = artist;
          console.log('Artist:', artist);
        } else {
          console.error('Failed to fetch artist.');
        }
      }
    );

    if (this.type == 'tracks') {
      this.spotifyService.getTopTracks(id!).subscribe(
        (topTracks) => {
          if (topTracks) {
            this.topTracks.push(topTracks);
            console.log('List of topTracks:', topTracks);
          } else {
            console.error('Failed to fetch topTracks.');
          }
        }
      );
    }
    if (this.type == 'album') {
      this.spotifyService.getAlbum(idAlbum!).subscribe(
        (tracks) => {
          if (tracks) {
            this.albumTracks = tracks;
            console.log('List of album:', tracks);
          } else {
            console.error('Failed to fetch topTracks.');
          }
        }
      );
    }

  }
}
