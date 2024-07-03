import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-not-loaded',
  templateUrl: './not-loaded.component.html',
  styleUrls: ['./not-loaded.component.scss'],
})
export class NotLoadedComponent implements OnInit {
  @Input() contentLoaded = false;
  @Input() noDataFound: boolean = false;
  alertOpt: SweetAlertOptions = {};
  appTitle = '';

  constructor(public sanitizer: DomSanitizer,) { }

  ngOnInit(): void { }

  counter(i: number) {
    return new Array(i);
  }

}
