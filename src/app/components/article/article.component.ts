import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  standalone: true,
  imports: [ // Importamos los módulos puesto que nos salta un error ya que en el article.component.ts estamos utilizando ion-card y todos esos componentes de Ionic
    CommonModule,
    IonicModule,
  ],
})
export class ArticleComponent  implements OnInit {

  @Input() article!: Article; // Colocamos el signo de exclamación para indicar que el valor no será nulo y que siempre estará presente
  @Input() index!: number;

  constructor() { }

  ngOnInit() {}

}
