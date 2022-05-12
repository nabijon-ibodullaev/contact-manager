import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UsersService } from '../Services/users.service';
import { Users } from '../Models/users';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
    `
      .sidenav-container {
        height: 100%;
      }

      .sidenav {
        width: 200px;
      }

      .sidenav .mat-toolbar {
        background: inherit;
      }

      .mat-toolbar.mat-primary {
        position: sticky;
        top: 0;
        z-index: 1;
      }
      .contacts {
        background: #3f51b5 !important;
      }
    `,
  ],
})
export class NavbarComponent implements OnInit {
  users?: Observable<Users[]>;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private UsersService: UsersService,
    iconRegisty: MatIconRegistry,
    sanitizer: DomSanitizer,
    private router: Router
  ) {
    iconRegisty.addSvgIconSet(
      sanitizer.bypassSecurityTrustResourceUrl('assets/avatars.svg')
    );
  }

  ngOnInit() {
    this.users = this.UsersService.users;
    this.UsersService.getAllUsers();

    this.users.subscribe((data) => {
      if (data.length > 0)
        this.router.navigate(['/contact-manager', data[0].id]);
    });
  }
}
