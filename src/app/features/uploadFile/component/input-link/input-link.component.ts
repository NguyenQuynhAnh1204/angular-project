import { Component, EventEmitter, Output } from '@angular/core';
import { UploadFileExtension } from '../../uploadfile.extension';

@Component({
  selector: 'input-link',
  templateUrl: './input-link.component.html',
  styleUrls: ['./input-link.component.scss'],
})
export class InputLinkComponent {
  //* error
  private _error = '';
  public get error() {
    return this._error;
  }
  public set error(pError: string) {
    this._error = pError;
  }

  //* link
  private _link = '';
  public get link() {
    return this._link;
  }
  public set link(pLink: string) {
    this._link = pLink;
    this.error = '';
  }

  //* isLink
  private _isLink!: boolean;
  public get isLink() {
    return this._isLink;
  }
  public set isLink(pIsLink) {
    this._isLink = pIsLink;
  }

  @Output('onAddLink')
  public addLink$ = new EventEmitter<string>();

  private _checkIsLink(link: string): boolean {
    const regex = UploadFileExtension.createRegexLink(link);
    return regex.test(link.trim());
  }

  public onInputLink(event: Event) {
    const input = event.target as HTMLInputElement;
    this.link = input.value;
    if (!this.link.trim()) {
      this.isLink = false;
      return;
    }
    if (!this._checkIsLink(this.link.trim())) {
      this.isLink = false;
      this.error = 'Invalid!';
      return;
    }
    this.isLink = true;
  }

  public onAddLink() {
    if (!this.isLink) return;
    this.addLink$.emit(this.link);
    this.link = '';
    this.isLink = false;
  }
}
