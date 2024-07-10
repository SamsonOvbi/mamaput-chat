import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { DraftService } from '../../services/draft.service';
import { MessageDialogComponent } from 'src/app/shared/dialogs';
import { UserService } from 'src/app/features/users/services/user.service';
import { environment } from 'src/environments/environment';
import { swalFireWarning } from 'src/app/shared/constants';
import { quillConfig } from 'src/app/features/blogs/components/write-form/models/quill-editor/quill-config';
@Component({
  selector: 'app-editdraft',
  templateUrl: './editdraft.component.html',
  styleUrls: ['./editdraft.component.scss', '../../../blogs/pages/writeblog/writeblog.component.scss',],
})
export class EditdraftComponent implements OnInit {
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
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    public dialog: MatDialog,
    private renderer: Renderer2,
    private draftService: DraftService,
    private userService: UserService,
    private activatedRouter: ActivatedRoute
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
    this.draftService.getSingleDraft(this.id).subscribe((res: any) => {
      this.data = res.data;
      this.editorForm.controls['title'].patchValue(res.data.title);
      this.editorForm.controls['description'].patchValue(res.data.description);
      this.editorForm.controls['content'].patchValue(res.data.content);
      this.editorValue = res.data.content;
      this.imageSrc = res.data.image;
      this.editorForm.controls['image'].patchValue(this.imageSrc);
    });
  }

  saveEditor() {
    try {
      if (this.editorForm.valid) {
        this.draftService.updateDraft(this.editorForm.value, this.id).subscribe((res: any) => {
          Swal.fire(`${res.message}!`, 'Draft Saved SuccessFully', 'success');
          this.resetDraft();
        });
      } else {
        console.log(`this.editorForm.valid:   `, this.editorForm.valid);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error as needed
    }

  }

  publish() {
    this.draftService.publishDraft(this.id).subscribe((res) => { });
  }

  get title() {
    return this.editorForm.value['title'];
  }

  get content() {
    return this.editorForm.value['content'];
  }

  get description() {
    return this.editorForm.value['description'];
  }

  open(content: any) {
    this.modalService.open(content);
  }

  resetDraft() {
    this.editorForm.reset();
    this.file = undefined;
    this.imageSrc = undefined;
  }

  openMsgDialog(): void {
    const dialogOptions = {
      width: '100%',
      height: 'auto',
      data: { ...this.editorForm.value, },
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

  uploadFile(event: any) {
    const file: File = event?.target.files[0];
    this.file = file.name;
    if (file) {
      this.userService.uploadImage(file).subscribe((res: any) => {
        this.imageSrc = res.secure_url;
        this.editorForm.controls['image'].patchValue(this.imageSrc);
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

  canExit() {
    if (this.editorForm.dirty) {
      if (confirm('Are you sure you want to leave')) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

  onEditorBlured(event: any) {
    // Handle blur event if needed
    console.log('Editor blur event', event);
  }

}
