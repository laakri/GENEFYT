import { User } from "./user.model";
import {HttpClient} from '@angular/common/http';
import {Subject}from 'rxjs'
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";


@Injectable({providedIn: 'root'})
export class UsersService {

  private isAuthenticated = false;
  private userId :any;
  private userName:any;
  private userRole:any;
  private token: any;
  private tokenTimer: any;
  private users :User[] = [];
  private authStatusListener = new Subject<boolean>();
  private userUpdated = new Subject<User[]>();

constructor(private http: HttpClient, private router: Router) {}




addUser(  name : string ,email :string,  password :string){
    const user :User= {
      name: name, email: email, password: password,
      Wallet: "",
      imgPath: "",
      verified: "",
      rate: "",
      responsTime: "",
      languages: "",
      skills: "",
      description: "",
      createdAt: "",
      updatedAt: "",
    };
    this.http.post<{message :string }>('http://localhost:4401/api/users/signup', user)
    .subscribe(() => {
      /*this.login(email,password)*/
      console.log('User Added !')
    },error=>{
       console.log(error);
    }
    );
  }



getToken() {
  return this.token;
}

getUserId(){
  return this.userId;
}
getUserName(){
  return this.userName;
}
getUserRole(){
  return this.userRole;
}
getIsAuth() {
  return this.isAuthenticated;
}
getAuthStatusListener() {
  return this.authStatusListener.asObservable();
}


login(email: string, password: string) {
  const user : User = {
    email: email, password: password,
    name: "",
    Wallet: "",
    imgPath: "",
    verified: "",
    rate: "",
    responsTime: "",
    languages: "",
    skills: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  };
  this.http
    .post<{ token: string; expiresIn: number;userId:string; userName:string; userRole:string; }>(
      "http://localhost:4401/api/users/login",user)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.userName = response.userName;
        this.userRole = response.userRole;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate,this.userId,this.userName,this.userRole);
        const jhon={
          id : this.userId,
        }
        this.router.navigate(["/Profile", jhon]);
      }
    },error => {
      this.authStatusListener.next(false);
    });
}




autoAuthUser() {
  const authInformation = this.getAuthData();
  if (!authInformation) {
    return;
  }
  const now = new Date();
  const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
  if (expiresIn > 0) {
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.userId = authInformation.userId;
    this.userName = authInformation.userName;
    this.userRole = authInformation.userRole;


    this.setAuthTimer(expiresIn / 1000);
    this.authStatusListener.next(true);
  }
}
logout() {
  this.token = null;
  this.isAuthenticated = false;
  this.authStatusListener.next(false);
  this.userId = null;
  this.userName = null;
  this.userRole= null;
  clearTimeout(this.tokenTimer);
  this.clearAuthData();
  console.log("Logout runs seccesfully!")
  this.router.navigate(["/"]);
}

private setAuthTimer(duration: number) {
  console.log("Setting timer: " + duration + " Secends");
  this.tokenTimer = setTimeout(() => {
    this.logout();
  }, duration * 1000);
}

private saveAuthData(token: string, expirationDate: Date, userId: string, userName: string,userRole:string) {
  localStorage.setItem("token", token);
  localStorage.setItem("expiration", expirationDate.toISOString());
  localStorage.setItem("userId", userId);
  localStorage.setItem("userName", userName);
  localStorage.setItem("userRole", userRole);


}

private clearAuthData() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userRole");
}

private getAuthData() {
  const token = localStorage.getItem("token");
  const expirationDate = localStorage.getItem("expiration");
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");

  if (!token || !expirationDate  ) {
    return;
  }
  return {
    token: token,
    expirationDate: new Date(expirationDate),
    userId: userId,
    userName:userName,
    userRole:userRole

  }
}











}