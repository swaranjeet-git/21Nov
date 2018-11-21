import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { User } from '../shared/modal/user';
import { RestService } from './rest.service';
import { HostConfig } from './host-config';

@Injectable()
export class SentEmail {

    private successFlag: boolean;
    public constructor(private _restService: RestService) { }

    public registerUserSend(model: User) {
        console.log('Email component invoke : ' + model.email);
        if (model.email) {
            const emailTemplate: EmailTemplate = new EmailTemplate();
            emailTemplate.to = model.email;
            emailTemplate.name = model.fName;
            return this._restService.postRequest(`${HostConfig.hostUrl}/email/otp`, JSON.stringify(emailTemplate));
        }
    }
}

class EmailTemplate {
    to: string;
    message: string;
    subject: string;
    name: string;
}
