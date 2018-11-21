import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import * as firebase from 'firebase/app';
import { WindowService } from '../../../services/window.service';
import { PhoneNumber } from '../../../shared/modal/phone-number ';

@Component({
    selector: 'app-phone-login',
    templateUrl: './phone-login.component.html',
    styleUrls: ['./phone-login.component.css'],
    //   encapsulation: ViewEncapsulation.None,
})
export class PhoneLoginComponent implements OnInit {

    @Output('userid')
    userid = new EventEmitter();
    // @ViewChild('mobile')
    // private _inputElement: ElementRef;
    otpError;
    countries = [
        { code: '91', name: 'India' },
        { code: '1', name: 'US' },
        { code: '3', name: 'UK' }];
    windowRef: any;
    generateOTP = false;
    phoneNumber = new PhoneNumber();
    verificationCode: string;
    user: any;
    constructor(private win: WindowService) { }
    ngOnInit() {
        this.generateOTP = false;
        // this._inputElement.nativeElement.focus();
        this.phoneNumber.country = '91';
        this.windowRef = this.win.windowRef;
        this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': function (response) {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                console.log('RecaptchaVerified');

                //   onSignInSubmit();
            }
        });
        this.windowRef.recaptchaVerifier.render();
    }

    onlyNumberKey(event) {
        return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
      }
    sendLoginCode() {
        this.generateOTP = true;
        const appVerifier = this.windowRef.recaptchaVerifier;
        const num = this.phoneNumber.e164;
        firebase.auth().signInWithPhoneNumber(num, appVerifier)
            .then(result => {
                this.windowRef.confirmationResult = result;
            })
            .catch(error => console.log(error));
    }
    verifyLoginCode() {
        this.windowRef.confirmationResult
            .confirm(this.verificationCode)
            .then(result => {
                this.user = result.user;
                this.userid.emit({user: this.user});
            })
            .catch(error => {
                this.otpError = 'Incorrect code entered.';
                console.log(error, 'Incorrect code entered?');
            }
        );
    }
}
