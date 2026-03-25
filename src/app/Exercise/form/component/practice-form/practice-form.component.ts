import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LevelControlComponent, PaymentControlComponent, QuantityControlComponent } from './custom-form';

@Component({
    standalone: true,
    selector: 'practice-form',
    templateUrl: './practice-form.component.html',
    styleUrls: ["./practice-form.component.scss"],
    imports: [CommonModule, LevelControlComponent, PaymentControlComponent, QuantityControlComponent, ReactiveFormsModule]
})

export class PracticeFormComponent {
    private formBuilder = inject(FormBuilder);

    public formInfo = this.formBuilder.group({
        customerInf: this.formBuilder.group({
            customer: ['', [Validators.required, Validators.minLength(3)]],
            email: ["", [Validators.required, Validators.email]],
            phone: ["", [Validators.required, Validators.pattern ]]
        }),
        addressInf: this.formBuilder.group({
            city: ["", [Validators.required]],
            street: [""],
            note: [""],
        }),
        orderInf:  this.formBuilder.group({
            category: ["", [Validators.required]],
            foodItem: ["", [Validators.required]],
            quantity: [0, [ Validators.min(1), Validators.max(100)]],
            level: [0, [Validators.required]],
        }),
        payment: ["COD", [Validators.required]]
    })

    public get customer() {
        return this.formInfo.get('customerInf')?.get('customer');
    }
    public get email() {
        return this.formInfo.get('customerInf')?.get('email');
    }
    public get phone() {
        return this.formInfo.get('customerInf')?.get('phone');
    }
    public get city() {
        return this.formInfo.get('addressInf')?.get('city');
    }
    public get category() {
        return this.formInfo.get('orderInf')?.get('category');
    }
    public get foodItem() {
        return this.formInfo.get('orderInf')?.get('foodItem');
    }
    public get quantity() {
        return this.formInfo.get('orderInf')?.get('quantity');
    }
    public get level() {
        return this.formInfo.get('orderInf')?.get('level');
    }
    public get payment() {
        return this.formInfo.get('payment');
    }


    public onSubmit() {
        this.formInfo.markAllAsTouched();
        if(this.formInfo.invalid) {
            console.log('invalid');
            return;
        };
        this.formInfo.setValue({
            customerInf: {
                customer: '',
                email: '',
                phone: ['']
            }, 
            addressInf: {
                city: '',
                street: "",
                note: "",
            },
            orderInf: {
                category: '',
                foodItem: '',
                quantity: 0,
                level: 0
            },
            payment: 'COD'
        });
   } 
}