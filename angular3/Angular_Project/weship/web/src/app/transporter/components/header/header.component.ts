import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../..//services/auth.service';
import { CookieService } from 'ngx-cookie';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { AuthGuard } from '../../auth-guard.service';
import { LoginEvent } from '../../..//services/login-event';
import { WindowService } from '../../../services/window.service';
import { RestService } from '../../../services/rest.service';
import { User } from '../../../shared/modal/user';
import { HostConfig } from '../../../services/host-config';

@Component({
  selector: 'app-transport-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('loginPanel') loginPanel: ElementRef;
  @ViewChild('signup') signup: ElementRef;


  constructor(private router: Router
    , private route: ActivatedRoute
    , private authService: AuthService
    , private _cookieService: CookieService
    , private loginEvent: LoginEvent
    , private win: WindowService
    , private ngZone: NgZone
    , private _restService: RestService) {
  }

  windowRef: any;
  verificationCode: string;
  user: any;
  loginType;
  otpLogin = false;

  loginEmail;
  loginOTP;
  loggedInUser;

  cookieOptions = {
    expires: new Date(new Date().setMinutes(new Date().getMinutes() + 30))
  };

  ngOnInit() {
    if (this._cookieService.get('ut')) {
      this.loggedInUser = this._cookieService.getObject('user');

      this._cookieService.put('ut', this._cookieService.get('ut'), this.cookieOptions);
      this._cookieService.putObject('user', this._cookieService.getObject('user'), this.cookieOptions);
    }
    this.loginEvent.canActivateEvent.subscribe(val => { this.showLogin(); });
  }

  showLogin() {
    this.otpLogin = true;
    this.loginEmail = '';
    this.loginPanel.nativeElement.style.display = 'block';
    // input.display = 'block';
  }
  login(loginBy: string, logingPanel) {
    this.loginType = loginBy;
    this.loginBy(loginBy)
      .then(data => {
        this.preserveUser(data);

        this.loginPanel.nativeElement.style.display = 'none';
        // this._cookieService.put('ut', JSON.stringify(data));

        this.loginEvent.canActivateEvent.unsubscribe();
      }, (error) => {
        alert(error.message);
      })
      .catch(error => {
        alert(error.message);
      });
  }
  mobileLogin(userData) {
    this.loginType = 'mobile';
    console.log(userData);
    this.preserveUser(userData);
    this.loginPanel.nativeElement.style.display = 'none';
  }

  loginBy(loginBy: string) {
    return this.authService.loginWith(loginBy);
  }

  logout() {
    this.loggedInUser = null;
    this._cookieService.remove('ut');
    this.authService.logout();
    this.router.navigate(['/transporter']);
    this.loginEvent.canActivateEvent.subscribe(val => { this.showLogin(); });
    this.refreshPage();
  }
  refreshPage() {
    window.location.reload();
  }

  preserveUser(user) {
    this._restService.getRequest(`${HostConfig.hostUrl}/user/${user.user.uid}`).subscribe(data => {
      if (data) {
        const userName: UserName = new UserName();
        userName.fName = (<UserName>data).fName;
        userName.lName = (<UserName>data).lName;
        this.loggedInUser = userName;

        this._cookieService.putObject('user', userName, this.cookieOptions);
        this._cookieService.put('ut', (<{ id: string }>data).id, this.cookieOptions);
        // console.log(this.route);
        // console.log(this.router);
        this.ngZone.run(() => this.router.navigate([this.router.url]));
        // this.refreshPage();

      } else {
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('loginType', this.loginType);
        // this.router.navigate(['transporter','joinus']);
        this.signup.nativeElement.click();

      }
    }, error => {
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('loginType', this.loginType);
      // this.router.navigate(['transporter','joinus']);
      this.signup.nativeElement.click();
    });
  }

}

class UserName {
  fName: string;
  lName: string;
}
