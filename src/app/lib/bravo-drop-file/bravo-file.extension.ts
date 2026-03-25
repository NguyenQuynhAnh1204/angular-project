export class UploadFileExtension {
  public static createRegexFile(pTypeFile: string[]) {
    const regex = new RegExp(`\\.(${pTypeFile.join('|')})$`, 'i');
    return regex;
  }

  public static createRegexLink(pLink: string) {
    const regex = /^https?:\/\/.+/i;
    return regex;
  }
}
