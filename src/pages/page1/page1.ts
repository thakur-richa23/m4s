import { Component, ViewChild  } from '@angular/core';
import { Content } from 'ionic-angular';
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
import { NavController, Platform, LoadingController,ToastController, PopoverController, NavParams, ViewController, AlertController, MenuController  } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { AppVersion } from 'ionic-native';
import {OneSignal} from 'ionic-native';
import {Device} from 'ionic-native';
import { AdMob } from '@ionic-native/admob';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {App} from "ionic-angular";

declare var window: any;
interface AdMobtype{
  banner:string,
  interstitial:string
}
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers: [Storage,OneSignal]

})

export class Page1 {
  @ViewChild(Content) content: Content;
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
  movieresponse: any;
  posts: any;
  movieInfo: any;
  HollywoodTVShow: any;
  trailers: any;
  EngDubbedMovies: any;
  punjabiMovies: any;
  documentaryMovies: any;
  englishMovies: any;
  hindiMovies: any;
  adtext:any;
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
  adlink:any;
constructor(public nav: NavController,private iab: InAppBrowser, public menu: MenuController, private admob:AdMob,public Toast:ToastController,storage: Storage, public platform: Platform, private navParams: NavParams, public navCtrl: NavController, public popoverCtrl: PopoverController, private http: Http, private loadingCtrl: LoadingController, public alertCtrl: AlertController) {

     platform.ready().then(() => {
        var admobid: AdMobtype;
        if (/(android)/i.test(navigator.userAgent)) {
        admobid = { // for Android
          banner: 'ca-app-pub-2266939936529282~3437745855',
          interstitial: 'ca-app-pub-2266939936529282/1821411858'
        };
      } if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = { // for iOS
          banner: 'ca-app-pub-234234234234324/234234234234',
          interstitial: 'ca-app-pub-234234234234324/234234234234'
        };
      } else {
        admobid = { // for Windows Phone
          banner: 'ca-app-pub-234234234234324/234234234234',
          interstitial: 'ca-app-pub-234234234234324/234234234234'
        };
      }
       this.admob.createBanner({
        adId: admobid.banner,
        //isTesting: true, //comment this out before publishing the app
        autoShow: true
      })
    });
    
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
          this.http.get("http://api.movies4star.xyz/saveToken?token="+dviceid.userId+"&uuid="+duuid+"&platform="+dplatform+"&manufac="+dmanufacturer+"&model_num="+dmodel+"&version="+dversion+"&serial="+dserial+"&app_version="+v).map(res => res.json()).subscribe(data => {
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

this.allcategory();
  this.storage = storage;
    this.http.get('http://api.movies4star.xyz/slider_home').map(res => res.json()).subscribe(data => {
      this.posts = data;

    });
}

allcategory(){
     let loadingPopup = this.loadingCtrl.create({
      content: ''
    });
    // Show the popup
    loadingPopup.present();
      this.http.get('http://api.movies4star.xyz/catMoviess').map(res => res.json()).subscribe(data => {
      setTimeout(() => {
       this.movieresponse = data;
          loadingPopup.dismiss();
          }, 1000);
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

  banner(link){
var browser_link = this.iab.create(link);
  }

  allMovies(b) {
    this.navCtrl.push(Page6, {
      allTypesOfMovies: b,
    });
  }

  openMovieinfo(a,b) {
    if(b == 'movies'){
      // this.storage.set("trailerInfo", 0);
      // this.storage.set("movieInfo", a);
      this.navCtrl.push(Page7,{
        movieInfo:a
      });
    }else{
      // this.storage.set("movieInfo", 0);
      // this.storage.set("trailerInfo", a);
      this.navCtrl.push(Page7,{
        trailerInfo:a
      });
    } 
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
  mostview(b){
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
    <ion-list style="margin-bottom:0px; width:160px;">
      <button ion-item (click)="loginBtn()">Sign in</button>
      <button ion-item (click)="dmca()">DMCA</button>
      <button ion-item (click)="contact()">Contact Us</button>
      <button ion-item (click)="aboutus()">About {{version}}</button>
      <button ion-item (click)="ondemand()">On Demand</button>
      <button ion-item *ngIf="usrid!= null" (click)="recplayed()">Recently Played</button>
      <button ion-item *ngIf="usrid!= null" (click)="favourite()">Favourite Movies</button>
      <button ion-item (click)="subscrb()">Subscribe</button>
    </ion-list>
    </div>
  `
})
export class PopoverPage {
  usrid: any;
  version:any;
   email: any;
   subscribe:any;
  private storage: Storage;
  constructor(public viewCtrl: ViewController, public app: App, private http: Http, public platform:Platform, private navParams: NavParams, public navCtrl: NavController, storage: Storage, public alertCtrl:AlertController) {
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
     this.viewCtrl.dismiss().then(() => {
      this.app.getRootNav().push(Page4);
    });
  }

  subscrb(){
     let alert = this.alertCtrl.create({
     title: 'Subscribe for Newsletter',
     cssClass: 'abtn',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email',
          value: this.email
        }
      ],
      buttons: [
        {
          text: 'Submit',
          handler: data => {
            this.http.get('http://api.movies4star.xyz/subscribe?email='+ data.email).map(res => res.json()).subscribe(data => {
              this.subscribe = data;
              //console.log(this.subscribe.msg);
              if (this.subscribe.msg == "saved") {
                this.platform.ready().then(() => {
                  window.plugins.toast.show("Thanks for Subscribing", "long", "center");
                });
              }else if(this.subscribe.msg == "already exist"){
                this.platform.ready().then(() => {
                  window.plugins.toast.show("already exist", "long", "center");
                });
              }
            });
          }
        }
      ]
    });
    alert.present();
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


