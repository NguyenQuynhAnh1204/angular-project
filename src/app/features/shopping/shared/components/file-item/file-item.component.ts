import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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

    progress = 0;

    @Input() item!: UploadItem;

    @Output() deleteItem = new EventEmitter<UploadItem>();

    constructor() { }

    ngOnInit() { }

    ngAfterViewInit(): void {
        interval(1000)
            .pipe(takeWhile(() => this.progress < 100))
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.handleProgress())
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
}