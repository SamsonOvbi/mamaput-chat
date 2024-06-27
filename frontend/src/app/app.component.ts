import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedService } from './shared/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  appTitle = '';
  public editorValue: string = '';
  public loading!: boolean;
  
  constructor(
    private sharedService: SharedService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.appTitle = this.sharedService.appTitle;
    this.sharedService.loading.subscribe((res) => {
      this.loading = res;
      this.cdRef.detectChanges();
    });
  }

  checkValue() {
    console.log('this.editorValue', this.editorValue);
  }
}
