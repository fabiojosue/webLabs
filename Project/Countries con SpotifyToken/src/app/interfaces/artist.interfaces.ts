// artist.interfaces.ts

export interface ArtistExternalUrls {
    spotify: string;
  }
  
  export interface Followers {
    href: string;
    total: number;
  }
  
  export interface ArtistImage {
    url: string;
    height: number;
    width: number;
  }
  
  export interface Artist {
    external_urls: ArtistExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: ArtistImage[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
  }
  