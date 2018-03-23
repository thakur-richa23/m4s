import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Page5 } from '../page5/page5';
import { Page1 } from '../page1/page1';
import { ForgetpassPage } from '../forgetpass/forgetpass';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { GooglePlus } from 'ionic-native';
import { Facebook} from '@ionic-native/facebook';
import { NativeStorage } from 'ionic-native';
import { Network } from 'ionic-native';
import 'rxjs/add/operator/map';

declare var window: any;
@Component({
  selector: 'page-page4',
  templateUrl: 'page4.html',
  providers: [Storage],

})
export class Page4 {
  Page5 = Page5;
  Page1:any;
  rootPage: any;
  ForgetpassPage = ForgetpassPage;
  data: any;
  FB_APP_ID: number = 218325921972043;
  private storage: Storage;
  loginresp:any;
  constructor(public navCtrl: NavController, public fb:Facebook,public navParams: NavParams, private http: Http, private platform: Platform, private loadingCtrl: LoadingController, storage: Storage) {
  
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
    this.data = {};
    this.data.email = '';
    this.data.password = '';
    this.storage = storage;
    this.storage.clear();
    this.fb.browserInit(this.FB_APP_ID, "v2.8");

  }
  submit() {

    this.http.get('http://api.movies4star.xyz/login?email=' + this.data.email + "&password=" + this.data.password).map(res => res.json()).subscribe(data => {
      this.loginresp = data;
      this.data = this.loginresp.ID;
      this.storage.set('userid', this.data);
      if(this.loginresp.status!="Failed")
      {
        //alert("You have successfully login"); 
        this.platform.ready().then(() => {
            window.plugins.toast.show("You have successfully login", "long", 'center');
          });
        
        this.navCtrl.setRoot(Page1);    
      }
      else{
        //alert("Please enter appropriate details");
          this.platform.ready().then(() => {
            window.plugins.toast.show("Please enter appropriate details", "long", 'center');
          });
      }
    });
  }

  signUp() {
    this.navCtrl.push(Page5, {
    });
  }

  forget() {
    this.navCtrl.push(ForgetpassPage, {
    });
  }
  fblogin(){
   let permissions = new Array<string>();
    let nav = this.navCtrl;
	  let env = this;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];
    this.fb.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array<string>();

      //Getting name and gender properties
      env.fb.api("/me?fields=name,gender", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        NativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(function(){
          nav.setRoot(Page1);
        }, function (error) {
          console.log(error);
        })
      })
    }, function(error){
      console.log(error);
    });
  }

  googlelogin(){
let nav = this.navCtrl;
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();
  GooglePlus.login({
    'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
    'webClientId': '350915099440-ud1c81jbth64pse2au6lq9dgit2nii2m.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
    'offline': true
  })
  .then(function (user) {
    loading.dismiss();
    //alert(JSON.stringify(user));
      NativeStorage.setItem('user', {
      name: user.displayName,
      email: user.email,
      picture: user.imageUrl
    })
    .then(function(){
      nav.setRoot(Page1,{
        type:'google',
        name: user.displayName,
        email: user.email,
        picture: user.imageUrl
      });
    }, function (error) {
      console.log(error);
    })
  }, function (error) {
    loading.dismiss();
  });
  }

}
