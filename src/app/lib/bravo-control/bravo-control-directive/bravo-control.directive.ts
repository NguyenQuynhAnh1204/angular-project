import { Directive } from '@angular/core';
import { FormControlDirective } from '@angular/forms';

@Directive({ selector: '[br-control-directive]' })
export class BravoControlDirective extends FormControlDirective {}