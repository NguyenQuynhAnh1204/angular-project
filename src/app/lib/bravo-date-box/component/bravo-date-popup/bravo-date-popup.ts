import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { BravoDateService } from '../../service';
import { BravoInnerPopupComponent } from '../bravo-inner-popup';
import { DateMode } from '../../bravo-control-date.type';

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

    @Input('mode')
    public mode!: DateMode;

    public ngOnInit(): void {
        this._service.isRange = this.isRange;
    }

}