import { Component, OnInit } from '@angular/core';

interface UploadItem {
    file?:File,
    link?:string
}

@Component({
    selector: 'document-file',
    templateUrl: 'file.component.html',
    styleUrls: ['./file.component.scss']
})
export class DocumentFileComponent implements OnInit {

    public acceptFile = ".pdf,.docx";

    public countFile = 0;

    public uploads : UploadItem[] = [];

    public haveLink = false;

    public errors = {
        file: '',
        link: ''
    }

    constructor() { }
    
    ngOnInit() { }

    isLink(link: string): boolean {
        return link.startsWith('http://') || link.startsWith('https://');
    }

    validateFile(file: File): boolean {
        const types = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]
        const maxSize = 25 * 1024 * 1024;
        return types.includes(file.type) && file.size <= maxSize;
    }

    onDragOver(event: Event): void {
        event.preventDefault();
    }

    onDropSuccess(event: DragEvent ): void {
        event.preventDefault();
        const files = event.dataTransfer?.files;
        if (!files?.length) return;
        Array.from(files).forEach(file => this.handleFile(file));
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        let files = input.files;
        if(!files?.length) return;
        Array.from(files).forEach(file => this.handleFile(file));
        input.value = '';
    }

    private handleFile(file: File): void {
        if(!this.validateFile(file)) return;
        const haveFile = this.uploads.some(item => (
            item.file?.name === file.name,
            item.file?.size === file.size,
            item.file?.lastModified === file.lastModified
        ));
        if (haveFile) return;
        this.uploads = [...this.uploads, {file}];
        this.countFile = this.uploads.length;
    }

    onLinkSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        const value = input.value.trim();
        if (value) {
            const isLink = this.isLink(value);
            if(!isLink) return;
            this.haveLink = true;
        }
    }

    addLink(inputLink: HTMLInputElement): void {
        if(!this.haveLink) return;
        const link = inputLink.value.trim();
        const duplicate = this.uploads.some(item => item.link === link);
        if (duplicate) return;
        this.uploads = [...this.uploads, {link}];
        this.countFile++;
        inputLink.value = '';
        this.haveLink = false;
    }

    onDelete(item: UploadItem): void {
        if(!item) return;
        this.uploads = this.uploads.filter(f => f.link !== item.link || f.file !== item.file);
        this.countFile = this.uploads.length;
    }

    clear() : void {
        this.uploads = [];
        this.countFile = 0;
    }

    
}