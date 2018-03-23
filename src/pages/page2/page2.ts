import { Component } from '@angular/core';
import { Page1 } from '../page1/page1';
import { Page7 } from '../page7/page7';
import { TrailerPage } from '../trailerPage/trailerPage';
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
import { SubscribePage } from '../subscribe/subscribe';
import { InAppBrowser } from '@ionic-native/in-app-browser';

declare var window: any;
interface AdMobtype{
  banner:string,
  interstitial:string
}
@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html',
  providers: [Storage]
})

export class Page2 {
  url: SafeResourceUrl;
  Page1 = Page1;
  Page7 = Page7;
  TrailerPage:any;
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
  slug: any;
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
  sub:any;

constructor(public navCtrl: NavController,private iab: InAppBrowser, private admob:AdMob, private platform: Platform, public alertCtrl: AlertController,  sanitizer: DomSanitizer, public navParams: NavParams, public popoverCtrl: PopoverController, private http: Http, private loadingCtrl: LoadingController, storage: Storage) {
this.admob.hideBanner();
  this.http.get('http://api.movies4star.xyz/adTextApp').map(res => res.json()).subscribe(data => {
  
      this.adtext = data.ad_image;
      this.adlink = data.ad_link;
    });
   
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
    this.slug1 = this.secondPassed = navParams.get("secondPassed");
    this.movislug = this.frstPased = navParams.get("frstPased");
    this.slug = this.firstPassed = navParams.get("firstPassed");

    // Create the popup
    let loadingPopup = this.loadingCtrl.create({
      content: ''
    });
    // Show the popup
    loadingPopup.present();

    if (this.slug != undefined) {

      this.storage.get('userid').then((userid) => {
        this.usrid = userid;
        if (this.usrid != null) {
          this.http.get('http://api.movies4star.xyz/addRecent?id=' + this.usrid + '&slug=' + this.slug).map(res => res.json()).subscribe(data => {
          
          }
          );
        }
      });
      this.http.get('http://api.movies4star.xyz/videos_front?slug=' + this.slug).map(res => res.json()).subscribe(data => {
        setTimeout(() => {
          this.imgurl = data.movieImage;
          this.ytube_link = data.youtube_link;
          this.cameraSrcc = "https://www.youtube.com/embed/" + this.ytube_link;
          this.url = sanitizer.bypassSecurityTrustResourceUrl(this.cameraSrcc),
          StreamingMedia.playVideo(this.cameraSrc);
          Insomnia.keepAwake().then(() => 
                    
              this.cameraSrc = data.playlink,
              () => console.log('error')
          ); 
          
          this.cameraSrc = data.playlink;
          this.relatedOnes = data.related_movies; 
          this.video = "Movies";
          loadingPopup.dismiss();
        }, 1000);

      },
        err => console.error(err)
      );
    }
    else {
      var slug1 = this.secondPassed = navParams.get("secondPassed");
      this.http.get('http://api.movies4star.xyz/tr_front?slug=' + slug1).map(res => res.json()).subscribe(data => {
        setTimeout(() => {
            this.cameraSrc = data.playlink,
            this.cameraSrcc = "https://www.youtube.com/embed/" + this.cameraSrc;
            this.url = sanitizer.bypassSecurityTrustResourceUrl(this.cameraSrcc),

        Insomnia.keepAwake().then(() =>           

             () => console.log('error')
          )
          this.video = "Trailer";
          this.relatedOnes = data.related_movies;
          loadingPopup.dismiss();
        }, 1000);

      },
        err => console.error(err)
      );
    }
      
  }

  videoclick(movieslug, trailorslug, videoid) {
  this.videoos=document.getElementById(videoid); 
  this.videoos.pause();
     this.navCtrl.push(Page2, {
      firstPassed: movieslug,
      secondPassed: trailorslug,
    });
  }

trailer(){
  this.navCtrl.push(TrailerPage,{
    firstPassed: this.slug
  });
}
download(link){
 var browser_link = this.iab.create(link);
}

  banner(link){
var browser_link = this.iab.create(link);
  }

  reportpopup() {

    let alert = this.alertCtrl.create({
      title: 'Login',
      cssClass: 'abtn',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: this.name
        },
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email',
          value: this.email
        },
        {
          name: 'moviename',
          placeholder: 'Movie',
          type: 'hidden',
          value: this.slug
        },
        {
          name: 'message',
          placeholder: 'Message',
          type: 'message',
          value: this.message
        }
      ],
      buttons: [
        {
          text: 'Submit',
          handler: data => {
            this.http.get('http://api.movies4star.xyz/reportMovie?name=' + data.name + "&email=" + data.email + "&movie_name=" + data.moviename + "&comments=" + data.message).map(res => res.json()).subscribe(data => {
              this.movie = data;
              if (this.movie.success == "Sucess") {
                this.platform.ready().then(() => {
                  window.plugins.toast.show("Your report has been successful", "long", "center");
                });
              }
            });
          }
        }
      ]
    });
    alert.present();
  }

  subscribe(){
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
              this.sub = data;
              if (this.sub.msg == "saved") {
                this.platform.ready().then(() => {
                  window.plugins.toast.show("Thanks for Subscribing", "long", "center");
                });
              }else if(this.sub.msg == "already exist"){
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

  // presentPopover(myEvent) {
  //   let popover = this.popoverCtrl.create(PopoverPage1);
  //   popover.present({
  //     ev: myEvent
  //   });
  // }

}

// @Component({
//   template: `
//    <div class="hh" style="width:100px;">
//     <ion-list  style="margin-bottom:0px; width:160px;">
//       <button ion-item (click)="close()">Exit</button>
//     </ion-list>
//     </div>
//   `
// })
// export class PopoverPage1 {
//   content: any;
//   constructor(public viewCtrl: ViewController, private navParams: NavParams, public navCtrl: NavController) {
//   }

//   close() {
//     this.navCtrl.setRoot(Page1);
//   }
// }
