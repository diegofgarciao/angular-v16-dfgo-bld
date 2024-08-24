import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCardComponent } from './total-card.component';

describe('TotalCardComponent', () => {
  let component: TotalCardComponent;
  let fixture: ComponentFixture<TotalCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalCardComponent]
    });
    fixture = TestBed.createComponent(TotalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
