import { Directive, ElementRef, Renderer2, AfterViewInit, Input, OnDestroy } from '@angular/core';
@Directive({
  selector: '[scroll-fixed-nav][scrollTop][fixedClass]'
})
export class ScrollFixedNavDirective implements AfterViewInit {
  @Input() scrollTop: number;
  @Input() fixedClass: string;
  navHeight: number;
  refreshdelay: number = 100;
  navWraper: HTMLElement;
  diffHeight: number = 1;
  private timer;

  constructor(private el: ElementRef,
    private rd: Renderer2) {
  }

  ngAfterViewInit() {
    this.bindScrollEvent();
    this.navWraper = this.rd.parentNode(this.el.nativeElement);
    this.checkLayout();
    this.watchOffsetHeightChange();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  private bindScrollEvent() {
    this.rd.listen('window', 'scroll', () => {
      if (this.getScrollTop() >= this.scrollTop) {
        this.rd.addClass(this.el.nativeElement, this.fixedClass);
      } else {
        this.rd.removeClass(this.el.nativeElement, this.fixedClass);
      };
    });
  }

  private getScrollTop() {
    if (self.pageYOffset) {
      return self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {
      return document.documentElement.scrollTop;
    } else if (document.body) {
      return document.body.scrollTop;
    }
  }

  private watchOffsetHeightChange() {
    this.timer = setInterval(() => {
      this.navHeight = this.el.nativeElement.offsetHeight;
      let _expectWrapperHeight = this.navHeight - this.diffHeight;
      if (this.navWraper.offsetHeight !== _expectWrapperHeight) {
        this.rd.setStyle(this.navWraper, 'height', _expectWrapperHeight + 'px');
      };
    }, this.refreshdelay);
  }

  private checkLayout() {
    if (this.navWraper.id !== 'sfNavWrapper') {
      throw `
        Use 'scroll-fixed-nav' directive;

        eg: <div id='scrollNav' [scrollTop]='/** your scrollTop to fixed **/' [fixedClass]='/** your fixed class **/'>
              <div scroll-fixed-nav>
                  /** your nav **/
              </div>
        </div>
      `;
    }
  }
}

