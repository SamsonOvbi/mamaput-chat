import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDeactivateGuard } from '../../../auth/helpers/deactivate.guard';
import Swal from 'sweetalert2';
import { MessageDialogComponent } from 'src/app/shared/dialogs';
import { UserService } from 'src/app/features/users/services/user.service';
import { swalFireWarning } from 'src/app/shared/constants';
import Quill from 'quill';
import { quillConfig } from './models/quill-editor/quill-config';

@Component({
  selector: 'app-write-form',
  templateUrl: './write-form.component.html',
  styleUrls: ['./write-form.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})

export class WriteFormComponent implements OnInit, IDeactivateGuard {
  @Input() initialData: any;
  @Output() formSubmit = new EventEmitter<any>();

  public modules = quillConfig;
  public htmlContent: any = '';
  public editorValue: any = 'Write Short content in less then 500 words..';
  editorForm!: FormGroup;
  quill!: Quill;
  public imageSrc: any;
  public file: any;
  public data: any;
  public id: string | null | undefined;
  contentLoaded = false;
  numViews = 0;
  numReviews = 0;

  constructor(
    private cdRef: ChangeDetectorRef,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    public dialog: MatDialog,
    private userService: UserService,
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
    // this.initQuillContainer();
    if (this.initialData) {
      this.editorForm.patchValue(this.initialData);
      this.imageSrc = this.initialData.image;
    }
  }

  onSubmit() {
    try {
      if (this.editorForm.valid) {
        const formData: any = { ...this.editorForm.value, image: this.imageSrc, };
        this.formSubmit.emit(formData);
        console.log({ onSubmit_formData: formData });
        this.editorForm.patchValue(formData);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  onClear() {
    this.editorForm.reset();
    this.file = undefined;
    this.imageSrc = undefined;
  }

  initQuillContainer(): void {
    const container = document.getElementById('quill-editor');
    if (container) {
      this.quill = new Quill(container,
        { modules: quillConfig, placeholder: 'Write Short content in less then 5000 words..', theme: 'snow', });
    } else {
      console.error('Failed to find Quill container element');
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

  onPreview() {
    const dialogOptions = {
      width: '100%', height: 'auto', data: { ...this.editorForm.value, },
    }
    const dialogRef = this.dialog.open(MessageDialogComponent, dialogOptions);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  handleInputFile(files: FileList) {
    // console.log({ files });
  }

  uploadFile(event: any) {
    const file: File = event?.target.files[0];
    this.file = file.name;
    if (file) {
      this.userService.uploadImage(file).subscribe((res: any) => {
        this.imageSrc = res.secure_url;
        this.editorForm.controls['image']?.patchValue(this.imageSrc);
        console.log({ uploadFile_this_editorForm: this.editorForm.value });
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

  onEditorBlured(event: any) {
    const quillEditor = document.getElementById('quill-editor');
    console.log('Editor blur event', event);
    if (quillEditor) {
      console.log({ onSubmit_this_editorValue: this.editorValue });
      const editorInstance = quillEditor.querySelector('.ql-editor') as HTMLElement | null;
      if (editorInstance) {
        this.editorValue = editorInstance.innerText;
        this.editorForm?.get('content')?.setValue(this.editorValue); // Update form control
        console.log({ onSubmit_this_editorValue: this.editorValue });
      }
    }
    console.log('Editor blur event', event);
    this.cdRef.detectChanges();
  }

}
