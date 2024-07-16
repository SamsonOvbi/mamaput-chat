import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from '../../services/blog.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { BlogData } from '../../models/blog-model';
import { swalFireWarning, swalMixin } from '../../../../shared/constants';
import { MessageDialogComponent } from 'src/app/shared/dialogs';
import { UserService } from 'src/app/features/users/services/user.service';
import { quillConfig } from '../../components/write-form/models/quill-config';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editblog',
  templateUrl: './editblog.component.html',
  styleUrls: [
    './editblog.component.scss',
    '../writeblog/writeblog.component.scss',
  ],
})
export class EditblogComponent implements OnInit, OnDestroy {
  public modules = quillConfig;
  public htmlContent: any = '';
  public editorValue: any = '';
  editorForm: FormGroup;
  configData: any;
  public imageSrc: any;
  public file: any;
  public data: any;
  public id: string | null | undefined;
  contentLoaded = false;
  apiUrl = environment.apiUrl;
  numViews = 0;
  numReviews = 0;
  blogSubscription: Subscription = Subscription.EMPTY;
  dialogSubscription: Subscription = Subscription.EMPTY;
  private subscriptions: Subscription[] = [];

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    public dialog: MatDialog,
    private renderer: Renderer2,
    private blogService: BlogService,
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.editorForm = this._fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
      content: ['', [Validators.required]],
      image: [''],
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    this.blogSubscription = this.blogService.getSingleBlog(this.id).subscribe((res: any) => {
      this.data = res.data;
      this.editorForm.controls['title'].patchValue(res.data.title);
      this.editorForm.controls['description'].patchValue(res.data.description);
      this.editorForm.controls['content'].patchValue(res.data.content);
      this.editorValue = res.data.content;
      this.imageSrc = this.data.image;
      this.editorForm.controls['image'].patchValue(this.imageSrc);
    });
    this.subscriptions.push(this.blogSubscription);
  }

  onFormSubmit(data: any) {
    this.editorForm.patchValue(data);
    console.log('this.editorForm.value', this.editorForm.value);
  }

  saveEditor() {
    if (this.editorForm.valid) {
      this.blogSubscription = this.blogService.updateBlog(this.editorForm.value, this.id).subscribe((res: any) => {
        Swal.fire({ title: 'Your Blog Published SuccessFully', icon: 'success', position: 'center', showConfirmButton: false, timer: 1500, });
        this.router.navigate(['/blogs/blog-details', res.post._id]);
      });
      this.subscriptions.push(this.blogSubscription);
    }
  }
  returnToDraft() {
    if (this.editorForm.valid) {
      this.blogSubscription = this.blogService.returnToDraft(this.editorForm.value, this.id).subscribe((res: any) => {
        Swal.fire({ title: 'Your Blog Returned To Draft', icon: 'success', position: 'center', showConfirmButton: false, timer: 1500, });
        console.log({ 'res.draft._id': res.draft._id });
        this.router.navigate(['/profile/draft']);
      });
      this.subscriptions.push(this.blogSubscription);
    }
  }
  open(content: any) {
    this.modalService.open(content);
  }

  openMsgDialog(): void {
    const dialogOptions = {
      width: '100%', height: 'auto', data: { ...this.editorForm.value, },
    }
    const dialogRef = this.dialog.open(MessageDialogComponent, dialogOptions);

    this.dialogSubscription = dialogRef.afterClosed().subscribe((result) => { });
    this.subscriptions.push(this.dialogSubscription);
  }

  handleInputFile(files: FileList) {
    // console.log('file..');
  }

  fireEvent() {
    let fire = false;
    Swal.fire({
      ...swalFireWarning, icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log('isConfirmed...!');
        // Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        fire = true;
        return fire;
      } else {
        fire = false;
        return false;
      }
    });
    return fire;
  }

  resetBlog() {
    this.editorForm.reset();
    this.file = undefined;
    this.imageSrc = undefined;
  }

  canExit() {
    if (this.editorForm.dirty) {
      const confResult = confirm('Are you sure you want to leave');
      return confResult ? true : false;
    }
    return true;
  }

  get content() {
    return this.editorForm.value['content'];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
