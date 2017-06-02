import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from '../models/user';

@Injectable()
export class UserService {
    public user: User;

    constructor(private http: Http) { }

    getUser(): Observable<User> {
        return this.http.get(`/.auth/me`)
            .map(response => {
                let user = new User();
                user.firstName = response.json()[0].user_claims.givenName;
                user.firstName = response.json()[0].user_claims.surname;
                this.user = user;
                return user;
            }).catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}