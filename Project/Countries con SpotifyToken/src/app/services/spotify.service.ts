import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { SpotiToken } from '../interfaces/spotify.interfaces';
import { Albums, SpotifyResponse } from '../interfaces/album.interfaces';
import { ArtistTopTracks } from '../interfaces/artistTopTracks.interfaces';
import { Artist } from '../interfaces/artist.interfaces';
import { AlbumsResponse } from '../interfaces/several-albums.interfaces';
import { AlbumSolo } from '../interfaces/get-album.interfaces';
import { Tracks } from '../interfaces/several-songs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private clientId: string = '691d103193dd49c5a81de3fd5bb7bc21';
  private clientSecret: string = '0f020fd39f9d44b4bf4ea4f28265c836';
  tokenUrl: string = "https://accounts.spotify.com/api/token";
  idAndSecret: string = btoa(this.clientId + ":" + this.clientSecret);
  private token: string = '';
  http: any;

constructor(private httpClient: HttpClient) { }

// body = {
//     'grant_type': "client_credentials",
// };
body = 'grant_type=client_credentials';

options = {
    headers: new HttpHeaders({
        'Authorization': 'Basic '.concat(this.idAndSecret),
        'Content-Type': 'application/x-www-form-urlencoded',
    })
};

  getAccessToken_(  ): string{
    const url = this.tokenUrl;
    this.httpClient.post<SpotiToken>(url,this.body, this.options)
      .pipe(
        map(response => response.access_token),
        catchError(()=> of(''))
      )
      .subscribe(token=> {this.token = token;});

      return this.token;
  }  

  getAccessToken(  ): Observable<SpotiToken|null>{
    const url = this.tokenUrl;
    return this.httpClient.post<SpotiToken>(url,this.body, this.options)
      .pipe(
        catchError(()=> of(null))
      )
    }
    
    getNewReleases(): Observable<SpotifyResponse | null> {
      const releasesUrl = 'https://api.spotify.com/v1/browse/new-releases';
    
      return this.getAccessToken().pipe(
        switchMap((token) => {
          if (token) {
            const headers = new HttpHeaders({
              Authorization: `Bearer ${token.access_token}`
            });
    
            return this.httpClient.get<SpotifyResponse>(releasesUrl, { headers });
          } else {
            return of(null);
          }
        }),
        catchError(() => of(null))
      );
    }
    
    
  getTopTracks(artistId: string): Observable<ArtistTopTracks | null> {
    const topTracksUrl = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=CR`;

    return this.getAccessToken().pipe(
      switchMap((token) => {
        if (token) {
          const headers = new HttpHeaders({
            Authorization: `Bearer ${token.access_token}`
          });

          return this.httpClient.get<ArtistTopTracks>(topTracksUrl, { headers });
        } else {
          return of(null);
        }
      }),
      catchError(() => of(null))
    );
  }

  getArtist(artistId: string): Observable<Artist | null> {
    const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;

    return this.getAccessToken().pipe(
      switchMap((token) => {
        if (token) {
          const headers = new HttpHeaders({
            Authorization: `Bearer ${token.access_token}`
          });

          return this.httpClient.get<Artist>(artistUrl, { headers });
        } else {
          return of(null);
        }
      }),
      catchError(() => of(null))
    );
  }

  getAlbums(type: string, query: string, market: string, limit: number, offset: number): Observable<AlbumsResponse | null> {
    const albumsUrl = 'https://api.spotify.com/v1/search';
    const params = new HttpParams()
      .set('type', type)
      .set('q', query)
      .set('market', market)
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.getAccessToken().pipe(
      switchMap((token) => {
        if (token) {
          const headers = new HttpHeaders({
            Authorization: `Bearer ${token.access_token}`
          });

          return this.httpClient.get<AlbumsResponse>(albumsUrl, { headers, params });
        } else {
          return of(null);
        }
      }),
      catchError(() => of(null))
    );
  }

  

  getAlbum(albumId: string): Observable<AlbumSolo | null> {
    const albumUrl = `https://api.spotify.com/v1/albums/${albumId}`;

    return this.getAccessToken().pipe(
      switchMap((token) => {
        if (token) {
          const headers = new HttpHeaders({
            Authorization: `Bearer ${token.access_token}`
          });

          return this.httpClient.get<AlbumSolo>(albumUrl, { headers });
        } else {
          return of(null);
        }
      }),
      catchError(() => of(null))
    );
  }

  searchTracks(type: string, query: string, market: string, limit: number, offset: number): Observable<any> {
    const searchUrl = 'https://api.spotify.com/v1/search';
    const params = new HttpParams()
      .set('type', type)
      .set('q', query)
      .set('market', market)
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.getAccessToken().pipe(
      switchMap((token) => {
        if (token) {
          const headers = new HttpHeaders({
            Authorization: `Bearer ${token.access_token}`
          });

          return this.httpClient.get(searchUrl, { headers, params });
        } else {
          return of(null);
        }
      }),
      catchError(() => of(null))
    );
  }


    
    
}
