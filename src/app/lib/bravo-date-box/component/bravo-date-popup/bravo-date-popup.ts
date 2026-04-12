import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { BravoDateService } from '../../service';
import { BravoInnerPopupComponent } from '../bravo-inner-popup';

@Component({
    selector: 'br-date-popup',
    templateUrl: './bravo-date-popup.html',
    styleUrls: ["./bravo-date-popup.scss"],
    imports: [CommonModule, BravoInnerPopupComponent]
})

export class BravoDateContainerComponent implements OnInit {
    private _service = inject(BravoDateService);
    @Input('isRange')
    public isRange!: boolean;

    public ngOnInit(): void {
        this._service.isRange = this.isRange;
    }

}