import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BravoDropdownBaseModule } from '@bravo-infra/ui/bravo-dropdown-base';
import {
  BravoColorManagerService,
  BravoFontManagerService,
} from '@bravo-infra/ui/cdk/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [BravoDropdownBaseModule, RouterOutlet],
})
export class AppComponent {
  readonly colorService = inject(BravoColorManagerService);
  readonly fontService = inject(BravoFontManagerService);
}
