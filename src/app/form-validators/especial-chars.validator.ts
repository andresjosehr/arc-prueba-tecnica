import {
    AbstractControl, 
    NG_VALIDATORS, 
    Validator, 
    ValidatorFn
} from '@angular/forms';
import {Directive} from '@angular/core';

export function especialChars(): ValidatorFn {  

    return (control: AbstractControl): { [key: string]: any } | null =>  {

        if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(control.value)){
            return {especialCharacter: control.value}
        }
        
        return null;

    }
}

@Directive({  
    selector: '[especialChars]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EspecialCharsValidatorDirective,
        multi: true
    }]
})
export class EspecialCharsValidatorDirective implements Validator { 
    
    validate(control: AbstractControl): { [key: string]: any } | null { 
        return especialChars()(control);  
    }
}
