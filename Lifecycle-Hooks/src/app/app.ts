import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Child } from './child/child';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Child],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Lifecycle-Hooks');
  titles = signal("Hello from app component");
  show = signal(true);

  changeTitle(){
    this.titles.set("title changed");
  }

  toggle(){
    this.show.set(!this.show());
  }

}  
