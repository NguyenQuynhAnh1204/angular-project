import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'br-date-range-container',
    templateUrl: './bravo-date-range-container.component.html',
    styleUrls: ["./bravo-date-range-container.component.scss"],
    imports: [CommonModule]
})

export class BravoDateRangeContainerComponent {
    private _viewStartDate = 1;
    public get viewStartDate() {
        return this._viewStartDate;
    }
    public set viewStartDate(pView) {
        this._viewStartDate = pView;
    }
    
    private _viewEndDate = 2;
    public get viewEndDate() {
        return this._viewEndDate;
    }
    public set viewEndDate(pView) {
        this._viewEndDate = pView;
    }

}