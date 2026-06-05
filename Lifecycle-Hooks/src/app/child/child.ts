import { afterEveryRender, afterNextRender, Component, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.css',
})
export class Child {
  @Input() titles!:string
  constructor(){
    console.log("1. Constructor");
    afterNextRender(()=>{
      console.log("4.afterNextRender");
    });
    afterEveryRender(()=>{
      console.log("5.AfterEveryRender");
    });
  }

  ngOnChanges(change: SimpleChange){
    console.log("2.ngOnChange", change);
  }

  ngOnInit(){
    console.log("3.ngOnInit");
  }

  ngOnDestroy(){
    console.log("6.ngOnDestroy");
  }
} 
