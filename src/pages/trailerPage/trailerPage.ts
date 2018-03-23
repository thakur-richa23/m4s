import { Component } from '@angular/core';
import { Page1 } from '../page1/page1';
import { Page7 } from '../page7/page7';
import { Page2 } from '../page2/page2';
import { Network } from 'ionic-native';
import { Http } from '@angular/http';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NavController, NavParams, PopoverController, AlertController, ViewController, LoadingController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Insomnia } from 'ionic-native';
import { StreamingMedia, StreamingVideoOptions } from 'ionic-native';
import { VgCoreModule } from 'videogular2/core';
import { AdMob } from '@ionic-native/admob';
import { InAppBrowser } from '@ionic-native/in-app-browser';

declare var window: any;
interface AdMobtype{
  banner:string,
  interstitial:string
}
@Component({
  selector: 'page-trailerPage',
  templateUrl: 'trailerPage.html',
  providers: [Storage]
})

export class TrailerPage {
  url: SafeResourceUrl;
  Page1 = Page1;
  Page7 = Page7;
  public posts = {};
  cameraSrc: string;
  cameraSrcc: string;
  video: any;
  public some = {};
  private firstPassed: any;
  private secondPassed: any;
  private storage: Storage;
  private favPassed: any;
  relatedOnes: any;
  reltedone: any;
  relOnes: any;
  usrid: any;
  frstPased: any;
  movislug: any;
  trailer_slug: any;
  slug1: any;
  contact: any;
  name: any;
  email: any;
  movie: any;
  message: any;
  imgurl:any;
  videoos:any;
  imgid:any;
  adtext:any;
  adlink:any;
  ytube_link:any;
constructor(public navCtrl: NavController,private iab: InAppBrowser, private admob:AdMob, private platform: Platform, public alertCtrl: AlertController,  sanitizer: DomSanitizer, public navParams: NavParams, public popoverCtrl: PopoverController, private http: Http, private loadingCtrl: LoadingController, storage: Storage) {
Network.onDisconnect().subscribe(() => {
      this.platform.ready().then(() => {
          window.plugins.toast.show("You are offline", "long", "center");
        });
    });
    Network.onConnect().subscribe(()=> {
          this.platform.ready().then(() => {
          window.plugins.toast.show("You are offline", "long", "center");
        });
    });
    document.addEventListener("pause", () => {

    }, false);

    document.addEventListener("resume", () => {

    }, false);

  this.storage = storage;
    this.trailer_slug = this.firstPassed = navParams.get("firstPassed");
       let loadingPopup = this.loadingCtrl.create({
      content: '',
      cssClass:'a'
    });
    // Show the popup
    loadingPopup.present();

      this.http.get('http://api.movies4star.xyz/videos_front?slug=' + this.trailer_slug).map(res => res.json()).subscribe(data => {
 setTimeout(() => {
          this.imgurl = data.movieImage;
          loadingPopup.dismiss();
          }, 2000);
          //this.ytube_link = data.youtube_link;
          this.ytube_link = "6fothfUmryQ";
          this.cameraSrcc = "https://www.youtube.com/embed/" + this.ytube_link;
          this.url = sanitizer.bypassSecurityTrustResourceUrl(this.cameraSrcc)
         
          this.relatedOnes = data.related_movies;  
        });
}

  videoclick(movieslug, trailorslug, videoid) {
  this.videoos=document.getElementById(videoid); 
  this.videoos.pause();
     this.navCtrl.push(Page2, {
      firstPassed: movieslug,
      secondPassed: trailorslug,
    });
  }

  banner(link){
var browser_link = this.iab.create(link);
  }


}

