import { Component } from '@angular/core';
import { Network } from 'ionic-native';
import { Page2 } from '../page2/page2';
import { Page4 } from '../page4/page4';
import { Page6 } from '../page6/page6';
import { Page3 } from '../page3/page3';
import { Page7 } from '../page7/page7';
import { Page8 } from '../page8/page8';
import { Page10 } from '../page10/page10';
import { Page15 } from '../page15/page15';
import { ContactPage } from '../contact/contact';
import { ForgetpassPage } from '../forgetpass/forgetpass';
import { NewpassPage } from '../newpass/newpass';
import { OndemandPage } from '../ondemand/ondemand';
import { RecentplayPage } from '../recentplay/recentplay';
import { FavouritePage } from '../favourite/favourite';
import { GooglePlus } from 'ionic-native';
import { NavController, Platform, LoadingController,ToastController, PopoverController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { AppVersion } from 'ionic-native';
import {OneSignal} from 'ionic-native';
import {Device} from 'ionic-native';

declare var window: any;

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers: [Storage,OneSignal]

})

export class Page1 {
  Page2 = Page2;
  Page4 = Page4;
  Page6 = Page6;
  Page7 = Page7;
  Page10 = Page10;
  Page15 = Page15;
  Page8 = Page8;
  ContactPage = ContactPage;
  ForgetpassPage = ForgetpassPage;
  NewpassPage = NewpassPage;
  OndemandPage = OndemandPage;
  RecentplayPage = RecentplayPage;
  FavouritePage = FavouritePage;

  posts: any;
  movieInfo: any;
  HollywoodTVShow: any;
  trailers: any;
  EngDubbedMovies: any;
  punjabiMovies: any;
  documentaryMovies: any;
  englishMovies: any;
  hindiMovies: any;
  a: any;
  movies: any;
  test: any;
  MySlides = {
    initialSlide: 1,
    loop: true,
    autoplay: true,
    speed: 3000,
    pager: true
  };

  scroll = {
    initialSlide: 0,
    loop: false
  };
  usrid: any;
  private storage: Storage;
constructor(public nav: NavController, public Toast:ToastController,storage: Storage, public platform: Platform, private navParams: NavParams, public navCtrl: NavController, public popoverCtrl: PopoverController, private http: Http, private loadingCtrl: LoadingController, public alertCtrl: AlertController) {
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

    document.addEventListener("pause", () => {

    }, false);

    document.addEventListener("resume", () => {

    }, false);

 var dmodel= Device.model;
 var dplatform=Device.platform;
 var duuid=Device.uuid;
 var dversion=Device.version;
 var dmanufacturer=Device.manufacturer;
 var dserial=Device.serial;
          
    this.platform.ready().then(() => {
    OneSignal.startInit('7719aa43-a172-4bf1-8b18-c82cdc74cc60', '496393699143');
    OneSignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.Notification);
    OneSignal.setSubscription(true);
    OneSignal.getIds().then((dviceid)=>{
        console.log(dviceid.userId);
        this.storage.get('status').then((status) => {
          var status=status;
          AppVersion.getVersionNumber().then((v)=>{

          if(status!='1'){
          this.http.get("http://api.movies4star.com/saveToken?token="+dviceid.userId+"&uuid="+duuid+"&platform="+dplatform+"&manufac="+dmanufacturer+"&model_num="+dmodel+"&version="+dversion+"&serial="+dserial+"&app_version="+v).map(res => res.json()).subscribe(data => {
            this.storage.set('status','1');
          });
          }
          else{
              var status=status;
          }
        })
        })
    });
    OneSignal.handleNotificationReceived().subscribe((data) => {
    });
    OneSignal.handleNotificationOpened().subscribe((data) => {
      var videoid=JSON.stringify(data.notification.payload.additionalData.foo);
      this.nav.push(Page7,{
        movieInfo:videoid
      });
    });

    OneSignal.endInit();
  })
    this.storage = storage;
    this.http.get('http://api.movies4star.com/slider_home').map(res => res.json()).subscribe(data => {
      this.posts = data;

    });
    this.http.get('http://api.movies4star.com/all_movies_hd').map(res => res.json()).subscribe(data => {
      this.movies = data;
    });
    this.http.get('http://api.movies4star.com/trailers_front').map(res => res.json()).subscribe(data => {
      this.trailers = data;
    });
    this.http.get('http://api.movies4star.com/catMovies?slug=Punjabi-Movies').map(res => res.json()).subscribe(data => {
      this.punjabiMovies = data;
    });
    this.http.get('http://api.movies4star.com/catMovies?slug=English-Movies').map(res => res.json()).subscribe(data => {
      this.englishMovies = data;
    });
    this.http.get('http://api.movies4star.com/catMovies?slug=Hindi-Movies').map(res => res.json()).subscribe(data => {
      this.hindiMovies = data;
    });
    this.http.get('http://api.movies4star.com/docMovies?slug=English-Dubbed-Movies').map(res => res.json()).subscribe(data => {
      this.EngDubbedMovies = data;
    });
    this.http.get('http://api.movies4star.com/docMovies?slug=Hollywood-TV-Show').map(res => res.json()).subscribe(data => {
      this.HollywoodTVShow = data;
    });
    this.http.get('http://api.movies4star.com/docMovies?slug=documentary').map(res => res.json()).subscribe(data => {
      this.documentaryMovies = data;
    });

  }

  submit(a) {
    this.navCtrl.push(Page2, {
      firstPassed: a,

    });
  }
  searchBtn() {
    this.navCtrl.push(Page3, {
    });
  }

  /*----------------functions for More button functionality -----------------*/
  allLatestMovies(b) {

    this.navCtrl.push(Page6, {
      allTypesOfMovies: b,

    });
  }

 allEnglishMovies(b) {
    this.navCtrl.push(Page6, {
      allTypesOfMovies: b,

    });
  }

  allPunjabiMovies(b) {
    this.navCtrl.push(Page6, {
      allTypesOfMovies: b,
    });
  }

  allHindiMovies(b) {
    this.navCtrl.push(Page6, {
      allTypesOfMovies: b,
    });
  }

  allEngDubbedMovies(b) {
    this.navCtrl.push(Page6, {
      allTypesOfMovies: b,
    });
  }

  allTrailers(b) {
    this.navCtrl.push(Page6, {
      allTypesOfMovies: b,
    });
  }

  allHollywoodTVShow(b) {
    this.navCtrl.push(Page6, {
      allTypesOfMovies: b,
    });
  }

  documentary(b) {
    this.navCtrl.push(Page6, {
      allTypesOfMovies: b,
    });
  }

  /*-----------------------------ends here-----------------------------*/
  openMovieinfo(abc) {

    this.navCtrl.push(Page7, {
      movieInfo: abc,
    });
  }

  openTrailerinfo(abc) {
    this.navCtrl.push(Page7, {
      trailerInfo: abc,
    });
  }

  comingsoon(b) {
    this.navCtrl.push(Page6, {
      allTypesOfMovies: b,
    });
  }

  NowReleased(b) {
    this.navCtrl.push(Page6, {
      allTypesOfMovies: b,
    });
  }

  NextMonth(b) {
    this.navCtrl.push(Page6, {
      allTypesOfMovies: b,
    });
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
}

@Component({
  providers: [ Storage],
  selector: 'ng-if-simple',
  template: `
   <div class="hh" style="width:100px;">
    <ion-list  style="margin-bottom:0px; width:160px;">
      <button ion-item (click)="loginBtn()">Sign in</button>
      <button ion-item (click)="dmca()">DMCA</button>
      <button ion-item (click)="contact()">Contact Us</button>
      <button ion-item (click)="aboutus()">About {{version}}</button>
      <button ion-item (click)="ondemand()">On Demand</button>
      <button ion-item *ngIf="usrid!= null" (click)="recplayed()">Recently Played</button>
      <button ion-item *ngIf="usrid!= null" (click)="favourite()">Favourite Movies</button>
    </ion-list>
    </div>
  `
})
export class PopoverPage {
  usrid: any;
  version:any;
  private storage: Storage;
  constructor(public viewCtrl: ViewController,public platform:Platform, private navParams: NavParams, public navCtrl: NavController, storage: Storage) {
    this.storage = storage;
    this.storage.get('userid').then((userid) => {
      this.usrid = userid;
    })
      this.version="";
              AppVersion.getVersionNumber().then((v)=>{
              this.version=v;
            })    
  }

  loginBtn() {
    this.navCtrl.push(Page4, {
    });
  }

  dmca() {
    this.navCtrl.push(Page8, {
    });
  }

  aboutus() {
    this.navCtrl.push(Page10, {
    });
  }

  contact() {
    this.navCtrl.push(ContactPage, {
    });
  }
  ondemand() {
    this.navCtrl.push(OndemandPage, {
    });
  }
  recplayed() {
    this.navCtrl.push(RecentplayPage, {
    });
  }
  favourite() {
    this.navCtrl.push(FavouritePage, {
    });
  }

}


