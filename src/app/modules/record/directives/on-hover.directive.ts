import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[onHover]'
})
export class OnHoverDirective {

  @Input() onHover!: string;

  constructor(private elementRef: ElementRef) { }

  @HostListener("mouseenter") mouseenter(): void {
    this.setBoxShadow(this.onHover);
  }

  @HostListener("mouseleave") mouseleave(): void {
    this.setBoxShadow('');
  }

  private setBoxShadow(boxShadow: string): void {
    this.elementRef.nativeElement.style.boxShadow = boxShadow;
    this.elementRef.nativeElement.classList.toggle('shadow');
  }

}
