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
            if(this._cookieService.get("up"))
            {
                return true;
            }
            else {
            this._restService.getRequest(`${HostConfig.hostUrl}/transporter/user/${this.loggedInUser}`).subscribe(data => {
                if (data) {
                    let cookieOptions = {
                        expires: new Date(new Date().setMinutes(new Date().getMinutes() + 30))
                      };
                    this._cookieService.put("up", (<{user}>data).user.id, cookieOptions)
                    // state
                    this.router.navigate([state.url]);
                    return true;
                    // this.router.navigate(["profile", (<{ id: number }>data).id], { relativeTo: this.route });
                    // this.router.navigate([''], { relativeTo: this.route });
                } else {
                    this.router.navigate(["transporter","data"]);
                }
            }, error => {
                this.router.navigate(["transporter","data"]);
            });
        }
    }
        else {
            if (this.loginEvent.canActivateEvent.observers.length > 0) {
                this.loginEvent.canActivateEvent.emit();
            }
            else {
                setTimeout(() => {
                    this.loginEvent.canActivateEvent.emit();
                }, 1000);
            }
            this.router.navigate(['/transporter']);

        }
    }
}
