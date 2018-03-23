import { Component } from '@angular/core';
import { Page6 } from '../page6/page6';
import { NavController, LoadingController, PopoverController,Platform, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Network } from 'ionic-native';
import 'rxjs/add/operator/map';
import { Page1 } from '../page1/page1';

declare var window: any;

@Component({
  selector: 'page-page15',
  templateUrl: 'page15.html',
})
export class Page15 {
  Page6 = Page6;
  private allCategories: any;
  constructor(private navParams: NavParams,public platform:Platform, public navCtrl: NavController, public popoverCtrl: PopoverController, private http: Http, private loadingCtrl: LoadingController) {

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
    this.http.get('http://api.movies4star.xyz/allCategories').map(res => res.json()).subscribe(data => {
      this.allCategories = data;
    });

  }

  itemSelected(b) {
    this.navCtrl.push(Page6, {
      allTypesOfMovies: b,
    });
  }
  redirect(){
    this.navCtrl.setRoot(Page1);
  }
}
