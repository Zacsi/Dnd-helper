import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarakterekComponent } from './karakterek.component';

describe('KarakterekComponent', () => {
  let component: KarakterekComponent;
  let fixture: ComponentFixture<KarakterekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KarakterekComponent]
    });
    fixture = TestBed.createComponent(KarakterekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

