import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Platform } from 'ionic-angular';
import { Page2 } from '../page2/page2';
import { Page1 } from '../page1/page1';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Network } from 'ionic-native';
import { AdMob } from '@ionic-native/admob';
import 'rxjs/add/operator/map';
import { InAppBrowser } from '@ionic-native/in-app-browser';

declare var window: any;
interface AdMobtype{
  banner:string,
  interstitial:string
}
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
  moviesID:any;
  trailerID:any;
  movieType:any;
  adtext:any;
  adlink:any;
  constructor(private navParams: NavParams, private iab: InAppBrowser, private admob: AdMob, private platform: Platform, private loadingCtrl: LoadingController, public navCtrl: NavController, private http: Http, public storage: Storage, public alertCtrl: AlertController) {
this.admob.hideBanner();
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
 
    var moviesID = this.movieInfo = navParams.get("movieInfo");
    var movieType = this.movietype = navParams.get("movietype");

    if (moviesID != undefined && moviesID != "" && movieType != 'Upcoming-Trailer') {
      let loadingPopup = this.loadingCtrl.create({
        content: '',
        cssClass: 'a'
      });
      loadingPopup.present()

      this.http.get('http://api.movies4star.xyz/movieDetail?id=' + moviesID).map(res => res.json()).subscribe(data => {
        setTimeout(() => {
          this.moviesvisual = data;
          loadingPopup.dismiss();
        }, 1000);
      });

   }
   else {
      if (moviesID != undefined) {
         let loadingPopup = this.loadingCtrl.create({
          content: '',
          cssClass: 'a',
        });
        loadingPopup.present();
        this.http.get('http://api.movies4star.xyz/trailerDetail?id=' + moviesID).map(res => res.json()).subscribe(data => {
        setTimeout(() => {
           this.moviesvisual = data;
            loadingPopup.dismiss();
          }, 1000);
          

        });
      }
      else {
         var trailerID = this.trailerInfo = navParams.get("trailerInfo");
       
        let loadingPopup = this.loadingCtrl.create({
          content: '',
          cssClass: 'a',
        });
        loadingPopup.present();
        
        this.http.get('http://api.movies4star.xyz/trailerDetail?id=' + trailerID).map(res => res.json()).subscribe(data => {
          setTimeout(() => {
            this.moviesvisual = data;
            loadingPopup.dismiss();
          }, 1000);
        });
     
      }
    }
    
  }

  banner(link){
var browser_link = this.iab.create(link);
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
          this.http.get('http://api.movies4star.xyz/addFavorite?id=' + this.usrid + '&slug=' + b).map(res => res.json()).subscribe(data => {

          });
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
