import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/Models';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http:HttpClient) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }


  getUsers(email:any){
    console.log(email)
    return this.http.get(`http://localhost:3000/users?email=${email}`)
  }


  UpdateUser(user: User,id:any): Observable<User> {
    return this.http.put<User>(`http://localhost:3000/users/${id}`, user);
  }






 

}
