import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importar el modulo HttpClient ya que el HttpClientModule está obsoleto
import { environment } from '../../environments/environment';

import { NewsResponse, Article, ArticlesByCategoryAndPage } from '../interfaces'; // Sirve para importar las interfaces creadas en el archivo index.ts
import { Observable, of } from 'rxjs'; // Observable es una clase que permite trabajar con datos asíncronos
import { map } from 'rxjs/operators'; // map es un operador que permite transformar la data que se recibe

const apiKey = environment.apiKey; // Importar la apiKey del archivo environment.ts para no exponerla en el código
const apiUrl = environment.apiUrl; // URL de la API de noticias

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private ArticlesByCategoryAndPage: ArticlesByCategoryAndPage = {}

  constructor( private http: HttpClient) { } 

  private executeQuery<T>( endpoint: string ) {
    console.log('Petición HTTP realizada');
    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: { apiKey }
    })

  }

  getTopHeadlines():Observable<Article[]>{ // Cambiar el tipo de retorno a Observable<Article[]> para que el servicio retorne un arreglo de articles

    return this.getTopHeadlinesByCategory('business');
    // return this.executeQuery<NewsResponse>(`/everything?domains=wsj.com`) // Cambiar el endpoint a /everything?domains=wsj.com para obtener noticias de wsj.com
    // .pipe( // Utilizar el operador pipe para encadenar operadores
    //   map( ({ articles }) => articles) // Utilizar el operador map para retornar solo el arreglo de articles
    // );

  }

  getTopHeadlinesByCategory( category: string, loadMore: boolean = false ):Observable<Article[]>{ 

    if ( loadMore ) {
      return this.getArticlesByCategory( category );
    }

    if ( this.ArticlesByCategoryAndPage[ category ] ) {
      return of( this.ArticlesByCategoryAndPage[ category ].articles );
    }
    
    return this.getArticlesByCategory( category );

  }

  private getArticlesByCategory( category: string ): Observable<Article[]> {

    if ( Object.keys( this.ArticlesByCategoryAndPage ).includes( category ) ) {
    } else {

      // No existe la categoría
      this.ArticlesByCategoryAndPage[ category ] = {

        page: 0,
        articles: []

      }

    }

    const page = this.ArticlesByCategoryAndPage[ category ].page + 1;

    return this.executeQuery<NewsResponse>(`/top-headlines?category=${ category }&page=${ page }`)
    .pipe(
      map( ({ articles }: { articles: Article[] }) => {

        if ( articles.length === 0 ) return this.ArticlesByCategoryAndPage[ category ].articles;

        this.ArticlesByCategoryAndPage[ category ] = {
          page: page,
          articles: [ ...this.ArticlesByCategoryAndPage[ category ].articles, ...articles ] 
        }

        return this.ArticlesByCategoryAndPage[ category ].articles;

      })
    );

  }

}
