import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EllensegKrealasComponent } from './ellenseg-krealas.component';

describe('EllensegKrealasComponent', () => {
  let component: EllensegKrealasComponent;
  let fixture: ComponentFixture<EllensegKrealasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EllensegKrealasComponent]
    });
    fixture = TestBed.createComponent(EllensegKrealasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
