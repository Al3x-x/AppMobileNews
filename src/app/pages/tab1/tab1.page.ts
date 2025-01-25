import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit{ // OnInit sirve para que el método ngOnInit se ejecute cuando se inicie la página

  constructor( private newService: NewsService ) {}

  // Para llamar al servicio creado (news.service.ts) :
  ngOnInit(){ // ngOnInit sirve para que el método se ejecute cuando se inicie la página
    this.newService.getTopHeadlines()
    .subscribe( articles => {
      console.log( articles ); // Se coloca solo articles porque ya se está retornando un arreglo de articles en el servicio
    });
  }

}
