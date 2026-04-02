import { BravoDateBox } from '@bravo-infra/ui/bravo-date-box';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { Component, inject } from '@angular/core';
import { BravoDropdownBaseModule } from '@bravo-infra/ui/bravo-dropdown-base';
import {
  BravoColorManagerService,
  BravoFontManagerService,
} from '@bravo-infra/ui/cdk/services';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [BravoDropdownBaseModule, BravoDateBox, RouterOutlet],
})
export class AppComponent {
  readonly colorService = inject(BravoColorManagerService);
  readonly fontService = inject(BravoFontManagerService);
  constructor() {
    const moment = new BravoMoment();
  }
}
