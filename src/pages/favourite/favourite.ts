import { Component } from '@angular/core';
import { NavController, NavParams ,Platform} from 'ionic-angular';
import { Page7 } from '../page7/page7';
import { AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Network } from 'ionic-native';
import 'rxjs/add/operator/map';
declare var window: any;

@Component({
  selector: 'page-favourite',
  templateUrl: 'favourite.html',
})
export class FavouritePage {
  Page7 = Page7;
  private allTypesOfMovies: any;

  items = [];
  allMovies = [];
  catoffset = [];
  usrid: any;
  constructor(public navCtrl: NavController,public platform:Platform,public navParams: NavParams, private http: Http, private loadingCtrl: LoadingController, public alertCtrl: AlertController, public storage: Storage) {
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

    this.storage.get('userid').then((userid) => {
      this.usrid = userid;

      this.http.get('http://api.movies4star.xyz/fetchFavorite&id=' + this.usrid).map(res => res.json()).subscribe(data => {
        this.items = data;

      });
    });
  }

  doInfinite(infiniteScroll, navParams: NavParams) {
    this.storage.get('userid').then((userid) => {
      this.usrid = userid;
      this.http.get('http://api.movies4star.xyz/fetchFavorite&id=' + this.usrid).map(res => res.json()).subscribe(data => {
        this.items = data;
        
      });
    });

    setTimeout(() => {
      for (let i = 0; i < this.items.length; i++) {
        this.allMovies.push(this.items[i]);
      }

      infiniteScroll.complete();
    }, 500);
    
  }

  openMovieinfo(abc, type) {
    this.navCtrl.push(Page7, {
      movieInfo: abc,
      movietype: type,
    });
  }
  openTrailerinfo(abc) {
    this.navCtrl.push(Page7, {
      trailerInfo: abc,
    });
  }
}

