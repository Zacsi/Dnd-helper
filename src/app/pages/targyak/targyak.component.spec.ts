import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargyakComponent } from './targyak.component';

describe('TargyakComponent', () => {
  let component: TargyakComponent;
  let fixture: ComponentFixture<TargyakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TargyakComponent]
    });
    fixture = TestBed.createComponent(TargyakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
