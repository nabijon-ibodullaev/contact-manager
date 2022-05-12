import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../Models/users';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styles: [],
})
export class ContactManagerComponent implements OnInit {
  user?: Users;
  constructor(private route: ActivatedRoute, private service: UsersService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      if (!id) id = 1;
      this.user = undefined;
      this.service.users.subscribe((users) => {
        if (users.length === 0) return;
      });
      setTimeout(() => {
        this.user = this.service.userbyid(id);
      }, 700);
    });
  }
}
