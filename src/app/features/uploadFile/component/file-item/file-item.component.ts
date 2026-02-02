import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { interval, Subject, takeUntil, takeWhile } from 'rxjs';

interface UploadItem {
    file?:File,
    link?:string
}


@Component({
    selector: 'file-item',
    templateUrl: 'file-item.component.html',
    styleUrls: ['./file-item.component.scss']
})

export class FileItemComponent implements OnInit, AfterViewInit, OnDestroy {
    private destroy$ = new Subject<void>();

    @ContentChild('content') content!: TemplateRef<any>;

    progress = 0;
    typeFile = '';

    @Input() item!: UploadItem;

    @Output() deleteItem = new EventEmitter<UploadItem>();

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        interval(1000)
            .pipe(takeWhile(() => this.progress < 100))
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.handleProgress())

        setTimeout(() => {
            this.typeFile = this.getTypeFile(this.item);            
        })
    }

    private handleProgress() {
        this.progress += 25;
    }

    onDelete(item: UploadItem) {
        this.deleteItem.emit(item)
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private getTypeFile(upload: UploadItem): string {
        if (upload.file) {
            const file = upload.file;
            const type = file.type;
            if(type.includes('pdf')) {
                return 'pdf'
            }
            else if (type.includes('document')) {
                return 'world'
            }
        }
        return 'link';
    }
}