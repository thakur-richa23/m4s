import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Page6 } from '../page6/page6';
import { Network } from 'ionic-native';
import { Page1 } from '../page1/page1';

declare var window: any;

@Component({
  selector: 'page-page9',
  templateUrl: 'page9.html',
})
export class Page9 {
  genres: any;
  constructor(public navCtrl: NavController,public platform:Platform,private http: Http, public navParams: NavParams) {

    Network.onDisconnect().subscribe(() => {
     this.platform.ready().then(() => {
          window.plugins.toast.show("You are offline", "long", "center");
        });
    });
    Network.onConnect().subscribe(()=> {
         this.platform.ready().then(() => {
          window.plugins.toast.show("You are online", "long", "center");
        });
    });
    this.http.get('http://api.movies4star.xyz/genric').map(res => res.json()).subscribe(data => {
      this.genres = data;
    });
  }

  genresNext(b) {
    this.navCtrl.push(Page6, {
      allTypesOfMovies: b,
    });
  }
 redirect(){
    this.navCtrl.setRoot(Page1);
  }
}
