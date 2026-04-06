import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { BravoDatePickerComponent } from '../bravo-date-picker';
import { BravoMonthPickerComponent } from '../bravo-month-picker';
import { BravoYearPickerComponent } from '../bravo-year-picker';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BravoDateSingleService } from '../../service';
import { EViewPicker } from '../../bravo-control-date.type';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'br-date-container',
    templateUrl: './bravo-date-container.html',
    styleUrls: ["./bravo-date-container.scss"],
    imports: [CommonModule, BravoDatePickerComponent, 
        BravoMonthPickerComponent, BravoYearPickerComponent
    ]
})

export class BravoDateContainerComponent implements OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateSingleService);
    public get service() {
        return this._service;
    }
    public get moment() {
        return this.service.moment;
    }
    
    public view = EViewPicker.PICKER_DATE;
    public title = '';

    constructor() {
        this.service.viewChange$
        .pipe(takeUntil(this._destroy$))
        .subscribe((pView) => {
            this.view = pView;
            this._updateTitle();
        })
    }

    public ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
    
    private _updateTitle() {
        switch (this.view) {
            case 1:
                this.title =  `Tháng ${this.moment.getMonth()+1} năm ${this.moment.getFullYear()}`;
                break;
                case 2:
                this.title =  `Năm ${this.moment.getFullYear()}`;
                break;
            case 3:
                const start = this.moment.clone().getFullYear() - 14;
                this.title =  `${start} - ${start + 25}`;
                break;
            }
            return ''
    }

    public switchView() {
        if(this.view == 1) {
            this.service.switchView(3);
        } else if (this.view == 2) {
            this.service.switchView(1);
        } else if (this.view == 3) {
            this.service.switchView(1);
        }
        else {
            this.service.switchView(1);
        }
    }


    public previousSwitch() {
        this._switch(-1)
    }

    public nextSwitch() {
        this._switch(1)
    }

    private _switch(pNumber: number) {
        const date = this.moment.toDate();
        const month = this.moment.getMonth();
        const year = this.moment.getFullYear();
        if (this.view === 1) {
            this.service.moment =
            BravoMoment.set(date, {
                month: month + pNumber
            });
        }
        else if (this.view === 2) {
            this.service.moment =
            BravoMoment.set(date, {
                year: year + pNumber
                });
            }
        else if (this.view === 3) {
            this.service.moment =
            BravoMoment.set(date, {
                year: year + pNumber * 25
            });
        }
        this._updateTitle()
    }
}