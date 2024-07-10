import { Component, OnInit, Renderer2 } from '@angular/core';
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
import { quillConfig } from '../../components/write-form/models/quill-editor/quill-config';

@Component({
  selector: 'app-editblog',
  templateUrl: './editblog.component.html',
  styleUrls: [
    './editblog.component.scss',
    '../writeblog/writeblog.component.scss',
  ],
})
export class EditblogComponent implements OnInit {
  public modules = quillConfig;
  public htmlContent: any = '';
  public editorValue: any = '';
  editorForm: FormGroup;
  public imageSrc: any;
  public file: any;
  public data: any;
  public id: string | null | undefined;
  contentLoaded = false;
  apiUrl = environment.apiUrl;
  numViews = 0;
  numReviews = 0;

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
    this.blogService.getSingleBlog(this.id).subscribe((res: any) => {
      this.data = res.data;
      this.editorForm.controls['title'].patchValue(res.data.title);
      this.editorForm.controls['description'].patchValue(res.data.description);
      this.editorForm.controls['content'].patchValue(res.data.content);
      this.editorValue = res.data.content;
      this.imageSrc = this.data.image;
      this.editorForm.controls['image'].patchValue(this.imageSrc);
    });
  }

  saveEditor() {
    if (this.editorForm.valid) {
      this.blogService.updateBlog(this.editorForm.value, this.id).subscribe((res: any) => {
        Swal.fire({ title: 'Your Blog Published SuccessFully', icon: 'success', position: 'center', showConfirmButton: false, timer: 1500, });
        this.router.navigate(['/blogs/blog-details', res.post._id]);
      });
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

    dialogRef.afterClosed().subscribe((result) => { });
  }

  handleInputFile(files: FileList) {
    // console.log('file..');
  }

  uploadFile(event: any) {
    const file: File = event?.target.files[0];
    this.file = file.name;
    if (file) {
      this.userService.uploadImage(file).subscribe((res: any) => {
        this.imageSrc = res.secure_url;
        this.editorForm.controls['image']?.patchValue(res.secure_url);
        // this.getUserProfile();
      });
    }
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

  onEditorBlured(event: any) {
    // Handle blur event if needed
    console.log('Editor blur event', event);
  }

}
