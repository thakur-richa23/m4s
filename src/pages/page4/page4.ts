/*SignIn page4 */
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Page5 } from '../page5/page5';
import { Page1 } from '../page1/page1';
import { ForgetpassPage } from '../forgetpass/forgetpass';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { GooglePlus } from 'ionic-native';
import { Facebook, NativeStorage } from 'ionic-native';
import { Network } from 'ionic-native';
import 'rxjs/add/operator/map';

declare var window: any;
@Component({
  selector: 'page-page4',
  templateUrl: 'page4.html',
  providers: [Storage],

})
export class Page4 {
  Page5 = Page5;
  Page1 = Page1;
  ForgetpassPage = ForgetpassPage;
  data: any;
  FB_APP_ID: number = 218325921972043;
  private storage: Storage;

  constructor(public navCtrl: NavController,  public navParams: NavParams, private http: Http, private platform: Platform, private loadingCtrl: LoadingController, storage: Storage) {
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
    this.data.email = '';
    this.data.password = '';
    this.storage = storage;
    this.storage.clear();
    Facebook.browserInit(this.FB_APP_ID, "v2.8");

  }

  submit() {

    this.http.get('http://api.movies4star.com/login?email=' + this.data.email + "&password=" + this.data.password).map(res => res.json()).subscribe(data => {
      if(data.status!="Failed")
      {
      this.data = data.ID;
      console.log(data);
      this.storage.set('userid', this.data);
      this.platform.ready().then(() => {
        window.plugins.toast.show("You have successfully login", "long", "center");
      });
      this.navCtrl.push(Page1);
      }else{
          this.platform.ready().then(() => {
            window.plugins.toast.show("Please enter appropriate details", "long", 'center');
          });
      }
    });
  }

  signUp() {
    this.navCtrl.push(Page5, {
    });
  }

  forget() {
    this.navCtrl.push(ForgetpassPage, {
    });
  }

}
