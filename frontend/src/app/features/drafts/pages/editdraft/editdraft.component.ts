import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { DraftService } from '../../services/draft.service';
import { MessageDialogComponent } from 'src/app/shared/dialogs';
import { UserService } from 'src/app/features/users/services/user.service';
import { environment } from 'src/environments/environment';
import { swalFireWarning } from 'src/app/shared/constants';
import { Location } from '@angular/common';
@Component({
  selector: 'app-editdraft',
  templateUrl: './editdraft.component.html',
  styleUrls: ['./editdraft.component.scss', '../../../blogs/pages/writeblog/writeblog.component.scss',],
})
export class EditdraftComponent implements OnInit {
  editorValue: any = '';
  editorForm: FormGroup;
  configData: any;
  imageSrc: any;
  file: any;
  data: any;
  id: string | null | undefined;
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
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private location: Location,
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

  onFormSubmit(data: any) {
    // console.log('Form submitted:', data);
    this.editorForm.patchValue(data);
    console.log('this.editorForm.value', this.editorForm.value);
  }

  saveEditor() {
    try {
      if (this.editorForm.valid) {
        this.draftService.updateDraft(this.editorForm.value, this.id).subscribe((res: any) => {
          Swal.fire(`${res.message}!`, 'Draft Saved SuccessFully', 'success');
          this.resetDraft();
          this.location.back();
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
    this.draftService.publishDraft(this.id).subscribe((res) => { 
      Swal.fire({ title: 'Your Draft Published SuccessFully', icon: 'success', position: 'center', showConfirmButton: false, timer: 1500, });
      this.location.back();
    });    
  }

  open(content: any) {
    this.modalService.open(content);
  }

  openMsgDialog(): void {
    const dialogOptions = {
      width: '100%', height: 'auto', data: { ...this.editorForm.value, },
    }
    const dialogRef = this.dialog.open(MessageDialogComponent, dialogOptions);

    dialogRef.afterClosed().subscribe((result) => {
    });
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

  resetDraft() {
    this.editorForm.reset();
    this.file = undefined;
    this.imageSrc = undefined;
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

  get content() {
    return this.editorForm.value['content'];
  }

}
