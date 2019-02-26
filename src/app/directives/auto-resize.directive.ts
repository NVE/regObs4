import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import { IonTextarea } from '@ionic/angular';

@Directive({
    selector: '[appAutoresize]' // Attribute selector
})
export class AutoResizeDirective implements OnInit {

    textArea: IonTextarea;

    @HostListener('input', ['$event.target'])
    onInput(textArea: any): void {
        this.adjust();
    }

    constructor(public element: ElementRef) {
        this.textArea = element.nativeElement;
    }

    ngOnInit(): void {
        setTimeout(() => this.adjust(), 1000);
    }

    async adjust() {
        const htmlTextArea = await this.textArea.getInputElement();
        if (htmlTextArea) {
            htmlTextArea.style.overflow = 'hidden';
            htmlTextArea.style.height = 'auto';
            htmlTextArea.style.height = htmlTextArea.scrollHeight + 'px';
        }
    }
}
