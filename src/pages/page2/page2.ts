import { Component } from '@angular/core';
import { Page1 } from '../page1/page1';
import { Page7 } from '../page7/page7';
import { Network } from 'ionic-native';
import { Http } from '@angular/http';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NavController, NavParams, PopoverController, AlertController, ViewController, LoadingController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Insomnia } from 'ionic-native';
import { StreamingMedia, StreamingVideoOptions } from 'ionic-native';

declare var window: any;
@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html',
  providers: [Storage]
})

export class Page2 {
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
  slug: any;
  slug1: any;
  contact: any;
  name: any;
  email: any;
  movie: any;
  message: any;
  imgurl:any;
  videoos:any
constructor(public navCtrl: NavController, private platform: Platform, public alertCtrl: AlertController,  sanitizer: DomSanitizer, public navParams: NavParams, public popoverCtrl: PopoverController, private http: Http, private loadingCtrl: LoadingController, storage: Storage) {
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
          this.http.get('http://api.movies4star.com/addRecent?id=' + this.usrid + '&slug=' + this.slug).map(res => res.json()).subscribe(data => {
          
          }
          );
        }
      });
      this.http.get('http://api.movies4star.com/videos_front?slug=' + this.slug).map(res => res.json()).subscribe(data => {
        setTimeout(() => {
          this.imgurl=data.movieImage;
          StreamingMedia.playVideo(this.cameraSrc) ;
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
      this.http.get('http://api.movies4star.com/tr_front?slug=' + slug1).map(res => res.json()).subscribe(data => {
        setTimeout(() => {
            this.cameraSrc = data.playlink,
            this.cameraSrcc = "https://www.youtube.com/embed/" + this.cameraSrc;
            this.url = sanitizer.bypassSecurityTrustResourceUrl(this.cameraSrcc),

        Insomnia.keepAwake().then(() =>           

             () => console.log('error')
          )
          this.video = "Trailor";
          this.relatedOnes = data.related_movies;
          loadingPopup.dismiss();
        }, 1000);

      },
        err => console.error(err)
      );
    }

  }
/*******VideoPlayer ********/


stop(){
  this.videoos=document.getElementById('video1'); 
  this.videoos.pause();
  this.videoos.currentTime=0; 
  var btn=document.getElementById("play");
      btn.innerHTML= "<img src='img/play.png'/>";
}

playPause(){
  this.videoos=document.getElementById('video1');  
  var btn=document.getElementById("play");
  if(this.videoos.paused===false){
     this.videoos.pause();
      btn.innerHTML= "<img src='img/play.png'/>";
   
  }
  else{
  this.videoos.play();
  btn.innerHTML= "<img src='img/pause.png'/>";
     
  }
} 

fullscreen(){
    this.videoos=document.getElementById('video1');  

      if ( this.videoos.requestFullscreen) {
        this.videoos.requestFullscreen();
      } else if ( this.videoos.msRequestFullscreen) {
        this.videoos.msRequestFullscreen();
      } else if ( this.videoos.mozRequestFullScreen) {
        this.videoos.mozRequestFullScreen();
      } else if (this.videoos.webkitRequestFullscreen) {
        this.videoos.webkitRequestFullscreen();
      }

}

rewind(){
    this.videoos.currentTime-=10; 
}

forward(){
   this.videoos.currentTime+=10; 
}

setVolume(value){
  this.videoos=document.getElementById('video1');  
  var vol=this.videoos.volume;
  vol+=value;
  if(vol>=0 && vol <=1){
    this.videoos.volume=vol;
  }
  else{
    this.videoos.volume= (vol<0) ? 0:1;
  }
}

enableMute(){
     this.videoos=document.getElementById('video1');  

  var button=document.getElementById("mute");
  if(this.videoos.mute=='true'){
    this.videoos.mute=false;
    button.innerHTML= "<img src='img/mute.png'/>";
  }
  else{
    this.videoos.mute=true;
    button.innerHTML= "<img src='img/unmute.png'/>";
  }
}

/*******VideoPlayer ********/
  redirect(){
    this.navCtrl.push(Page1);
  }


  videoclick(a, b) {
     this.navCtrl.push(Page2, {
      firstPassed: a,
      secondPassed: b,
    });
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
            this.http.get('http://api.movies4star.com/reportMovie?name=' + data.name + "&email=" + data.email + "&movie_name=" + data.moviename + "&comments=" + data.message).map(res => res.json()).subscribe(data => {
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

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage1);
    popover.present({
      ev: myEvent
    });
  }

}

@Component({
  template: `
   <div class="hh" style="width:100px;">
    <ion-list  style="margin-bottom:0px; width:160px;">
      <button ion-item (click)="close()">Exit</button>
    </ion-list>
    </div>
  `
})
export class PopoverPage1 {
  content: any;
  constructor(public viewCtrl: ViewController, private navParams: NavParams, public navCtrl: NavController) {
  }

  close() {
    this.navCtrl.push(Page1);
    window.location.reload(true);
  }
}
