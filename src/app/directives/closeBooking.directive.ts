import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    selector: '[appCloseBooking]'
})

export class CloseBookingDirective {
    @Output() clickOutside = new EventEmitter<void>();

    constructor(private element: ElementRef) {
    }

    @HostListener('document:click', ['$event.target'])
    public onClick(target) {
        const clickedInside = this.element.nativeElement.contains(target);
        const isClickOnHeader = document.querySelector('app-header').contains(target);
        const isClickOnMarker = target instanceof Image;
        if (!clickedInside) {
            if (isClickOnMarker && !isClickOnHeader) {
                return;
            }
            this.clickOutside.emit();
        }
    }
}