import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit{ // OnInit sirve para que el método ngOnInit se ejecute cuando se inicie la página

  @ViewChild(IonInfiniteScroll, {static: true})
    infiniteScroll!: IonInfiniteScroll;
  
  public articles: Article[] = []; // Se crea un arreglo de tipo Article (interfaces.ts) ya que este contiene la estructura de los datos que se van a mostrar en el html

  constructor( private newsService: NewsService ) {}

  // Para llamar al servicio creado (news.service.ts) :
  ngOnInit(){ // ngOnInit sirve para que el método se ejecute cuando se inicie la página
    this.newsService.getTopHeadlines()
    .subscribe( articles => this.articles.push( ...articles ) ); // Se suscribe al servicio y se obtienen los datos que se van a mostrar en el html
  }

  //
  loadData(){
    this.newsService.getTopHeadlinesByCategory( 'business', true )
    .subscribe( articles => {

        if (articles.length === this.articles.length){
          this.infiniteScroll.disabled = true;
          //event.target.disabled = true;
          return;
        }

        this.articles = articles;
        this.infiniteScroll.complete();
    })
  }
}
