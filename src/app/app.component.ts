import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'angular-admin-lte';
import { SessionTimerService } from 'session-expiration-alert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public customLayout: boolean;
  alertAt = 15;
  startTimer = true;
  constructor(
    private layoutService: LayoutService,
    public sessionTimer: SessionTimerService
  ) {}

  ngOnInit() {
    this.layoutService.isCustomLayout.subscribe((value: boolean) => {
      this.customLayout = value;
    });
  }
  increase() {
    this.alertAt++;
  }
  toggletimer() {
    this.startTimer = !this.startTimer;
  }
}
