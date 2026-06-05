import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './user';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('get-api-method');
  // users: any[]= [];

  // constructor(private userService: User){}

  // ngOnInit(){
  //   this.userService.getUser().subscribe((data: any) => {
  //     this.users = data;
  //   })
  // }

  userService = inject(User);
  users : any = toSignal(this.userService.getUser());  
}
