import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetlogidduserinfoComponent } from './getlogidduserinfo.component';

describe('GetlogidduserinfoComponent', () => {
  let component: GetlogidduserinfoComponent;
  let fixture: ComponentFixture<GetlogidduserinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetlogidduserinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetlogidduserinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
