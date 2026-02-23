import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { interval, Subject, takeUntil, takeWhile } from 'rxjs';
import { IUploadItem } from '../../uploadfile.definition';

@Component({
  selector: 'file-item',
  templateUrl: 'file-item.component.html',
  styleUrls: ['./file-item.component.scss'],
})
export class FileItemComponent implements AfterViewInit, OnDestroy {
  #destroy$ = new Subject<void>();

  //* progress
  private _progress = 0;
  public get progress() {
    return this._progress;
  }
  public set progress(pProgress: number) {
    this._progress = pProgress;
  }

  //* typeFile
  private _typeFile = '';
  public get typeFile() {
    return this._typeFile;
  }
  public set typeFile(pType) {
    this._typeFile = pType;
  }

  // * uploadItem
  #uploadItem!: IUploadItem;
  @Input('item')
  public get uploadItem() {
    return this.#uploadItem;
  }
  public set uploadItem(pUpload: IUploadItem) {
    this.#uploadItem = pUpload;
  }

  @Output('onDeleteItem')
  public deleteItem$ = new EventEmitter<IUploadItem>();
  @Output('onUploadItem')
  public uploadItem$ = new EventEmitter<IUploadItem>();

  @HostBinding('class.haveLink')
  public get hasLink() {
    return this.uploadItem.link;
  }

  public ngAfterViewInit() {
    interval(1000)
      .pipe(takeWhile(() => this.progress < 100))
      .pipe(takeUntil(this.#destroy$))
      .subscribe(() => this._handleProgress());

    const timer = setTimeout(() => {
      this.typeFile = this._getTypeFile(this.uploadItem);
      clearTimeout(timer);
    });
  }

  public ngOnDestroy() {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

  private _handleProgress() {
    if (this.uploadItem.fileItem) {
      this.progress += 25;
    } else if (this.uploadItem.link) {
      this.uploadItem$.emit(this.uploadItem);
    }
    if (this.progress == 100) {
      if (this.uploadItem.fileItem) {
        this.uploadItem.fileItem.state = true;
      }
      this.uploadItem$.emit(this.uploadItem);
      return;
    }
    // if (this.progress < 100 && this.progress < 50) {
    //   setTimeout(() => {
    //     if (!this.uploadItem.fileItem) return;
    //     this.uploadItem.fileItem.state = false;
    //     this.uploadItem$.emit(this.uploadItem);
    //     this.#destroy$.next();
    //     this.#destroy$.complete();
    //   });
    // }
  }

  public onDelete() {
    this.deleteItem$.emit(this.uploadItem);
  }

  private _getTypeFile(upload: IUploadItem): string {
    if (upload.fileItem) {
      const file = upload.fileItem;
      const type = file.file.type;
      console.log(type.split("/")[1])
      return type.split("/")[1];
    }
    return 'link';
  }
}
