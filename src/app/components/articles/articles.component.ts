import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArticleComponent } from '../article/article.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  imports: [ // Importamos los módulos ya que en el archivo components.module.ts no se importan a pesar de que se declaran
    CommonModule,  // Proporciona soporte para *ngIf y *ngFor
    IonicModule,    // Permite el uso de componentes de Ionic
    ArticleComponent // Importamos el componente ArticleComponent para poder utilizarlo en el archivo articles.component.html
  ]
})
export class ArticlesComponent {

  @Input() articles: Article[] = [];

  constructor() { }

}
