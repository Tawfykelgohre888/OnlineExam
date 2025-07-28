import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RESETPASSWORDComponent } from './resetpassword.component';

describe('RESETPASSWORDComponent', () => {
  let component: RESETPASSWORDComponent;
  let fixture: ComponentFixture<RESETPASSWORDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RESETPASSWORDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RESETPASSWORDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
