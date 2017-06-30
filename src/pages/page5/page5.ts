import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Network } from 'ionic-native';
import 'rxjs/add/operator/map';
import { Page4 } from '../page4/page4';

declare var window: any;
@Component({
    selector: 'page-page5',
    templateUrl: 'page5.html',
})
export class Page5 {
    data: any;

constructor(public navCtrl: NavController,public navParams: NavParams, private http: Http, private platform: Platform) {
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
        this.data.user_name = '';
        this.data.email = '';
        this.data.password = '';
        this.data.confirm_password = '';
    }

    submit() {
    if (this.data.password == this.data.confirm_password && this.data.user_name!='' && this.data.email!='') {

        this.http.get('http://api.movies4star.com/signup?userName=' + this.data.user_name + "&userEmail=" + this.data.email + "&userPassword=" + this.data.password).map(res => res.json()).subscribe(data => {
                this.data = data;
            if(this.data.status != "Failed"){
                 this.platform.ready().then(() => {
                    window.plugins.toast.show("You are successfully registered", "long", 'center');
                });

                this.navCtrl.push(Page4);
            }
            else{
                 this.platform.ready().then(() => {
                    window.plugins.toast.show("Please enter appropriate details", "long", 'center');
                });

            }

            });
    }else {
            this.platform.ready().then(() => {
                window.plugins.toast.show("Password doesn't match or something went wrong", "long", "center");
            });
        }

    }

}


