import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationMsgComponent } from './validation-msg.component';

describe('ValidationMsgComponent', () => {
  let component: ValidationMsgComponent;
  let fixture: ComponentFixture<ValidationMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationMsgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
