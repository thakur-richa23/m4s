import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-subscribe',
  templateUrl: 'subscribe.html'
})
export class SubscribePage {
data:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private ev: Events) {
this.data = {};
this.data.email = "";

  }

sub(a){
  
  this.ev.subscribe('hello', a => {
      let alert = this.alertCtrl.create({
        title: 'Low battery',
        subTitle: 'Thanks for subscribing'
    });
    alert.present();
    })

}

}
