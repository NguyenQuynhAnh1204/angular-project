import { NgModule } from '@angular/core';
import { ButtonCustomComponent } from './button';
import { CommonModule } from '@angular/common';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { TabsCustomComponent } from './tabs';


@NgModule({
    imports: [CommonModule, ɵInternalFormsSharedModule, FormsModule],
    exports: [ButtonCustomComponent, TabsCustomComponent],
    declarations: [ButtonCustomComponent, TabsCustomComponent],
    providers: [],
})
export class ShareModule { }
