import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EllensegekComponent } from './ellensegek.component';

describe('EllensegekComponent', () => {
  let component: EllensegekComponent;
  let fixture: ComponentFixture<EllensegekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EllensegekComponent]
    });
    fixture = TestBed.createComponent(EllensegekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
