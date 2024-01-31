import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BySongComponent } from './by-song.component';

describe('BySongComponent', () => {
  let component: BySongComponent;
  let fixture: ComponentFixture<BySongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BySongComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BySongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
