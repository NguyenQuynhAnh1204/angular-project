import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { BravoInnerPopupComponent } from '../bravo-inner-popup';
import { DateMode } from '../../bravo-control-date.type';
import { BravoDateService } from '../../bravo-control-date.service';

@Component({
    selector: 'br-date-popup',
    templateUrl: './bravo-date-popup.html',
    styleUrls: ["./bravo-date-popup.scss"],
    imports: [CommonModule, BravoInnerPopupComponent]
})

export class BravoDatePopupComponent implements OnInit {
    private _service = inject(BravoDateService);
    
    @Input('isRange')
    public isRange!: boolean;

    @Input('mode')
    public mode!: DateMode;

    public ngOnInit(): void {
        this._service.isRange = this.isRange;
    }

}