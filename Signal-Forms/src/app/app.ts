import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,FormField],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Signal-Forms');
  //Form model based on signal
  loginModel = signal({
    email:'',
    password:''
  })

  //Create form from signal mode
loginForm = form(this.loginModel);

  submit(){
    console.log(this.loginModel());
  }

}
