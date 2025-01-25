import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importar el modulo HttpClient ya que el HttpClientModule está obsoleto
import { environment } from '../../environments/environment';

import { NewsResponse, Article } from '../interfaces'; // Sirve para importar las interfaces creadas en el archivo index.ts
import { Observable } from 'rxjs'; // Observable es una clase que permite trabajar con datos asíncronos
import { map } from 'rxjs'; // map es un operador que permite transformar la data que se recibe

const apiKey = environment.apiKey; // Importar la apiKey del archivo environment.ts para no exponerla en el código

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor( private http: HttpClient) { } 

  getTopHeadlines():Observable<Article[]>{ // Cambiar el tipo de retorno a Observable<Article[]> para que el servicio retorne un arreglo de articles

    return this.http.get<NewsResponse>('https://newsapi.org/v2/everything?q=tesla&from=2024-12-25&sortBy=publishedAt',{
      params: { apiKey } // Pasar la apiKey como parámetro, antes teniamos la apiKey:apiKey pero para tener un código más limpio se puede dejar solo apiKey
    }).pipe(
      map( ({ articles }) => articles) // Utilizar el operador map para retornar solo el arreglo de articles
    );

  }

}
