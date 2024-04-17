import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargyComponent } from './targy.component';

describe('TargyComponent', () => {
  let component: TargyComponent;
  let fixture: ComponentFixture<TargyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TargyComponent]
    });
    fixture = TestBed.createComponent(TargyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
