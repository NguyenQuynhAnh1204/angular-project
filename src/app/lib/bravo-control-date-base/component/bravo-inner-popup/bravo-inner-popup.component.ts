import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BravoDropdownBaseModule } from "@bravo-infra/ui/bravo-dropdown-base";
import { Subject, takeUntil } from 'rxjs';
import { BravoDateService } from '../../bravo-control-date.service';
import { DateMode, RangePartType } from '../../bravo-control-date.type';
import { BravoDatePickerComponent } from '../bravo-date-picker';
import { BravoMonthPickerComponent } from '../bravo-month-picker';
import { BravoYearPickerComponent } from '../bravo-year-picker';
import { BravoDateHeaderComponent } from './bravo-date-header';

@Component({
    selector: 'br-inner-popup',
    templateUrl: './bravo-inner-popup.component.html',
    styleUrls: ["./bravo-inner-popup.component.scss"],
    imports: [BravoDatePickerComponent, BravoMonthPickerComponent, 
        BravoYearPickerComponent, BravoDropdownBaseModule, BravoDateHeaderComponent
    ]
})

export class BravoInnerPopupComponent implements OnInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateService);    
    
    @Input('mode')
    public mode!: DateMode;
    
    @Input("partType")
    public partType: RangePartType = 'start';
    
    public ngOnInit() {
        this._service.panelsChange$
            .pipe(takeUntil(this._destroy$))
            .subscribe((pVal) => {
                this.mode = pVal[this.partType].mode;
            })
    }

    public ngOnDestroy() {
        this._destroy$.next()
        this._destroy$.complete();
    }
}





