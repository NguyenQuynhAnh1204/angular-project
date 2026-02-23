import { NgModule } from '@angular/core';
import { ButtonCustomComponent } from './button';
import { CommonModule } from '@angular/common';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";


@NgModule({
    imports: [CommonModule, ɵInternalFormsSharedModule, FormsModule],
    exports: [ButtonCustomComponent],
    declarations: [ButtonCustomComponent],
    providers: [],
})
export class ShareModule { }
