import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DobokockaComponent } from './dobokocka.component';

describe('DobokockaComponent', () => {
  let component: DobokockaComponent;
  let fixture: ComponentFixture<DobokockaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DobokockaComponent]
    });
    fixture = TestBed.createComponent(DobokockaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
