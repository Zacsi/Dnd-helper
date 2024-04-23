import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyheroComponent } from './myhero.component';

describe('MyheroComponent', () => {
  let component: MyheroComponent;
  let fixture: ComponentFixture<MyheroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyheroComponent]
    });
    fixture = TestBed.createComponent(MyheroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
