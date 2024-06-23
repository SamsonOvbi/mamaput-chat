import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
// import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  // styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  appTitle = '';

  constructor(private sharedService: SharedService,) { }

  ngOnInit(): void {
    this.appTitle = this.sharedService.appTitle;
  }

}
