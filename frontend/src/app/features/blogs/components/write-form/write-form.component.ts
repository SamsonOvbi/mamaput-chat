import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/features/users/services/user.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import Quill from 'quill';
import { quillConfig } from './models/quill-config';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-write-form',
  templateUrl: './write-form.component.html',
  styleUrls: ['./write-form.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})

export class WriteFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() initialData: any;
  @Input() configData: any;
  @Output() formSubmit = new EventEmitter<any>();

  editorPlaceholder: any = 'Write Short content in less then 5000 words..';
  editorForm!: FormGroup;
  previousDataLen!: any;
  quill!: Quill;
  public Editor = ClassicEditor;
  editorInstance: any;
  imageSrc: any;
  file: any;
  formSubscription: Subscription = Subscription.EMPTY;
  uploadSubscription: Subscription = Subscription.EMPTY;
  private subscriptions: Subscription[] = [];

  constructor(
    config: NgbModalConfig,
    private _fb: FormBuilder,
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
    if (this.initialData) {
      this.editorForm.patchValue(this.initialData);
      this.imageSrc = this.initialData.image;
      this.imageSrc = this.imageSrc || '/assets/images/avatar.svg';
      console.log('this.editorForm.value', this.editorForm.value);
    }

    this.initCKEditor();
    this.initWriteForm();
  }

  ngAfterViewInit(): void {  }

  initWriteForm() {
    this.formSubscription = this.editorForm.valueChanges.pipe(
      debounceTime(100), distinctUntilChanged()
    ).subscribe(formValue => {
      this.formSubmit.emit(formValue);
    });
    this.subscriptions.push(this.formSubscription);
  }

  initCKEditor() {
    const editorElement = document.getElementById('ck-editor');
    if (editorElement) {
      ClassicEditor.create(editorElement)
        .then((editor) => {
          this.editorInstance = editor;
          this.onReady(editor);
          if (this.initialData.content) {
            editor.setData(this.initialData.content);
          }
        })
        .catch((error) => {
          console.error('An error occurred:', error);
        });
    } else {
      console.error('CKEditor element not found');
    }
  }


  onReady(editor: any) {
    try {
      editor.editing.view.change((writer: any) => {
        writer.setStyle('height', '300px', editor.editing.view.document.getRoot());
      });
      // Capture text changes and update form
      editor.model.document.on('change:data', () => {
        const content = editor.getData();
        const length = content.length
        if (this.previousDataLen !== length) {
          this.editorForm.patchValue({ content: content }, { emitEvent: false });
          this.previousDataLen = length;
        }
      });
    } catch (error) {
      console.error('An error occurred:', error);
    }

  }

  uploadFile(event: any) {
    const file: File = event?.target.files[0];
    this.file = file.name;
    if (file) {
      this.uploadSubscription = this.userService.uploadImage(file).subscribe((res: any) => {
        this.imageSrc = res.secure_url;
        this.editorForm.controls['image']?.patchValue(res.secure_url);
        // this.getUserProfile();
      });
      this.subscriptions.push(this.uploadSubscription);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    if (this.editorInstance) {
      this.editorInstance.destroy();
    }
  }

}
