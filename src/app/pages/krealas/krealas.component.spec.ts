import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrealasComponent } from './krealas.component';

describe('KrealasComponent', () => {
  let component: KrealasComponent;
  let fixture: ComponentFixture<KrealasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KrealasComponent]
    });
    fixture = TestBed.createComponent(KrealasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
