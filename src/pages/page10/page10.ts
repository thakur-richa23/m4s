import { Component } from '@angular/core';
import { NavController, NavParams,Platform,ToastController  } from 'ionic-angular';
import { Http } from '@angular/http';
import { Network } from 'ionic-native';
import 'rxjs/add/operator/map';

declare var window: any;
@Component({
  selector: 'page-page10',
  templateUrl: 'page10.html',
})
export class Page10 {
  public aboutus = {};
  constructor(public navCtrl: NavController,public Toast:ToastController,public platform:Platform, private http: Http, public navParams: NavParams) {
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

    this.http.get('http://api.movies4star.xyz/about').map(res => res.json()).subscribe(data => {
      this.aboutus = data;
    });
  }
}

