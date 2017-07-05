import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Network } from 'ionic-native';
import 'rxjs/add/operator/map';

declare var window: any;
@Component({
  selector: 'page-page8',
  templateUrl: 'page8.html',
})
export class Page8 {
  public dmca = {};
  data: any;
  tst:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private http: Http) {
    this.tst='';
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
    this.data = {};
    this.data.name = '';
    this.data.email = '';
    this.data.message = '';

    this.http.get('http://api.movies4star.xyz/dmca').map(res => res.json()).subscribe(data => {
      this.dmca = data;
    });

  }
  submit() {

    this.http.get('http://api.movies4star.xyz/dmcaEmail?email=' + this.data.email + "&name=" + this.data.name + "&message=" + this.data.message).map(res => res.json()).subscribe(data => {
      this.data = data;
      if (this.data.status == "sucess") {
        this.platform.ready().then(() => {
          window.plugins.toast.show("Your mail sent Successfully", "long", "center");
        });
      } else {
        this.platform.ready().then(() => {
          window.plugins.toast.show("Your mail not sent Successfully", "long", "center");
        });
      }
    })
  }
}
