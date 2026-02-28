export interface IUploadItem {
  fileItem?: IFileItem;
  link?: string;
}

export interface IFileItem {
  file: File;
  state?: boolean;
}

export type ByteUnitType = 'B' | 'kB' | 'KB' | 'MB' | 'GB' | 'TB';
