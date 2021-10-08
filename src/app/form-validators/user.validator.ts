import {
    AbstractControl, 
    NG_VALIDATORS, 
    Validator, 
    ValidatorFn
} from '@angular/forms';
import {Directive} from '@angular/core';

export function user(): ValidatorFn {  

    const isUpperCase = (string: string) => /^[A-Z]*$/.test(string)

    return (control: AbstractControl): { [key: string]: any } | null =>  {


        if(/\d/.test(control.value)){
            return {digit: control.value}
        }

        if(control.value.toLowerCase() != control.value){
            return {uppercase: control.value}
        }

        if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(control.value)){
            return {especialCharacter: control.value}
        }
        
        return null;

    }
}

@Directive({  
    selector: '[user]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: UserValidatorDirective,
        multi: true
    }]
})
export class UserValidatorDirective implements Validator { 
    
    validate(control: AbstractControl): { [key: string]: any } | null { 
        return user()(control);  
    }
}
