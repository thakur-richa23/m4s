import { Component } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Network } from 'ionic-native';
import 'rxjs/add/operator/map';

declare var window: any;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  contact: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private platform: Platform, public alertCtrl: AlertController) {

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

    this.contact = {};
    this.contact.name = '';
    this.contact.email = '';
    this.contact.message = '';
  }

  send() {

    this.http.get('http://movies4star.xyz/movies_Api.php?module=contact&name=' + this.contact.name + "&email=" + this.contact.email + "&message=" + this.contact.message).map(res => res.json()).subscribe(data => {
      this.contact = data;
      if (this.contact == "saved") {
        this.platform.ready().then(() => {
          window.plugins.toast.show("You Have Successfully Sent a Message", "long", "center");
        });
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
      }
    });
  }

}
