import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { NewpassPage } from '../newpass/newpass';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Network } from 'ionic-native';
import 'rxjs/add/operator/map';
declare var window: any;
@Component({
  selector: 'page-forgetpass',
  templateUrl: 'forgetpass.html',
})
export class ForgetpassPage {
  NewpassPage = NewpassPage;
  forget: any;
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
    this.forget = {};
    this.forget.email = '';
  }

  forget_send() {
    this.http.get('http://api.movies4star.xyz/verifyEmail?email=' + this.forget.email).map(res => res.json()).subscribe(data => {
      this.forget = data;
      if (this.forget.success == "Sucess") {
        //alert("Please check your email");
        this.platform.ready().then(() => {
        window.plugins.toast.show("Please check your email", "long", "center");
        });
        this.navCtrl.push(NewpassPage);
      } else {
        this.platform.ready().then(() => {
          window.plugins.toast.show("Enter valid email", "long", "center");
        });
        //alert("Enter valid email");
      }
    });
  }
}
