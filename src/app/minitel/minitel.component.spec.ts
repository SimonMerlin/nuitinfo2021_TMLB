import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinitelComponent } from './minitel.component';

describe('MinitelComponent', () => {
  let component: MinitelComponent;
  let fixture: ComponentFixture<MinitelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinitelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinitelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
