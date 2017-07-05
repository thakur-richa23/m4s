import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Network } from 'ionic-native';
import 'rxjs/add/operator/map'
declare var window: any;
@Component({
  selector: 'page-ondemand',
  templateUrl: 'ondemand.html',
})
export class OndemandPage {
  movie: any;
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
    this.movie = {};
    this.movie.name = '';
    this.movie.email = '';
    this.movie.moviename = '';
    this.movie.language = '';
    this.movie.year = '';
    this.movie.category = '';
    this.movie.message = '';
  }
  demandsubmit() {
    this.http.get('http://api.movies4star.xyz/movieOnDemand&name=' + this.movie.name + "&email=" + this.movie.email + "&movie=" + this.movie.moviename + "&language=" + this.movie.language + "&year=" + this.movie.year + "&category=" + this.movie.category + "&message=" + this.movie.message).map(res => res.json()).subscribe(data => {
      this.data = data;
      if (this.data.status == "success") {
        this.platform.ready().then(() => {
          window.plugins.toast.show("Your Message has been sent Successfully", "long", "center");
        });
      } else {
        this.platform.ready().then(() => {
          window.plugins.toast.show("Your Message not sent Successfully", "long", "center");
        });
      }
      window.location.reload(true);
      this.navCtrl.push(OndemandPage, {
      });
    });

  }

}
