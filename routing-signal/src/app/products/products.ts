import { Component, signal, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  search = signal('');
  products = signal<string[]>(['Laptop','Mouse','Keyboard','Computer','Monitor']);
  filtered = signal<string[]>(this.products());

  constructor(
    private route:ActivatedRoute,
    private router:Router
  ){
    //URL to signal
    this.route.queryParamMap.subscribe(params => {
      this.search.set(params.get('search') || '');
    });
    //Signals to UI update
    effect(() =>{
      const value = this.search().toLowerCase();
      this.filtered.set(
        this.products().filter( p => 
          p.toLowerCase().includes(value)
        )
      )
    })  
  }

  updateURl(){
    this.router.navigate([], {
      queryParams: {search: this.search()},
    })
  }
}
