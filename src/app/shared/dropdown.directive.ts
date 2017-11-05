import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective
{

  @Input() expanded = false;

  constructor(public elementRef: ElementRef, public renderer: Renderer2)
  {
  }

  @HostListener('click')
  onClick()
  {
    if (!this.expanded)
    {
      this.renderer.addClass(this.elementRef.nativeElement, 'open');
    }
    else
    {
      this.renderer.removeClass(this.elementRef.nativeElement, 'open');
    }

    this.expanded = !this.expanded;
  }

}
