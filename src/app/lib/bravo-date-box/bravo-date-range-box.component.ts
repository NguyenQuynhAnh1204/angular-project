import { Component, forwardRef } from '@angular/core';
import { BravoControlBaseComponent, BravoControlDirective } from '../bravo-control-base';
import { BravoDateContainerComponent } from './component';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BravoDateSingleService } from './service';
import { BravoDropdownAnchorDirective, BravoDropdownBaseModule } from '@bravo-infra/ui/bravo-dropdown-base';

@Component({
    selector: 'br-date-range-box',
    templateUrl: './bravo-date-range-box.component.html',
    styleUrls: ["./bravo-date-range-box.component.scss"],
    imports: [BravoDateContainerComponent, BravoDropdownBaseModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BravoDateRangeBoxComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => BravoDateRangeBoxComponent),
            multi: true
        },
        BravoDateSingleService,
    ],
    hostDirectives: [{
        directive: BravoControlDirective,
        inputs: ["formControl"]
    }, {
        directive: BravoDropdownAnchorDirective
    }],
})

export class BravoDateRangeBoxComponent extends BravoControlBaseComponent {

}