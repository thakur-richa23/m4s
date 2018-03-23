import { Component } from '@angular/core';
import { Page7 } from '../page7/page7';
import { NavController, LoadingController, NavParams,Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Network } from 'ionic-native';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

declare var window: any;
@Component({
  selector: 'page-page6',
  templateUrl: 'page6.html',
  providers: [Storage]
})
export class Page6 {
  Page7 = Page7;
  private allTypesOfMovies: any;
  items = [];
  allMovies = [];
  itemss=[];
  catoffset = [];
  load:any;
  constructor(public navCtrl: NavController,public platform:Platform, private storage:Storage,public navParams: NavParams, private http: Http, private loadingCtrl: LoadingController, public alertCtrl: AlertController) {
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

    var allCategories = this.allTypesOfMovies = navParams.get("allTypesOfMovies");
    var offsetlimit = 0;
    this.catoffset.push(allCategories);
    this.catoffset.push(offsetlimit);
     let loadingPopup = this.loadingCtrl.create({
        content: '',
      });
      loadingPopup.present()
    this.http.get('http://api.movies4star.xyz/catMovies?slug=' + allCategories + '&offset=' + offsetlimit).map(res => res.json()).subscribe(data => {
     setTimeout(() => {
          this.items = data;
          loadingPopup.dismiss();
        }, 1000);
         
      if (data.length == 0 && data != '') {
        let alert = this.alertCtrl.create({
          title: 'Movies!',
          subTitle: 'No More Movies available',
          buttons: ['Ok']
        });

        alert.present();
      } else {
        for (let i = 0; i < data.length; i++) {
          this.allMovies.push(data[i]);
        }
      }
     
    });

  }

  doInfinite(infiniteScroll, navParams: NavParams) {
    var allCat = document.getElementsByTagName("input")[0].value;
    var moviesOffset = document.getElementsByTagName("input")[1].value;
    var newmoviesoffset = Number(moviesOffset) + 10;
    this.catoffset.push(newmoviesoffset);

    this.http.get('http://api.movies4star.xyz/catMovies?slug=' + allCat + '&offset=' + newmoviesoffset).map(res => res.json()).subscribe(data => {
      this.itemss = data;
         if(this.itemss.length!=0){
        setTimeout(() => {
          this.load='';
            for (let i = 0; i < this.itemss.length; i++) {
              this.allMovies.push(this.itemss[i]);
            }
            infiniteScroll.complete();
            
        }, 500);      
    }
    else{
       setTimeout(() => {
            this.load='No more items available...'
            infiniteScroll.complete();
       },500);
    }
    });
  
  }

  openMovieinfo(abc, type) {
    this.navCtrl.push(Page7,{
      movieInfo:abc,
      trailerInfo:abc,
      movietype:type
    });
  }
}





