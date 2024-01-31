export interface ExternalUrls {
    spotify: string;
  }
  
export interface Followers {
    href: string;
    total: number;
  }
  
  export interface Image {
    url: string;
    height: number;
    width: number;
  }
  
  export interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
  
  export interface Tracks {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: Track[];
  }
  
  export interface Restrictions {
    reason: string;
  }
  
  export interface AlbumSolo {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: Restrictions;
    type: string;
    uri: string;
    artists: Artist[];
    tracks: Tracks;
    copyrights: Copyright[];
    external_ids: ExternalIds;
    genres: string[];
    label: string;
    popularity: number;
  }
  
  export interface ExternalIds {
    isrc: string;
    ean: string;
    upc: string;
  }
  
  export interface Copyright {
    text: string;
    type: string;
  }
  
  export interface TrackExternalUrls {
    spotify: string;
  }
  
  export interface TrackArtists {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
  
  export interface LinkedFromExternalUrls {
    spotify: string;
  }
  
  export interface LinkedFrom {
    external_urls: LinkedFromExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
  }
  
  export interface TrackRestrictions {
    reason: string;
  }
  
  export interface Track {
    artists: TrackArtists[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: TrackExternalUrls;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: LinkedFrom;
    restrictions: TrackRestrictions;
    name: string;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
  }
  
  export interface Copyright {
    text: string;
    type: string;
  }
  
  export interface ExternalIds {
    isrc: string;
    ean: string;
    upc: string;
  }
  