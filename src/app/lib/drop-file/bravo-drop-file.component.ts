import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { IFileItem } from './bravo-file.definition';
import { UploadFileExtension } from './bravo-file.extension';

@Component({
  selector: 'bravo-drop-file',
  templateUrl: './bravo-drop-file.component.html',
  styleUrls: ['./bravo-drop-file.component.scss'],
})
export class BravoDropFileComponent implements OnDestroy {
  //* errorTimer
  private _errorTimer?: ReturnType<typeof setTimeout>;
  public get errorTimer() {
    return this._errorTimer;
  }
  public set errorTimer(pTime) {
    this._errorTimer = pTime;
  }
  //* error
  private _error: string[] = [];
  public get error() {
    return this._error;
  }
  public set error(pError) {
    this._error = pError;
  }

  //* limitedSize
  private _limitedSize = 0;
  @Input('limitedSize')
  get limitedSize() {
    return this._limitedSize;
  }
  set limitedSize(pSize) {
    this._limitedSize = pSize;
  }

  //* acceptFile
  private _acceptFile: string[] = [];
  @Input('assetFile')
  get acceptFile() {
    return this._acceptFile;
  }
  set acceptFile(pVal) {
    this._acceptFile = pVal;
  }

  @Output('onUploadFiles')
  public uploadedFiles$ = new EventEmitter<IFileItem[]>();

  public ngOnDestroy(): void {
    if (this.errorTimer) clearTimeout(this.errorTimer);
  }

  public dragFiles(pEvent: DragEvent) {
    pEvent.preventDefault();
  }

  public dropFile(pEvent: DragEvent) {
    pEvent.preventDefault();
    const files = pEvent.dataTransfer?.files;
    if (!files) return;
    this._handleFile(files);
  }

  public downloadFile(pEvent: Event) {
    const input = pEvent.target as HTMLInputElement;
    let files = input.files;
    if (!files) return;
    this._handleFile(files);
    input.value = '';
  }

  private _validateFile(pFile: File) {
    const fileName = pFile.name;
    const regex = UploadFileExtension.createRegexFile(this.acceptFile);
    const isAcceptFile = regex.test(fileName);
    if (!isAcceptFile) {
      this._showError(`${pFile.name} not accept`);
      return false;
    }
    if (pFile.size > this.limitedSize) {
      this._showError(`${pFile.name} is over ${this.limitedSize}`);
      return false;
    }
    return true;
  }

  private _handleFile(pFiles: FileList) {
    if (!pFiles) return;
    let validFiles: IFileItem[] = [];
    Array.from(pFiles).forEach((file) => {
      if (!this._validateFile(file)) return;
      validFiles.push({
        file: file,
      });
    });
    this.uploadedFiles$.emit(validFiles);
  }

  private _showError(message: string) {
    this.error.push(message);
    this.errorTimer = setTimeout(() => {
      this.error.shift();
    }, 5000);
  }
}

//filed
