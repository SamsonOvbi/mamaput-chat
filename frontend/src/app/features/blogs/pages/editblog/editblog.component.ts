import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from '../../services/blog.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { modulesQuill } from 'src/app/models/types';
import { BlogData } from '../../models/blog-model';
import { MessageDialogComponent } from '../../../dialogs';
import { swalFireWarning, swalMixin } from '../../../../shared/constants';

@Component({
  selector: 'app-editblog',
  templateUrl: './editblog.component.html',
  styleUrls: [
    './editblog.component.css',
    '../writeblog/writeblog.component.css',
  ],
})
export class EditblogComponent implements OnInit {
  public modules = modulesQuill;
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
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.editorForm = this._fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
      content: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    this.activatedRouter.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
      // console.log('id...', this.id);
    });
    this.blogService.getSingleBlog(this.id).subscribe((res: any) => {
      // console.log('res data..', res);
      this.data = res.data;
      this.editorForm.controls['title'].patchValue(res.data.title);
      this.editorForm.controls['description'].patchValue(res.data.description);
      this.editorValue = res.data.content;
      let imagename = this.data.image;
      this.imageSrc = environment.apiUrl + '/img/' + imagename;
    });
  }

  saveEditor() {
    const data: BlogData = {
      title: this.title, description: this.description, content: this.content, category: this.category, image: this.file.name,
      status: this.status, visibility: this.visibility, numReviews: this.getNumReviews,
      numViews: this.getNumViews,
    }
    if (!this.file) {
      if (this.editorForm.valid) {
        this.blogService.updateBlog(data, this.id).subscribe((res: any) => {
          Swal.fire({ title: 'Your Blog Published SuccessFully', icon: 'success', position: 'center', showConfirmButton: false, timer: 1500, });
          this.router.navigate(['/blogs/blog-details', res.post._id]);
          // console.log('res value saved', res);
        });
      }
    } else {
      console.log({ data });
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('content', this.content);
      formData.append('image', this.file);
      formData.append('description', this.description);
      console.log({ data });
      if (this.editorForm.valid) {
        // this.blogService.updateBlog(formData, this.id).subscribe((res: any) => {
        this.blogService.updateBlog(data, this.id).subscribe((res: any) => {
          Swal.fire({ title: 'Your Blog Published SuccessFully', icon: 'success', position: 'center', showConfirmButton: false, timer: 1500, });
          this.router.navigate(['/blogs/blog-details', res.post._id]);
        });
      }
    }
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
  get category() {
    return this.editorForm.value['category'] || 'educational';
  }
  get status() {
    return this.editorForm.value['status'] || 'published';
  }
  get visibility() {
    return this.editorForm.value['visibility'] || 'public';
  }
  get getNumViews() {
    return this.numViews++;
  }
  get getNumReviews() {
    return this.numReviews++;
  }

  open(content: any) {
    this.modalService.open(content);
  }

  openDialog(): void {
    const dialogOptions = {
      width: '100%',
      height: 'auto',
      data: { title: this.title, content: this.content, thumbnailImage: this.imageSrc, },
    }
    const dialogRef = this.dialog.open(MessageDialogComponent, dialogOptions);

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  handleInputFile(files: FileList) {
    // console.log('file..');
  }

  uploadFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.file = fileList[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.file);

      // this.renderer.setStyle(Elemen)
      // console.log('FileUpload -> files', fileList);
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
