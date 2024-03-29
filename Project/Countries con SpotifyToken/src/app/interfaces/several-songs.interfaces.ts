export interface ExternalUrls {
    spotify: string;
  }
  
  export interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
  
  export interface Image {
    height: number;
    url: string;
    width: number;
  }
  
  export interface Album {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  }
  
  export interface ExternalIds {
    ean: string;
    isrc: string;
    upc: string;
  }
  
  export interface Restrictions {
    reason: string;
  }
  
  export interface TrackExternalUrls {
    spotify: string;
  }
  
  export interface TrackExternalIds {
    isrc: string;
  }
  
  export interface Track {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: TrackExternalIds;
    external_urls: TrackExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  }
  
  export interface Tracks {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
    items: Track[];
  }
  