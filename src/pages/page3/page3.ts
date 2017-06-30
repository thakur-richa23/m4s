import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Page7 } from '../page7/page7';
import { Network } from 'ionic-native';
import 'rxjs/add/operator/map';

declare var window: any;
@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html',

})
export class Page3 {
  Page7 = Page7;
  items: any;
  searchTerm: any;
  data: any
  constructor(public navCtrl: NavController,private platform: Platform, private http: Http, private navParams: NavParams) {
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
    this.searchTerm = '';
  }

  onSearchInput() {
    if (this.searchTerm.length > 4) {
      this.http.get('http://api.movies4star.com/search?slug=' + this.searchTerm).map(res => res.json()).subscribe(data => {
        this.data = data;
      });
    }
  }
  openMovie(abc) {
    this.navCtrl.push(Page7, {
      movieInfo: abc,
    });
  }
}
