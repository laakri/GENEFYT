
import { User } from "./../login/user.model";
import { HttpClient} from '@angular/common/http';
import { Subject}from 'rxjs'
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";


@Injectable({providedIn: 'root'})
export class ProfileService {

  private users :User[] = [];
  private userUpdated = new Subject<User[]>();

constructor(private http: HttpClient, private router: Router) {}





getusers(UserId: string){
    this.http.get<{message :string, users :any}>('http://localhost:4401/api/users/data/'+UserId)
    .pipe(map((usertData) =>{
      
      return usertData.users.map(
        (user: {
          _id: any; name: any;
          email: any; Wallet:any;
          imgPath:any; verified:any;
          rate:any; responsTime:any;
          languages:any; skills:any;
          description:any; 
          createdAt: any; updatedAt: any; 
        }) => {
        return{
        id: user._id,
        name: user.name,
        email: user.email,
        Wallet : user.Wallet,
        imgPath : user.imgPath,
        verified : user.verified,
        rate : user.rate,
        responsTime : user.responsTime,
        languages : user.languages,
        skills : user.skills,
        description : user.description,
        createdAt : user.createdAt,
        updatedAt : user.updatedAt
        };
      });
    }))
    .subscribe(transformedUser => {
      this.users = transformedUser;
      this.userUpdated.next([...this.users]);
    });
  }
  getUserUpdateListener(){
    return this.userUpdated.asObservable();
  }




}