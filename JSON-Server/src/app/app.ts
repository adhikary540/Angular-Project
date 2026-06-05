import { Component, inject, signal } from '@angular/core';
import { isActive, RouterOutlet } from '@angular/router';
import { UserService } from './services/user-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('JSON-Server');
  // userService = inject(UserService);
  // users = toSignal<User[]>(this.userService.getUsers());
   users = signal<User[]>([]);
   name = signal<string>('');
   email = signal<string>('');

   ediitingUpdateId = signal<number | null>(null);

   constructor(private userService: UserService){}

   ngOnInit(){
    this.loadUsers(); //Load users when component Initializations
   }

    loadUsers(){
      this.userService.getUsers().subscribe(data =>{
        this.users.set(data);
      });      
    }

    //Clicked Edit
    editUser(user: User){
      this.ediitingUpdateId.set(user.id!);
      this.name.set(user.name);
      this.email.set(user.email);
    }
    // Add and updae user
    submitForm(){
      const payload: User = {
        name: this.name(),
        email: this.email(),
        isActive: false
      };
      // Update User
      if(this.ediitingUpdateId() !== null){
        this.userService.updateUser(
          this.ediitingUpdateId()!,
          payload
        ).subscribe(()=>{
          alert("Update user successfull");
          this.afterSave();
        })
      }else{
      this.userService.addUser(payload).subscribe(()=>{
        alert("Add user successfull");
        this.afterSave();
      })
     }
    }

    toggleStatus(user: User){
      this.userService.updateUserStatus(user.id!, !user.isActive).subscribe(()=>{
        this.users.update(list=>
          list.map(u=>
            u.id === user.id ? {...u, isActive : !u.isActive}: u
          )
        )
      })
    } 

    deleteUser(user: User){
      const confirmDelete = confirm(`Are you want to delete this user ${user.name}?`);
      if(!confirmDelete) return; 

      this.userService.deleteUser(user.id!).subscribe(() =>{
        this.users.update( list =>
          list.filter(u => u.id !== user.id)
        )
      })

    }

    afterSave(){
        this.loadUsers(); // Refresh the user list after adding new data
        this.name.set('');
        this.email.set('');
        this.ediitingUpdateId.set(null);      
    }
}
