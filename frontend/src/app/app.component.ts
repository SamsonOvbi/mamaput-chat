import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from './shared/services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  appTitle = '';
  public editorValue: string = '';
  public loading!: boolean;
  sharedSubscription: Subscription = Subscription.EMPTY;
  private subscriptions: Subscription[] = [];
  
  constructor(
    private sharedService: SharedService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.appTitle = this.sharedService.appTitle;
    this.sharedSubscription = this.sharedService.loading.subscribe((res) => {
      this.loading = res;
      this.cdRef.detectChanges();
    });
    this.subscriptions.push(this.sharedSubscription);
  }

  checkValue() {
    console.log('this.editorValue', this.editorValue);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
