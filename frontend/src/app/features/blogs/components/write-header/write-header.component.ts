import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-write-header',
  templateUrl: './write-header.component.html',
  styleUrls: ['./write-header.component.scss']
})
export class WriteHeaderComponent {
  @Output() saveDraft = new EventEmitter<any>();
  @Output() publish = new EventEmitter<any>();
  @Output() preview = new EventEmitter<any>();
  @Output() clear = new EventEmitter<any>();

  onSaveDraft() {
    this.saveDraft.emit();
  }

  onPublish() {
    this.publish.emit();
  }

  onPreview() {
    this.preview.emit();
  }

  onClear() {
    this.clear.emit();
  }
}