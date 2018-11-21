import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { RestService } from '../../../services/rest.service';
import { LocationUtility } from '../../../services/location-utility';
import { User } from '../../../shared/modal/user';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { WindowService } from '../../../services/window.service';
import * as firebase from 'firebase/app';
import { MatSnackBar } from '@angular/material';
import { SentEmail } from '../../../services/sendemail.service';
import { HostConfig } from '../../../services/host-config';

@Component({
  selector: 'app-joinus',
  templateUrl: './joinus.component.html',
  styleUrls: ['./joinus.component.css']
})
export class JoinsComponent implements OnInit {

  @ViewChild('joinmodal') joinmodal: ElementRef;
  @ViewChild('transporter') transporter: ElementRef;
  user: User = new User();
  savePassword = false;
  loginType;
  disableEmail;
  disableMobile;
  passwordError;
  pwd;
  rpwd;
  countries = [
    { code: '91', name: 'India' },
    { code: '1', name: 'US' },
    { code: '3', name: 'UK' }];
  windowRef: any;
  otpError;
  verificationCode;
  generateOTP = false;
  otpVarified = false;
  constructor(private _restService: RestService
    , private router: Router
    , private _cookieService: CookieService
    , private ngZone: NgZone
    , private win: WindowService
    , public snackBar: MatSnackBar
    , private sentEmail: SentEmail) { }

  ngOnInit() {
    this.loginType = sessionStorage.getItem('loginType');
    if (this.loginType && this.loginType === 'mobile') {
      this.generateOTP = true;
      this.otpVarified = true;
    }

    setTimeout(() => {
      this.loginType = sessionStorage.getItem('loginType');
      const tempUser = JSON.parse(sessionStorage.getItem('user'));
      if (tempUser) { this.user = this.convertUser(tempUser); }
      this.joinmodal.nativeElement.style.display = 'block';
    }, 1000);

    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container2', {
      'size': 'invisible',
      'callback': function (response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log('RecaptchaVerified');

        //   onSignInSubmit();
      }
    });
    this.windowRef.recaptchaVerifier.render();
  }



  openSnackBar(snackMessage) {
    this.snackBar.open(snackMessage, '', {
      duration: 5000,
    });
  }

  onlyNumberKey(event) {
    return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  comparePass() {
    if (this.pwd === this.rpwd) {
      this.passwordError = false;
    } else {
      this.passwordError = true;
    }
  }

  sendLoginCode() {
    if (this.loginType && this.loginType === 'mobile') {
      this.sentEmail.registerUserSend(this.user).subscribe((data) => {
        this.generateOTP = true;
        this.openSnackBar('Varification code sent on Email');
      }, error => {
        console.log(error);
      });

    } else if (this.loginType) {
      const appVerifier = this.windowRef.recaptchaVerifier;
      const num = this.user.e164;
      firebase.auth().signInWithPhoneNumber(num, appVerifier)
        .then(result => {
          this.generateOTP = true;
          this.windowRef.confirmationResult = result;
          this.openSnackBar('Varification code sent on Mobile');
        })
        .catch(error => console.log(error));
    }
  }
  verifyLoginCode() {
    if (this.loginType && this.loginType === 'mobile') {


      this._restService.getRequest(`${HostConfig.hostUrl}/otp/validate/${this.user.email}/${this.verificationCode}`)
        .subscribe(data => {
          if ((<{ valid: string }>data).valid) {
            this.otpVarified = true;
            
            console.log(data);
          } else {
            this.otpVarified = false;
            this.otpError = 'Incorrect code entered.';
            console.log('Incorrect code entered?');
          }
        },
        (error) => {
          this.otpError = 'Incorrect code entered.';
          console.log(error, 'Incorrect code entered?');
        });
    } else if (this.loginType) {

      this.windowRef.confirmationResult
        .confirm(this.verificationCode)
        .then(result => {
          // this.user = result.user;
          this.otpVarified = true;
        })
        .catch(error => {
          this.otpError = 'Incorrect code entered.';
          console.log(error, 'Incorrect code entered?');
        }
        );
    }
  }

  signup() {
    this._restService.postRequest(`${HostConfig.hostUrl}/user`, JSON.stringify(this.user))
      .subscribe(data => {
        const userName: UserName = new UserName();
        userName.fName = (<UserName>data).fName;
        userName.lName = (<UserName>data).lName;
        const cookieOptions = {
          expires: new Date(new Date().setMinutes(new Date().getMinutes() + 30))
        };
        this._cookieService.putObject('user', userName, cookieOptions);
        this._cookieService.put('ut', (<{ id: string }>data).id, cookieOptions);
        sessionStorage.removeItem('loginType');
        sessionStorage.removeItem('user');
        this.joinmodal.nativeElement.style.display = 'none';
        // this.transporter.nativeElement.click();
        const redirecturl = (this.router.url.indexOf('transporter') > -1) ?
         'transporter' : this.router.url.indexOf('shipper') > -1 ? 'shipper' : '';
        this.ngZone.run(() => this.router.navigate([redirecturl]));
        
      }
    );
  }

  sendtohome() {
    this.joinmodal.nativeElement.style.display = 'none';
    this.router.navigate(['transporter']);
  }

  convertUser(data): User {

    const user = new User();
    if (this.loginType === 'google') {
      this.disableEmail = true;
      user.fName = data.additionalUserInfo.profile.given_name;
      user.lName = data.additionalUserInfo.profile.family_name;
      user.email = data.additionalUserInfo.profile.email;
      user.gender = data.additionalUserInfo.profile.gender;
      user.picture = data.additionalUserInfo.profile.picture;
      user.mcountry = '91';
    } else if (this.loginType === 'fb') {
      this.disableEmail = true;
      user.fName = data.additionalUserInfo.profile.first_name;
      user.lName = data.additionalUserInfo.profile.last_name;
      user.email = data.additionalUserInfo.profile.email;
      user.gender = data.additionalUserInfo.profile.gender;
      user.picture = data.additionalUserInfo.profile.picture.data.url;
      user.mcountry = '91';
    } else if (this.loginType === 'mobile') {
      this.disableMobile = true;
      user.mobile = data.user.phoneNumber;
    }
    user.id = data.user.uid;
    user.loginType = this.loginType;
    return user;
  }
}

class UserName {
  fName: string;
  lName: string;
}



