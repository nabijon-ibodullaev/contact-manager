import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Users } from '../Models/users';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styles: [
    `
      .example-form {
        min-width: 150px;
        max-width: 500px;
        width: 100%;
      }

      .example-full-width {
        width: 100%;
      }
    `,
  ],
})
export class NewContactComponent implements OnInit {
  avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];
  user!: Users;
  constructor(
    private dialog: MatDialogRef<NewContactComponent>,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.user = new Users();
  }

  save() {
    this.dialog.close(this.user);
    this.userService.addUser(this.user).then((user: any) => {
      this.dialog.close(user);
    });
  }
  dismiss() {
    this.dialog.close(null);
  }
}
