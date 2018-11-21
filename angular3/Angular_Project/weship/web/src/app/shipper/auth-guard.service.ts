import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';
import { Injectable } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { EventEmitter } from '@angular/core';
import { LoginEvent } from '../services/login-event';
import { RestService } from '../services/rest.service';
import { HostConfig } from '../services/host-config';

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private _cookieService: CookieService
        , private router: Router, private loginEvent: LoginEvent, private _restService: RestService) { }
    loggedInUser;
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.loggedInUser = this._cookieService.get("ut");
        if (this.loggedInUser) {
                return true;
        } else {
            if (this.loginEvent.canActivateEvent.observers.length > 0) {
                this.loginEvent.canActivateEvent.emit();
            }
            else {
                setTimeout(() => {
                    this.loginEvent.canActivateEvent.emit();
                }, 1000);
            }
            this.router.navigate(['/shipper']);
        }
    }
}
