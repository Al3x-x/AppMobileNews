import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces';

import { CommonModule } from '@angular/common';
import { ActionSheetController, IonicModule } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

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
export class ArticleComponent {

  @Input() article!: Article; // Colocamos el signo de exclamación para indicar que el valor no será nulo y que siempre estará presente
  @Input() index!: number;

  constructor( 
    private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController
  ) { }

  openArticle() {

    const browser = this.iab.create( this.article.url );
    browser.show();

  }

  async onOpenMenu() {

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Compartir',
          icon: 'share-social',
          handler: () => this.onShareArticle()
        },
        {
          text: 'Favorito',
          icon: 'heart-outline',
          handler: () => this.onToggleFavorite()
        },
        {
          text: 'Cancelar',
          icon: 'close-outline',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ] 
    }); 

    await actionSheet.present();

  }

  onShareArticle() {

    console.log('Share article');

  }

  onToggleFavorite() {

    console.log('Toggle favorite');

  }

}
