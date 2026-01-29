import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

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
    
    @ViewChild('dragBox') dragBox!: ElementRef<HTMLDivElement>;
    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
    @ViewChild('inputLink') inputLink!: ElementRef<HTMLInputElement>;
    @ViewChild('btnAdd') btnAdd!: ElementRef<HTMLButtonElement>;
    @ViewChild('btnClear') btnClear!:  ElementRef<HTMLButtonElement>;

    constructor() { }
    
    ngOnInit() { }

    ngAfterViewInit() {
        const dragOver$ = fromEvent<DragEvent>(this.dragBox.nativeElement, 'dragover'); 
        const drop$ = fromEvent<DragEvent>(this.dragBox.nativeElement, 'drop');
        const upload$ = fromEvent<InputEvent>(this.fileInput.nativeElement, 'change');

        const link$ = fromEvent<InputEvent>(this.inputLink.nativeElement, 'input');
        const addLink$ = fromEvent<MouseEvent>(this.btnAdd.nativeElement, 'click');
        const btnClear$ = fromEvent<MouseEvent>(this.btnClear.nativeElement, 'click');

        dragOver$.subscribe(
            (event) => {
                event.preventDefault();
            }
        )

        drop$.subscribe(
            (event) => {
                event.preventDefault();
                const files = event.dataTransfer?.files;
                if (!files?.length) return;
                Array.from(files).forEach(file => this.handleFile(file));
            }
        )

        upload$.subscribe(
            (event) => {
                const input = event.target as HTMLInputElement;
                let files = input.files;
                if(!files?.length) return;
                Array.from(files).forEach(file => this.handleFile(file));
                input.value = '';
            }
        )

        link$.subscribe(
            (event) => {
                const input = event.target as HTMLInputElement;
                const value = input.value.trim();
                if (value) {
                    const isLink = this.isLink(value);
                    if(!isLink) return;
                    this.haveLink = true;
                }
            }
        )

        addLink$.subscribe(
            () => {
                if (!this.haveLink) return;
                const input = this.inputLink.nativeElement;
                const link = input.value.trim();
                if (!link) return;
                const duplicate = this.uploads.some(item => item.link === link);
                if (duplicate) return;
                this.uploads = [...this.uploads, { link }];
                this.countFile++;
                input.value = '';
                this.haveLink = false;
            }
        )

        btnClear$.subscribe(
            () => {
                this.uploads = [];
                this.countFile = 0;
            }
        )
    }

    private isLink(link: string): boolean {
        return link.startsWith('http://') || link.startsWith('https://');
    }

    private validateFile(file: File): boolean {
        const types = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]
        const maxSize = 25 * 1024 * 1024;
        return types.includes(file.type) && file.size <= maxSize;
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

    onDelete(item: UploadItem): void {
        if(!item) return;
        this.uploads = this.uploads.filter(f => f.link !== item.link || f.file !== item.file);
        this.countFile = this.uploads.length;
    }

    
}