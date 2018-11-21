import { Component, OnInit, ElementRef, Inject, ViewChild } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-homesection',
  templateUrl: './homesection.component.html',
  styleUrls: ['./homesection.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('visible', style({ opacity: 0, background: 'white' })),
      transition('* => *', animate('5s', style({ opacity: .5})))
    ])],
  })
export class HomesectionComponent implements OnInit {


  @ViewChild('counter')
  public counter: ElementRef;

  @ViewChild('countervisiblity')
  public countervisiblity: ElementRef;
  public isVisible: String = '';

  CUSTOMERSCount1 = 0;
  CUSTOMERSCount2 = 0;
  TRANSPORTERSCount1 = 0;
  TRANSPORTERSCount2 = 0;
  LISTINGSCount1 = 0;
  LISTINGSCount2 = 0;
  LISTINGSCount3 = 0;

  constructor(private _el: ElementRef, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    

  }
  ngAfterViewInit() {
    window.addEventListener("scroll", this.onWindowScroll.bind(this));
  }
  // ngAfterContentChecked(): void {

  //   if ( this.isVisible !== 'visible' &&
  //       this.countervisiblity.nativeElement.style.visibility === 'visible') {
  //     const tid1 = setInterval(() => {
  //       this.CUSTOMERSCount1 += 1;
  //       if (this.CUSTOMERSCount1 > 35) {
  //         clearInterval(tid1);
  //       }
  //     }, 100);
  //     const tid2 = setInterval(() => {
  //       this.CUSTOMERSCount2 += 1;
  //       if (this.CUSTOMERSCount2 > 989) {
  //         clearInterval(tid2);
  //       }
  //     }, 1);

  //     const tid3 = setInterval(() => {
  //       this.TRANSPORTERSCount1 += 1;
  //       if (this.TRANSPORTERSCount1 > 7) {
  //         clearInterval(tid3);
  //       }
  //     }, 500);
  //     const tid33 = setInterval(() => {
  //       this.TRANSPORTERSCount2 += 1;
  //       if (this.TRANSPORTERSCount2 > 849) {
  //         clearInterval(tid33);
  //       }
  //     }, 1);
  //     const tid4 = setInterval(() => {
  //       this.LISTINGSCount1 += 1;
  //       if (this.LISTINGSCount1 > 7) {
  //         clearInterval(tid4);
  //       }
  //     }, 500);
  //     const tid5 = setInterval(() => {
  //       this.LISTINGSCount2 += 1;
  //       if (this.LISTINGSCount2 > 75) {
  //         clearInterval(tid5);
  //       }
  //     }, 50);
  //     const tid6 = setInterval(() => {
  //       this.LISTINGSCount3 += 1;
  //       if (this.LISTINGSCount3 > 879) {
  //         clearInterval(tid6);
  //       }
  //     }, 1);
  //   }
  //   this.isVisible = this.countervisiblity.nativeElement.style.visibility;
  // }

  onWindowScroll(ev: Event) {


    var win = (ev.currentTarget as Window);

    var oTop = this.counter.nativeElement.offsetTop - window.innerHeight;
    // console.log(this.counter.nativeElement.offsetTop);
    // console.log(this._el.nativeElement.offsetTop);
    // console.log(this.document.body.scrollTop);
    // var oTop = $('#counter').offset().top - window.innerHeight;
    // if (a == 0 && $(window).scrollTop() > oTop) {
    //   $('.counter-value').each(function () {
    //     var $this = $(this),
    //       countTo = $this.attr('data-count');
    //     $({
    //       countNum: $this.text()
    //     }).animate({
    //       countNum: countTo
    //     },

    //       {

    //         duration: 3000,
    //         easing: 'swing',
    //         step: function () {
    //           $this.text(Math.floor(this.countNum));
    //         },
    //         complete: function () {
    //           $this.text(this.countNum);
    //           //alert('finished');
    //         }

    //       });
    //   });
    //   a = 1;
    // }
  }

}
