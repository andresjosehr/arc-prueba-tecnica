import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
    selector: '[numeric]'
})

export class NumericDirective {

    @Input('decimals') decimals: number = 0;

    private check(value: string, decimals: number)
    {
      if (decimals <= 0) {
        return String(value).match(new RegExp(/^\d+$/));
      } else {
        var regExpString0 = /^\d$/
        var regExpString1 = /^\d+,$/
        var regExpString2 = /^\d+,\d$/
        var regExpString3 = /^\d+,\d\d$/

        var regExpString4 = /^\d\d$/

          return regExpString0.test(value) ||
                 regExpString1.test(value) ||
                 regExpString2.test(value) ||
                 regExpString3.test(value) ||
                 regExpString4.test(value)
      }
    }

    private specialKeys = [ 
      'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'
    ];

    constructor(private el: ElementRef) {
    }

    @HostListener('keydown', [ '$event' ])
    onKeyDown(event: KeyboardEvent) {
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        
        let current: string = this.el.nativeElement.value;
        let next: string = current.concat(event.key);
        if ( next && !this.check(next, this.decimals) ) {
           event.preventDefault();
        }
    }
}