import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AsyncSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User, AADUser } from '../models/user';

@Injectable()
export class UserService {
    private originUrl: string;
    private aadUser: AADUser;

    constructor(private http: Http, @Inject('ORIGIN_URL') originUrl: string) {
        this.originUrl = originUrl;
    }

    public getUser(): Observable<User> {
        //const sub = new AsyncSubject<User>();
        //this.aadUser = { "id_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJleHAiOjE0OTc5Nzg2NTgsIm5iZiI6MTQ5Nzk3NTA1OCwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tLzg4MGY1NmVmLTBkZGQtNDVjMi1iYWU0LWUyOWYwN2JmZDRhYi92Mi4wLyIsInN1YiI6ImVjZTQ0M2JhLWQ3MDgtNDI0My1hZTk4LWQ1NWMyZTBkOGIwYyIsImF1ZCI6ImMzMTg0MDk2LWZjNjgtNDkyYy1hNjUzLTM1ZTBjNTc4YjEzZiIsIm5vbmNlIjoiNDA2M2ZlMWUwNzA1NGZlN2IxNzYwMGRlOTE5MDY4NjdfMjAxNzA2MjAxNjE1NDciLCJpYXQiOjE0OTc5NzUwNTgsImF1dGhfdGltZSI6MTQ5Nzk3NTA1OCwib2lkIjoiZWNlNDQzYmEtZDcwOC00MjQzLWFlOTgtZDU1YzJlMGQ4YjBjIiwiZ2l2ZW5fbmFtZSI6Ikdlb2ZmcmV5IiwiZmFtaWx5X25hbWUiOiJNb3JnYW4iLCJ0ZnAiOiJCMkNfMV9EZWZhdWx0U2lnblVwUG9saWN5In0.SvcCASfj5Kbbyghv7DjWi4yoQz3txa7WyH8Q704HDyWcMfxjNjSQsHsnuWx1qKxZMQ4Wdb-FNK1bXbN5H40x5Obo_MVAOFXS5y7knSHl2_Km17yzW93uJvGGEXdAXEWsn3J6KrYCYTxAtUW37XvLmXhFGIWKCy9o_fnMVi_4lRKY1rBXnHQF0b8pQ6Sn9VDpXL6sjy00m3Ln94AIgVSvbrBn5LjIbVbx7otx8rGw5nXNpcwPIoEdWZu6m4O4Mm5SnQArIitoQMbkAz35qMZ3PMewFgkrn2A0PJSvB_yxryKFSan78Kp4pCH65hm26-6yKths4cLAMb77fuiYN-k9Ig", "provider_name": "aad", "user_claims": [{ "typ": "exp", "val": "1497978658" }, { "typ": "nbf", "val": "1497975058" }, { "typ": "ver", "val": "1.0" }, { "typ": "iss", "val": "https:\/\/login.microsoftonline.com\/880f56ef-0ddd-45c2-bae4-e29f07bfd4ab\/v2.0\/" }, { "typ": "http:\/\/schemas.xmlsoap.org\/ws\/2005\/05\/identity\/claims\/nameidentifier", "val": "ece443ba-d708-4243-ae98-d55c2e0d8b0c" }, { "typ": "aud", "val": "c3184096-fc68-492c-a653-35e0c578b13f" }, { "typ": "nonce", "val": "4063fe1e07054fe7b17600de91906867_20170620161547" }, { "typ": "iat", "val": "1497975058" }, { "typ": "http:\/\/schemas.microsoft.com\/ws\/2008\/06\/identity\/claims\/authenticationinstant", "val": "1497975058" }, { "typ": "http:\/\/schemas.microsoft.com\/identity\/claims\/objectidentifier", "val": "ece443ba-d708-4243-ae98-d55c2e0d8b0c" }, { "typ": "http:\/\/schemas.xmlsoap.org\/ws\/2005\/05\/identity\/claims\/givenname", "val": "Geoffrey" }, { "typ": "http:\/\/schemas.xmlsoap.org\/ws\/2005\/05\/identity\/claims\/surname", "val": "Morgan" }, { "typ": "tfp", "val": "B2C_1_DefaultSignUpPolicy" }], "user_id": "ece443ba-d708-4243-ae98-d55c2e0d8b0c" };
        //var user = new User();
        //user.userId = this.aadUser.user_id;
        //
        //this.aadUser.user_claims.forEach(claim => {
        //    switch (claim.typ) {
        //        case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname":
        //            user.firstName = claim.val;
        //            break;
        //        case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname":
        //            user.lastName = claim.val;
        //            break;
        //    }
        //});
        //sub.next(user);
        //sub.complete();
        //return sub;

        return this.http.get(`${this.originUrl}/.auth/me`)
            .map(response => {
                try {
                    this.aadUser = response.json()[0] as AADUser;
                    let user = new User();
                    user.userId = this.aadUser.user_id;
                
                    this.aadUser.user_claims.forEach(claim => {
                        switch (claim.typ) {
                            case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname":
                                user.firstName = claim.val;
                                break;
                            case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname":
                                user.lastName = claim.val;
                                break;
                        }
                    });
                
                    return user;
                }
                catch (Exception) {
                    console.log(`Error: ${Exception}`);
                }
            }).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}