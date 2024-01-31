import { Component, Input, NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

import { CommonModule } from '@angular/common'; // Import CommonModule
import { JsonPipe } from '@angular/common'; // Import JsonPipe
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlbumSolo } from '../../../interfaces/get-album.interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'songs-table',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './songs-table.component.html',
  styleUrl: './songs-table.component.css'
})
export class SongsTableComponent {
  constructor(private sanitizer: DomSanitizer,private route: ActivatedRoute) { }

  @Input() songs: any[] = [];
  @Input() albumTracks? : AlbumSolo;

  displayedColumns: string[] = ['Photo', 'Album', 'Song', 'Preview'];
  dataSource: any;
  type:any;

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type');

    console.log('photoooooo:', this.albumTracks!.images[0]);
    if (this.type == 'tracks') {
      this.dataSource = this.songs[0].tracks;
    }
    
    
  }

  getSafeUrl(trackId: string): SafeResourceUrl {
    const url = `https://open.spotify.com/embed/track/${trackId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
