import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../Models/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _users: BehaviorSubject<Users[]>;
  private dataStore: {
    users: Users[];
  };
  constructor(private http: HttpClient) {
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<Users[]>([]);
  }

  private _UsersUrl = 'https://angular-material-api.azurewebsites.net/users';

  get users(): Observable<Users[]> {
    return this._users.asObservable();
  }

  userbyid(id: number) {
    return this.dataStore.users.find((x) => x.id == id);
  }
  getAllUsers() {
    this.http.get<Users[]>(this._UsersUrl).subscribe(
      (data) => {
        this.dataStore.users = data;
        this._users.next(Object.assign({}, this.dataStore).users);
      },
      (error) => console.log('Failed to fetch Users')
    );
  }
}
