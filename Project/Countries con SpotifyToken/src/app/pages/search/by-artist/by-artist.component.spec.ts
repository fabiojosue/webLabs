import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByArtistComponent } from './by-artist.component';

describe('ByArtistComponent', () => {
  let component: ByArtistComponent;
  let fixture: ComponentFixture<ByArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByArtistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ByArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
