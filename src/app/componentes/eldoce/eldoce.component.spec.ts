import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EldoceComponent } from './eldoce.component';

describe('EldoceComponent', () => {
  let component: EldoceComponent;
  let fixture: ComponentFixture<EldoceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EldoceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EldoceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
