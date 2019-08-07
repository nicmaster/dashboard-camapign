import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSmsComponent } from './sendsms.component';

import { AccordionModule, BoxModule } from 'angular-admin-lte';

describe('SendSmsComponent', () => {
  let component: SendSmsComponent;
  let fixture: ComponentFixture<SendSmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AccordionModule,
        BoxModule
      ],
      declarations: [ SendSmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
