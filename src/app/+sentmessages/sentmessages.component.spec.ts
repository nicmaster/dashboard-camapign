import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentMessagesComponent } from './sentmessages.component';

import { AlertModule, BoxModule } from 'angular-admin-lte';

describe('AlertComponent', () => {
  let component: SentMessagesComponent;
  let fixture: ComponentFixture<SentMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AlertModule,
        BoxModule
      ],
      declarations: [ SentMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
