import { Injectable } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { Network } from 'ionic-native';
import { Page1 } from '../pages/page1/page1';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';


declare var window: any;

@Injectable()
export class Connect {

  constructor(public platform: Platform, private loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController) {
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
  }
}
