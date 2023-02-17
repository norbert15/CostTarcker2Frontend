import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[barWidth]'
})
export class BarWidthDirective {

  @Input() barWidth: number[] = [0, 0];

  @HostBinding("style.width") width: string = "0%";

  @HostBinding("attr.title") title: string = "0%";

  constructor() { }

  /**
   * Szélesség és title attributum beállítása barWidth alapján
   */
  private setWidthAndTitle(): void {
    const sum = this.barWidth[0];
    const value = this.barWidth[1];

    if (sum != 0 && value != 0) {
      this.width = `${(value / sum) * 100}%`;
      this.title = Math.round(+this.width.replace("%", "")) + "%";
    }
  }

  ngOnInit(): void {
    this.setWidthAndTitle();
  }
}
