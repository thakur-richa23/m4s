import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Network } from 'ionic-native';
import 'rxjs/add/operator/map';

declare var window: any;
@Component({
  selector: 'page-newpass',
  templateUrl: 'newpass.html',
})
export class NewpassPage {
  confirm: any;
  constructor(public navCtrl: NavController,public navParams: NavParams, private http: Http, private platform: Platform, public alertCtrl: AlertController) {
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

    this.confirm = {};
    this.confirm.otp = '';
    this.confirm.pass = '';
    this.confirm.con_pass = '';

  }
  confirm_pass() {
    if (this.confirm.pass == this.confirm.con_pass) {

      this.http.get('http://movies4star.com/movies_Api.php?module=recoverPassword&otp=' + this.confirm.otp + "&password=" + this.confirm.pass).map(res => res.json()).subscribe(data => {
        this.confirm = data;
        this.platform.ready().then(() => {
          window.plugins.toast.show("Password successfully changed", "long", "center");
        });
      });
    } else {
      this.platform.ready().then(() => {
        window.plugins.toast.show("Password doesn't match", "long", "center");
      });
    }
  }

}
