import { Component, Input } from '@angular/core';
import { AlbumItem, Albums } from '../../interfaces/album.interfaces';
import { RouterModule } from '@angular/router'; // Add this import
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Album, AlbumsResponse } from '../../interfaces/several-albums.interfaces';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Tracks } from '../../interfaces/several-songs.interfaces';

@Component({
  selector: 'card-component',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  constructor(private route: ActivatedRoute, private router: Router,private sanitizer: DomSanitizer) { }
  @Input() albums? : any;
  @Input() isAlbumSearch = false;
  @Input() card? : Tracks;

  ngOnInit() {
    console.log(this.isAlbumSearch);
  }

  save(id : string){
    this.router.navigate(['/artist', id, id, 'tracks']);
  }
  getSafeUrl(trackId: string): SafeResourceUrl {
    const url = `https://open.spotify.com/embed/track/${trackId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
