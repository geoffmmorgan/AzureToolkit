import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
}
