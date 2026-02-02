import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';

interface UploadItem {
    file?:File,
    link?:string
}

@Component({
    selector: 'document-file',
    templateUrl: 'file.component.html',
    styleUrls: ['./file.component.scss']
})
export class DocumentFileComponent 
implements OnInit, AfterViewInit,OnDestroy {
    private destroy$ = new Subject<void>();

    public counterValue = 0;
    
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
    
    ngOnInit() {
    }
    
    ngAfterViewInit() {
        const dragOver$ = fromEvent<DragEvent>(this.dragBox.nativeElement, 'dragover').pipe(takeUntil(this.destroy$)); 
        const drop$ = fromEvent<DragEvent>(this.dragBox.nativeElement, 'drop').pipe(takeUntil(this.destroy$));
        const upload$ = fromEvent<InputEvent>(this.fileInput.nativeElement, 'change').pipe(takeUntil(this.destroy$));
        
        const link$ = fromEvent<InputEvent>(this.inputLink.nativeElement, 'input').pipe(takeUntil(this.destroy$));
        const addLink$ = fromEvent<MouseEvent>(this.btnAdd.nativeElement, 'click').pipe(takeUntil(this.destroy$));
        const btnClear$ = fromEvent<MouseEvent>(this.btnClear.nativeElement, 'click').pipe(takeUntil(this.destroy$));
        
        dragOver$.subscribe((event) => {event.preventDefault();})

        drop$.subscribe((event) => {this.onDrop(event)})
        
        upload$.subscribe((event) => {this.onUpload(event)})
        
        link$.subscribe((event) => {this.onInputLink(event);})
        
        addLink$.subscribe(() => this.onAddLink());
        
        btnClear$.subscribe(() => this.onClear());

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


    onDrop(event: DragEvent) {
        event.preventDefault();
        const files = event.dataTransfer?.files;
        if (!files?.length) return;
        Array.from(files).forEach(file => this.handleFile(file));
    }

    onUpload(event: Event) {
        const input = event.target as HTMLInputElement;
        let files = input.files;
        if(!files?.length) return;
        Array.from(files).forEach(file => this.handleFile(file));
        input.value = '';
    }

    onInputLink(event: Event) {
        const input = event.target as HTMLInputElement;
        const value = input.value.trim();
        if (value) {
            const isLink = this.isLink(value);
            if(!isLink) return;
            this.haveLink = true;
        }
    }

    onAddLink() {
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

    onClear() {
        this.uploads = [];
        this.countFile = 0;
    }

    onDelete(item: UploadItem): void {
        if(!item) return;
        this.uploads = this.uploads.filter(f => f.link !== item.link || f.file !== item.file);
        this.countFile = this.uploads.length;
    }


    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
    
}