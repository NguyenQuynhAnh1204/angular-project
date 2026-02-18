import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { IFileItem, IUploadItem } from './uploadfile.definition';

@Component({
  selector: 'lib-uploadfile',
  templateUrl: 'uploadfile.component.html',
  styleUrls: ['./uploadfile.component.scss'],
})
export class UploadFileComponent implements OnDestroy {
  //#region props

  //* errorTimer
  private _errorTimer?: ReturnType<typeof setTimeout>;
  public get errorTimer() {
    return this._errorTimer;
  }
  public set errorTimer(pTime) {
    this._errorTimer = pTime;
  }

  //* error
  private _error = '';
  public get error() {
    return this._error;
  }
  public set error(pError) {
    this._error = pError;
  }

  //*uploadsItem
  private _uploadsItem: IUploadItem[] = [];
  public get uploadsItem() {
    return this._uploadsItem;
  }
  public set uploadsItem(pUploads) {
    this._uploadsItem = pUploads;
    this.fileUploadSuccess = this._uploadsItem.filter(
      (item) => item.fileItem?.state === true || item.link,
    );
    setTimeout(() => {
      this._scrollToBottom();
    });
    this.error = '';
  }

  //* fileUploadSuccess
  private _filesUploadSuccess: IUploadItem[] = [];
  public get fileUploadSuccess() {
    return this._filesUploadSuccess;
  }
  public set fileUploadSuccess(pFile) {
    this._filesUploadSuccess = pFile;
    this.countFile = this.fileUploadSuccess.length;
  }

  //*countFile
  private _countFile = 0;
  public get countFile() {
    return this._countFile;
  }
  public set countFile(pVal) {
    this._countFile = pVal;
  }

  //* limitedFile
  private _limitedFile = 5;
  public get limitedFile() {
    return (this, this._limitedFile);
  }
  public set limitedFile(pVal) {
    this._limitedFile = pVal;
  }

  //* fileNumberDisplay
  private _fileNumberDisplay = 3;
  public get fileNumberDisplay() {
    return this._fileNumberDisplay;
  }
  public set fileNumberDisplay(pNumb) {
    this._fileNumberDisplay = pNumb;
  }

  @ViewChild('fileUploadBox')
  private _fileUploadBox!: ElementRef<HTMLDivElement>;
  public get fileUploadBox() {
    return this._fileUploadBox;
  }
  public set fileUploadBox(pItem) {
    this._fileUploadBox = pItem;
  }

  //#endregion props

  public ngOnDestroy() {
    if (this._errorTimer) clearTimeout(this._errorTimer);
  }

  //#region handle event
  public onUpload(pFiles: IFileItem[]) {
    if (!pFiles?.length) return;
    if (this.countFile < this.limitedFile) {
      Array.from(pFiles).forEach((item) => {
        if (this._handleFile(item)) {
          this._showError(`${item.file.name} is loaded`);
        }
      });
      return;
    } else {
      this._showError(`Maximum is ${this.limitedFile}`);
      return;
    }
  }

  public onAddLink(pLink: string) {
    const duplicate = this.uploadsItem.some((item) => item.link === pLink);
    if (duplicate) {
      this._showError(`${pLink} is uploaded.`);
      return;
    }
    if (this.uploadsItem.length < this.limitedFile) {
      this.uploadsItem = [...this.uploadsItem, { link: pLink }];
      return;
    } else {
      this._showError(`Maximum is ${this.limitedFile}`);
      return;
    }
  }

  public handleOnDeleteFileItem(pItem: IUploadItem) {
    this.uploadsItem = this.uploadsItem.filter(
      (f) => f.link !== pItem.link || f.fileItem !== pItem.fileItem,
    );
    // this.countFile = this.fileUploadSuccess.length;
  }

  public onCancel() {
    this.uploadsItem = [];
    this.countFile = 0;
  }

  private _handleFile(pFile: IFileItem) {
    const hasFile = this.uploadsItem.some(
      (item) =>
        item.fileItem?.file?.name === pFile.file.name &&
        item.fileItem?.file?.size === pFile.file.size &&
        item.fileItem?.file?.lastModified === pFile.file.lastModified,
    );
    if (hasFile) return true;
    this.uploadsItem = [...this.uploadsItem, { fileItem: pFile }];
    return false;
  }

  public handleOnUploadSuccess(pItem: IUploadItem) {
    if (!pItem.fileItem) return;
    this._handleFile(pItem.fileItem);
    if (pItem.fileItem.state == true) {
      this.fileUploadSuccess.push(pItem);
      this.countFile = this.fileUploadSuccess.length;
    }
  }

  private _showError(pMessage: string) {
    this.error = pMessage;
    if (this.errorTimer) clearTimeout(this.errorTimer);
    this.errorTimer = setTimeout(() => {
      this.error = '';
    }, 3000);
  }

  private _scrollToBottom() {
    const el = this.fileUploadBox.nativeElement;
    el.scrollTop = el.scrollHeight;
  }

  //#endregion handle event
}
