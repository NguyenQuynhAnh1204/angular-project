import { AbstractControl, ValidationErrors } from "@angular/forms";
import { ETypeValidation, IValidation} from "../../bravo-control-base";


export function extractErrors(control: AbstractControl): string[] {
  if (!control?.errors) return [];

  return Object.values(control.errors)
    .map((err: any) => err.message ?? err);
}

// hàm xử lý về validator: required
export function requiredValidator(pControl: AbstractControl): ValidationErrors | null {
    if(pControl.value != '') return null;
    return {
        'required': {
            message: "Field is required",
        }
    };
}

// hàm xử lý về validator: required
export function numberValidator(pControl: AbstractControl): ValidationErrors | null {
    const regex = /^-?(\d+(\.\d*)?|\.\d+)$/;    //regex kiểm tra số thực
    if(regex.test(pControl.value)) return null;
    return {
        'number': {
            message: "Input is not Number",
        }
    }
}



export function buildValidator(pValidator: IValidation | IValidation[]) {
   let validators: any[] = [];
   if(Array.isArray(pValidator)) {
       pValidator.forEach((v) => {
           validators = validators.concat(buildValidator(v))
       });
   } else {
        switch(pValidator.type) {
            case ETypeValidation.NUMBER:
               validators.push(numberValidator);
               break;
            case ETypeValidation.REQUIRED:
               validators.push(requiredValidator);
               break;
        }
   }
   return validators;
}
