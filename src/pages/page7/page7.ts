import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Platform } from 'ionic-angular';
import { Page2 } from '../page2/page2';
import { Page1 } from '../page1/page1';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Network } from 'ionic-native';
import 'rxjs/add/operator/map';
declare var window: any;
@Component({
  selector: 'page-page7',
  templateUrl: 'page7.html',

})
export class Page7 {
  Page2 = Page2;
  movieInfo: any;
  trailerInfo: any;
  movietype: any;
  public moviesvisual = {};
  usrid: any;
  div: any;
  constructor(private navParams: NavParams, private platform: Platform, private loadingCtrl: LoadingController, public navCtrl: NavController, private http: Http, public storage: Storage, public alertCtrl: AlertController) {
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
    
    var moviesID = this.movieInfo = navParams.get("movieInfo")
    var trailerID = this.trailerInfo = navParams.get("trailerInfo")
    var movieType = this.movietype = navParams.get("movietype")
    if (moviesID != undefined && moviesID != "" && movieType != 'Upcoming-Trailer') {
      let loadingPopup = this.loadingCtrl.create({
        content: '',
        cssClass: 'a'
      });
      loadingPopup.present()

      this.http.get('http://api.movies4star.com/movieDetail?id=' + moviesID).map(res => res.json()).subscribe(data => {
        setTimeout(() => {
          this.moviesvisual = data;
          loadingPopup.dismiss();
        }, 1000);
      });

    }
    else {
      if (moviesID != undefined) {

        this.http.get('http://api.movies4star.com/trailerDetail?id=' + moviesID).map(res => res.json()).subscribe(data => {

          this.moviesvisual = data;

        });
      }
      else {

        var trailerID = this.trailerInfo = navParams.get("trailerInfo")
        let loadingPopup = this.loadingCtrl.create({
          content: '',
          cssClass: 'a',
        });
        loadingPopup.present();
        this.http.get('http://api.movies4star.com/trailerDetail?id=' + trailerID).map(res => res.json()).subscribe(data => {
          setTimeout(() => {
            this.moviesvisual = data;
            loadingPopup.dismiss();
          }, 1000);
        });
      }
    }
  }
 redirect(){
    this.navCtrl.push(Page1);
  }
  jumpToPlay(b) {
    this.navCtrl.push(Page2, {
      firstPassed: b,
    });
  }
  jumpTofav(b) {
    if (b != undefined) {
      this.storage.get('userid').then((userid) => {
        this.usrid = userid;

        if (this.usrid != null) {

          this.http.get('http://api.movies4star.com/addFavorite?id=' + this.usrid + '&slug=' + b).map(res => res.json()).subscribe(data => {

          }
          );
        } else {

          this.platform.ready().then(() => {
            window.plugins.toast.show("Please Login First", "long", "center");
          });
        }
      });
    }
  }
  jumpTotrailer(b) {
    this.navCtrl.push(Page2, {
      secondPassed: b,
    });
  }
}
