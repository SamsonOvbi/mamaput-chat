import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { DraftService } from '../../services/draft.service';

@Component({
  selector: 'app-draft-detail',
  templateUrl: './draft-detail.component.html',
  styleUrls: ['./draft-detail.component.css'],
})
export class DraftDetailComponent implements OnInit {
  public data: any;
  public id: string | null | undefined;
  contentLoaded = false;
  ngxLoaderTheme = {
    margin: '0 auto', width: '50%', height: '40px', display: 'flex',
    'justify-content': 'center', 'margin-bottom': '26px'
  };
  public apiUrl = environment.apiUrl;

  constructor(
    private activatedRouter: ActivatedRoute,
    private draftService: DraftService,
    public sanitizer: DomSanitizer
  ) { }
  ngOnInit(): void {    
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    // this.activatedRouter.paramMap.subscribe((params: any) => {
    //   this.id = params.get('id');
    // });
    console.log('id...', this.id);
    this.draftService.getSingleDraft(this.id).subscribe((res: any) => {
      console.log('res data..', res);
      this.data = res.data;
      let imagename = this.data.image;
      this.data.image = environment.apiUrl + '/img/' + imagename;
      this.contentLoaded = true;
      // console.log('the value of data', this.data);
    });
  }

}
