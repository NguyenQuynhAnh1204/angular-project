import { inject } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BravoDateService } from '../../bravo-date-base.service';
import { CompatibleDate, DateMode, RangeDate } from '../../bravo-date-base.type';
import { isRangeValue } from '../../bravo-date-base.utilities';


export class BravoDateAbstractComponent {
    protected _service = inject(BravoDateService);
    public get panels() {
        return this._service.panels;
    }
    public get isRange() {
        return this,this._service.isRange;
    }
    public get mode() {
        return this._service.mode;
    }

    public selectedDate!: CompatibleDate;

    public handleOnHover(pDate: BravoMoment) {
        if(!this._service.value && !this.isRange) return;
        this._service.hoverDate = pDate;
    }

    public handleOnLeave() {
        this._service.hoverDate = null;
    }

    public isSelected(pDate: BravoMoment) {}

    public isInRange(pDate: BravoMoment) {
        if (!isRangeValue(this.selectedDate)) return false;
        const [start, end] = this.selectedDate;
        if (!start || !end) return false;
        return (pDate.isAfter(start) && pDate.isBefore(end));
    }

    public inHoverRange(pDate: BravoMoment) {
        if (!isRangeValue(this.selectedDate)) return false;
        const [start, end] = this._service.value as RangeDate;
        const hoverDate = this._service.hoverDate;
        if(!hoverDate || !(start ?? end)) return false;
        const anchorTime = start?.getTime() ?? end?.getTime();
        if(!anchorTime) return false;
        const dateTime = pDate.getTime();
        const hoverTime = hoverDate.getTime();
        return dateTime >= Math.min(anchorTime, hoverTime) && dateTime <= Math.max(anchorTime, hoverTime);
    }

    public enableRange(pMode: DateMode) {
        return this.mode == pMode && this.isInRange
    }
}