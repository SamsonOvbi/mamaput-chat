import { ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { IDeactivateGuard } from '../../../auth/helpers/deactivate.guard';
import Swal from 'sweetalert2';
import Quill from 'quill';
import { BlogData } from '../../models/blog-model';
import { BlogService } from '../../services/blog.service';
import { DraftService } from '../../../drafts/services/draft.service';
import { MessageDialogComponent } from 'src/app/shared/dialogs';
import { UserService } from 'src/app/features/users/services/user.service';
import { swalFireWarning } from 'src/app/shared/constants';
import { quillConfig } from '../../components/write-form/models/quill-config';

@Component({
  selector: 'app-writeblog',
  templateUrl: './writeblog.component.html',
  styleUrls: ['./writeblog.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})

export class WriteblogComponent implements OnInit, IDeactivateGuard, OnDestroy {
  public modules = quillConfig;
  public htmlContent: any = '';
  public editorValue: any = '';
  editorForm!: FormGroup;
  configData: any;
  quill!: Quill;
  public imageSrc: any;
  public file: any;
  public data: any;
  public id: string | null | undefined;
  contentLoaded = false;
  numViews = 0;
  numReviews = 0;
  blogSubscription: Subscription = Subscription.EMPTY;
  draftSubscription: Subscription = Subscription.EMPTY;
  dialogSubscription: Subscription = Subscription.EMPTY;
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRouter: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    public dialog: MatDialog,
    private renderer: Renderer2,
    private blogService: BlogService,
    private draftService: DraftService,
    private userService: UserService,
    private router: Router
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.editorForm = this._fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      content: ['', [Validators.required]],
      image: [''],
    });
  }

  ngOnInit(): void {
  }

  onFormSubmit(data: any) {
    this.editorForm.patchValue(data);
    console.log('this.editorForm.value', this.editorForm.value);
  }

  publishBlog() {
    try {
      if (this.editorForm.valid) {
        this.blogSubscription = this.blogService.saveBlogData(this.editorForm.value).subscribe((res: any) => {
          // console.log('res value saved', res);
          this.resetBlog();
          Swal.fire({ title: 'Your Blog Published SuccessFully', icon: 'success', position: 'center', showConfirmButton: false, timer: 1500, });
          this.router.navigate(['/blogs/blog-details', res.post._id]);
        });
        this.subscriptions.push(this.blogSubscription);
      } else {
        console.log(`this.editorForm.valid:   `, this.editorForm.valid);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  saveAsDraft() {
    try {
      if (this.editorForm.valid) {
        this.draftSubscription = this.draftService.saveAsDraft(this.editorForm.value).subscribe((res: any) => {
          this.resetBlog();
          Swal.fire({
            position: 'center', icon: 'success', title: 'Saved in Draft  SuccessFully', showConfirmButton: false, timer: 1500,
          });
          this.router.navigate(['/profile/draft']);
        });
        this.subscriptions.push(this.draftSubscription);
      }
      // console.log(this.editorForm.value);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  resetBlog() {
    this.editorForm.reset();
    this.file = undefined;
    this.imageSrc = undefined;
  }

  open(content: any) {
    this.modalService.open(content);
  }

  openMsgDialog(): void {
    const dialogOptions = {
      width: '100%', height: 'auto', data: { ...this.editorForm.value, },
    }
    const dialogRef = this.dialog.open(MessageDialogComponent, dialogOptions);

    this.dialogSubscription = dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
    this.subscriptions.push(this.dialogSubscription);
  }

  handleInputFile(files: FileList) {
    // console.log({ files });
  }


  fireEvent() {
    let fire = false;
    Swal.fire({
      ...swalFireWarning, icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        fire = true;
        return fire;
      } else {
        fire = false;
        return false;
      }
    });
    return fire;
  }

  canExit() {
    if (this.title !== null || this.description !== null) {
      if (
        this.title.length > 0 || this.description.length > 0 || this.content.length > 0
      ) {
        const confResult = confirm('Are you sure you want to leave? All the Changes will be discarded');
        return confResult ? true : false;
      }
    }
    return true;
  }

  get title() {
    return this.editorForm.value['title'];
  }
  get description() {
    return this.editorForm.value['description'];
  }
  get content() {
    return this.editorForm.value['content'];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
