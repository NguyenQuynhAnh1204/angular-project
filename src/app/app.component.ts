import { BravoDateBox } from '@bravo-infra/ui/bravo-date-box';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { Component, inject } from '@angular/core';
import { BravoDropdownBaseModule } from '@bravo-infra/ui/bravo-dropdown-base';
import {
  BravoColorManagerService,
  BravoFontManagerService,
} from '@bravo-infra/ui/cdk/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [BravoDropdownBaseModule, BravoDateBox],
})
export class AppComponent {
  readonly colorService = inject(BravoColorManagerService);
  readonly fontService = inject(BravoFontManagerService);
  constructor() {
    const moment = new BravoMoment();
    console.warn(moment.getMonths('MMM', 3));
    console.warn(moment.getYears(10, 5)[0][0].getYear());
  }
}
