import {
    AbstractControl, 
    NG_VALIDATORS, 
    Validator, 
    ValidatorFn
} from '@angular/forms';
import {Directive} from '@angular/core';

export function password(): ValidatorFn {  

    const isUpperCase = (string: string) => /^[A-Z]*$/.test(string)

    return (control: AbstractControl): { [key: string]: any } | null =>  {
       
        if(control.value == control.value.toLowerCase()){
            return {uppercase: control.value}
        }

        if(!/\d/.test(control.value)){
            return {digit: control.value}
        }

        if(!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(control.value)){
            return {especialCharacter: control.value}
        }
        
        return null;

    }
}

@Directive({  
    selector: '[password]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: PasswordValidatorDirective,
        multi: true
    }]
})
export class PasswordValidatorDirective implements Validator { 
    
    validate(control: AbstractControl): { [key: string]: any } | null { 
        return password()(control);  
    }
}
