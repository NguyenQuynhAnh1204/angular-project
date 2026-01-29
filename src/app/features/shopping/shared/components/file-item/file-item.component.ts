import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface UploadItem {
    file?:File,
    link?:string
}


@Component({
    selector: 'file-item',
    templateUrl: 'file-item.component.html',
    styleUrls: ['./file-item.component.scss']
})

export class FileItemComponent implements OnInit {

    @Input() item!: UploadItem;

    @Output() deleteItem = new EventEmitter<UploadItem>();

    constructor() { }

    ngOnInit() { }

    onDelete(item: UploadItem) {
        this.deleteItem.emit(item)
    }
}